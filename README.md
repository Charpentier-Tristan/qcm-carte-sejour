# QCM Carte Séjour

Site web pour réviser et passer des QCM sur la carte de séjour et la citoyenneté française.

## Structure du projet

QCM_Carte_sejour/
├─ index.html # Page d'accueil
├─ qcm.html # QCM par thème ou examen
├─ resultat.html # Résultats détaillés
├─ contact.html # Contact
├─ aide.html # Aide
├─ mentions-legales.html # Mentions légales
├─ css/
│ └─ style.css # Styles
├─ js/
│ ├─ qcm.js # Logique QCM
│ └─ resultat.js # Affichage des résultats
└─ questions/
├─ principes_republique.json
├─ systeme_institutionnel.json
├─ droits_devoirs.json
├─ histoire_geographie.json
└─ vivre_societe.json

## Installation locale

1. Cloner le repo :
```bash
git clone https://github.com/tonpseudo/qcm-carte-sejour.git
```
2. Ouvrir index.html dans ton navigateur (ou utiliser un serveur local pour que les fichiers JSON soient accessibles) :
# Exemple avec Python
```bash
cd QCM_Carte_sejour
python -m http.server 8000
```
Puis ouvrir http://localhost:8000 dans le navigateur.

## Déploiement

Le site peut être déployé gratuitement sur Vercel
 en important le dépôt GitHub et en suivant les instructions pour site statique.

## Fonctionnalités

QCM par thème ou examen complet

Affichage des réponses détaillées et explications à la fin

Compatible mobile et desktop

Pages : Accueil, QCM, Résultats, Contact, Aide, Mentions légales
