const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const { OKLINK_API_KEY, OKLINK_VERIFY_URL } = process.env;

const verifyContract = async (contractData) => {
  try {
    const response = await fetch(OKLINK_VERIFY_URL, {
      method: "POST",
      headers: {
        "Ok-Access-Key": OKLINK_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contractData),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Vérification du contrat réussie:", result);
      return result;
    } else {
      console.error(
        "Erreur lors de la vérification du contrat:",
        result
      );
    }
  } catch (error) {
    console.error("Erreur réseau:", error.message);
  }
};

export const deployAndVerifyContract = async () => {
  // Déployez votre contrat ici
  // Exemple de données de contrat, remplacez-les par les données réelles
  const contractData = {
    chainShortName: "POLYGON",
    contractAddress: "0xYourContractAddress",
    contractName: "YourContractName",
    sourceCode:
      "pragma solidity ^0.8.0; contract YourContractName { /* ... */ }",
    codeFormat: "solidity-single-file",
  };

  await verifyContract(contractData);
};

const testRpcUrl = async (url) => {
  try {
    const response = await fetch(url);
    return response.ok ? url : new Error("Non OK response");
  } catch (error) {
    console.error(`Network error: ${error.message}`);
  }
};

export const getBestRpcUrl = async (urls) => {
  try {
    // Crée un tableau de promesses pour chaque URL
    const promises = urls.map((url) => testRpcUrl(url));

    // Utilise Promise.any() pour attendre la première promesse qui se résout avec succès
    const bestUrl = await Promise.any(promises);

    // Retourne l'URL qui a répondu en premier et est accessible
    return bestUrl;
  } catch (error) {
    console.error(`Toutes les URLs RPC ont échoué: ${error.message}`);
  }
};
