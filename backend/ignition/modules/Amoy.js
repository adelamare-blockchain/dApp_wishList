const {
  buildModule,
} = require("@nomicfoundation/hardhat-ignition/modules");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const fetch = require("node-fetch");
require("dotenv").config();

// Get .env variables
const { AMOY_URL, AMOY2_URL, AMOY3_URL } = process.env;

// Liste des URL à tester sous forme d'un tableau d'objets
const NETWORK_URLS = [
  AMOY_URL || "https://rpc-amoy.polygon.technology",
  AMOY2_URL || "https://rpc.ankr.com/polygon_amoy",
  AMOY3_URL || "https://polygon-amoy.drpc.org",
];

// Fonction pour sélectionner l'URL avec la latence la plus faible
const selectBestUrl = async () => {
  try {
    const promises = NETWORK_URLS.map((url) =>
      fetch(url)
        .then((response) =>
          response.ok
            ? url
            : Promise.reject(new Error("Non OK response"))
        )
        .catch((error) =>
          Promise.reject(new Error("Network error: ", error))
        )
    );

    const bestResult = await Promise.any(promises);
    console.log("Best Result : ", bestResult);
    return bestResult;
  } catch (error) {
    console.error("Error selecting best URL:", error);
    process.exit(1);
  }
};

// Définir la fixture pour charger l'URL
const bestUrlFixture = async () => {
  return await selectBestUrl();
};

// Utiliser l'URL récupérée dans le module
const AmoyModule = buildModule("AmoyModule", () => {
  const bestUrl = loadFixture(bestUrlFixture);
  if (!bestUrl)
    throw new Error("Best URL not available at module build time.");
  return { bestUrl };
});

module.exports = AmoyModule;
