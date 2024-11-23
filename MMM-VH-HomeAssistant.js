Module.register("MMM-VH-HomeAssistant", {
    defaults: {
        updateInterval: 60000, // Mise à jour toutes les 60 secondes
        entities: [],          // Liste des entités à récupérer
        baseUrl: "",           // URL de Home Assistant (HTTPS)
        token: ""              // Token d'accès HA
    },

    start: function () {
        this.dataValues = {}; // Stockage des valeurs reçues
        this.getData();
        this.scheduleUpdate();
    },

    getStyles: function () {
        return ["MMM-VH-HomeAssistant.css"];
    },

    getDom: function () {
        const wrapper = document.createElement("div");

        if (Object.keys(this.dataValues).length === 0) {
            wrapper.innerHTML = "Chargement des données...";
        } else {
            this.config.entities.forEach(entity => {
                const entityWrapper = document.createElement("div");
                entityWrapper.className = "entity";

                // Ajout de l'icône
                const icon = document.createElement("i");
                icon.className = entity.icon || ""; // Utilise l'icône spécifiée ou rien
                icon.style.marginRight = "10px";

                // Ajout du nom personnalisé et de la valeur
                const text = document.createElement("span");
                text.innerHTML = `<strong>${entity.name || entity.id}:</strong> ${this.dataValues[entity.id] || "N/A"}`;

                // Assembler
                entityWrapper.appendChild(icon);
                entityWrapper.appendChild(text);
                wrapper.appendChild(entityWrapper);
            });
        }

        return wrapper;
    }, // <-- Virgule ajoutée ici

    scheduleUpdate: function () {
        setInterval(() => {
            this.getData();
        }, this.config.updateInterval);
    }, // <-- Virgule ajoutée ici

    getData: function () {
        const entityIds = this.config.entities.map(entity => entity.id); // Extraire les IDs
        this.sendSocketNotification("FETCH_DATA", {
            baseUrl: this.config.baseUrl,
            token: this.config.token,
            entities: entityIds
        });
    }, // <-- Virgule ajoutée ici

    socketNotificationReceived: function (notification, payload) {
        if (notification === "DATA_RECEIVED") {
            this.dataValues = payload;
            this.updateDom();
        }
    }
});
