const fs = require("fs");
const path = require("path");

const QUESTIONS_DIR = path.join(__dirname, "..", "questions");

function isValidIdentifier(name) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name);
}

function walkJsonFiles(dir, results) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkJsonFiles(fullPath, results);
      return;
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith(".json")) {
      results.push(fullPath);
    }
  });
}

function transformFile(jsonPath) {
  const baseName = path.basename(jsonPath, ".json");
  const jsPath = path.join(path.dirname(jsonPath), baseName + ".js");
  const raw = fs.readFileSync(jsonPath, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    const fallback = extractFromNonJson(raw);
    if (!fallback) {
      const msg = err && err.message ? err.message : String(err);
      throw new Error("Invalid JSON: " + jsonPath + " (" + msg + ")");
    }
    const varName = fallback.name || baseName;
    const assignment = isValidIdentifier(varName)
      ? "var " + varName + " = " + fallback.payload + ";\n"
      : "window[" + JSON.stringify(varName) + "] = " + fallback.payload + ";\n";
    fs.writeFileSync(jsPath, assignment, "utf8");
    fs.unlinkSync(jsonPath);
    return;
  }
  const json = JSON.stringify(data, null, 2);
  const assignment = isValidIdentifier(baseName)
    ? "var " + baseName + " = " + json + ";\n"
    : "window[" + JSON.stringify(baseName) + "] = " + json + ";\n";
  fs.writeFileSync(jsPath, assignment, "utf8");
  fs.unlinkSync(jsonPath);
}

function extractFromNonJson(text) {
  const trimmed = text.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    return { name: null, payload: trimmed.replace(/;\s*$/, "") };
  }

  const assignMatch = trimmed.match(/^(?:let|var|const)\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*([\s\S]*?)\s*;?\s*$/);
  if (assignMatch) {
    return { name: assignMatch[1], payload: assignMatch[2].trim() };
  }

  const windowMatch = trimmed.match(/^window\[(["'])(.+?)\1\]\s*=\s*([\s\S]*?)\s*;?\s*$/);
  if (windowMatch) {
    return { name: windowMatch[2], payload: windowMatch[3].trim() };
  }

  const eq = trimmed.indexOf("=");
  if (eq !== -1) {
    const payload = trimmed.slice(eq + 1).trim().replace(/;\s*$/, "");
    if (payload) return { name: null, payload: payload };
  }

  return null;
}

function main() {
  if (!fs.existsSync(QUESTIONS_DIR)) {
    console.error("Missing questions directory: " + QUESTIONS_DIR);
    process.exit(1);
  }

  const files = [];
  walkJsonFiles(QUESTIONS_DIR, files);
  if (files.length === 0) {
    console.log("No JSON files found in " + QUESTIONS_DIR);
    return;
  }

  let ok = 0;
  const errors = [];
  files.forEach((file) => {
    try {
      transformFile(file);
      ok += 1;
    } catch (err) {
      errors.push(err.message || String(err));
    }
  });

  console.log("Generated " + ok + " JS files from inputs.");
  if (errors.length) {
    console.error("Errors:");
    errors.forEach((e) => console.error("- " + e));
    process.exit(1);
  }
}

main();
