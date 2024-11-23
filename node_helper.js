const NodeHelper = require("node_helper");
const axios = require("axios");
const https = require("https"); // Module natif pour gérer HTTPS

module.exports = NodeHelper.create({
    start: function () {
        console.log("Node helper for MMM-VH-HomeAssistant started");
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "FETCH_DATA") {
            this.fetchData(payload);
        }
    },

    async fetchData({ baseUrl, token, entities }) {
        try {
            // Journalisation des paramètres de la requête
            console.log("Base URL :", baseUrl);
            console.log("Token utilisé :", token);
            console.log("Entités demandées :", entities);

            // Création d'un agent HTTPS qui désactive la validation des certificats
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false // Équivaut à l'option curl --insecure
            });

            // Configuration des en-têtes de requête
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const results = {};

            // Récupérer les données pour chaque entité
            for (const entity of entities) {
                console.log(`Récupération de l'entité : ${entity}`);
                const response = await axios.get(`${baseUrl}/api/states/${entity}`, {
                    headers,
                    httpsAgent // Utilisation de l'agent HTTPS pour ignorer les erreurs SSL
                });

                // Stockage des données de l'entité
                results[entity] = response.data.state;
            }

            // Envoi des résultats au module
            console.log("Données récupérées avec succès :", results);
            this.sendSocketNotification("DATA_RECEIVED", results);

        } catch (error) {
            // Gestion des erreurs et journalisation
            console.error("Erreur lors de la récupération des données :", error.message);

            if (error.response) {
                console.error("Status Code :", error.response.status);
                console.error("Détails :", error.response.data);
            } else {
                console.error("Erreur réseau ou autre :", error);
            }
        }
    }
});
