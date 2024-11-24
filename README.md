# MMM-VH-HomeAssistant

## Description

MMM-VH-HomeAssistant est un module pour MagicMirror² qui affiche les données de capteurs ou d'entités disponibles sur votre instance Home Assistant. Ce module est conçu pour être flexible, personnalisable et facile à configurer.

## Fonctionnalités

- Affichage des données de capteurs (température, humidité, etc.) ou d'autres entités de Home Assistant.
- Personnalisation des noms et icônes associés aux entités.
- Mise à jour automatique à intervalle configurable.
- Supporte les connexions sécurisées HTTPS avec des certificats auto-signés.

## Prérequis

- Une instance fonctionnelle de MagicMirror².
- Une instance fonctionnelle de Home Assistant.
- Un Long-Lived Access Token pour permettre l'accès sécurisé aux données.

## Installation

Étape 1 : Cloner le dépôt
Exécutez cette commande pour télécharger le module dans le dossier modules de votre MagicMirror :
```bash
        cd ~/MagicMirror/modules
        git clone https://github.com/VernetHouse/MMM-VH-HomeAssistant.git
```
Étape 2 : Installer les dépendances
Ensuite, accédez au dossier du module et installez les dépendances requises :
```bash
        cd MMM-VH-HomeAssistant
        npm install
```

## Configuration
- Ajouter le module à `config.js`
- Ouvrez le fichier `config.js` dans le répertoire `MagicMirror/config` et ajoutez la configuration suivante :
```bash
{
    module: "MMM-VH-HomeAssistant",
    position: "top_left", // Choisissez la position sur votre écran
    config: {
        baseUrl: "https://<URL_DE_VOTRE_HOME_ASSISTANT>", // Exemple : https://192.168.1.100:8123
        token: "<VOTRE_LONG_LIVED_ACCESS_TOKEN>", // Remplacez par votre token
        entities: [
            {
                id: "sensor.temperature_bureau",
                name: "Température Bureau",
                icon: "fas fa-thermometer-half"
            },
            {
                id: "sensor.humidity_bureau",
                name: "Humidité Bureau",
                icon: "fas fa-tint"
            }
        ],
        updateInterval: 30000 // Mise à jour toutes les 30 secondes
    }
}

```
## Modifications dans Home Assistant

1. Générer un Long-Lived Access Token
- Connectez-vous à Home Assistant.
- Allez dans Profil > Long-Lived Access Tokens.
- Créez un nouveau token en cliquant sur Créer un token.
- Donnez-lui un nom (ex. : `MagicMirror Access`) et copiez le token généré.
  
2. Ajouter un réseau de confiance (optionnel)
Pour autoriser le MagicMirror sans mot de passe via IP, modifiez votre fichier `configuration.yaml` :
```bash
homeassistant:
  auth_providers:
    - type: trusted_networks
      trusted_networks:
        - 192.168.1.0/24  # Remplacez par votre réseau local
      allow_bypass_login: true
    - type: homeassistant

```
Redémarrez Home Assistant après cette modification.

3. Vérifiez les entités disponibles
Assurez-vous que les entités définies dans `config.js` (par ex. : `sensor.temperature_bureau`) existent dans Developer Tools > States dans l'interface de Home Assistant

## Dépannage

Erreur 401 : Unauthorized
- Vérifiez que le token est valide et correctement configuré.
- Assurez-vous que l'utilisateur lié au token a accès aux entités.

Erreur 403 : Forbidden
- Vérifiez les permissions des entités dans Home Assistant.
- Si vous utilisez `trusted_networks`, vérifiez que l'IP de votre MagicMirror est incluse.

Logs pour le débogage
Surveillez les logs de MagicMirror pour identifier les erreurs :
```bash
pm2 logs MagicMirror
```
## Contributions

Les contributions sont les bienvenues ! Vous pouvez :

- Créer une issue pour signaler un problème ou suggérer une amélioration.
- Soumettre une pull request pour partager vos idées.
