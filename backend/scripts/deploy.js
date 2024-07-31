const fs = require("fs");
const path = require("path");
const { ignition } = require("hardhat");

// yarn hardhat run scripts/deploy.js --network polygonAmoy

// components
const WishListModule = require("../ignition/modules/WishList");

async function main() {
  // Définir une fixture pour déployer le contrat
  // Deploying the smart contracts
  const { wishList } = await ignition.deploy(WishListModule);

  // Récupérer l'ABI et l'adresse du contrat déployé
  const artifactPath = path.resolve(
    __dirname,
    "../../frontend/artifacts/contracts/WishList.sol/WishList.json"
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const contractABI = JSON.stringify(artifact.abi);
  const contractAddress = await wishList.getAddress();
  // Extraire et afficher le nom du contrat
  const contractName =
    artifact.contractName || "Nom du contrat non trouvé";

  // Créer les répertoires nécessaires si ils n'existent pas
  const outputDir = path.dirname(
    path.join(__dirname, "../../frontend/constants/index.jsx")
  );
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Créer le fichier constants
  const content = `export const contractABI = ${contractABI};\nexport const contractAddress = "${contractAddress}";\n///Disponible sur https://amoy.polygonscan.com/address/${contractAddress}#code`;
  const outputPath = path.resolve(
    __dirname,
    "../../frontend/constants/index.jsx"
  );
  fs.writeFileSync(outputPath, content);

  console.log(
    `Contrat ${contractName} à l'address ${contractAddress} déployé.\nDisponible sur https://amoy.polygonscan.com/address/${contractAddress}#code.\nFichier constants/index.jsx créé avec succès !\n`
  );
}

main().catch((error) => {
  console.error(
    "Erreur lors du déploiement et de la génération du fichier constants:",
    error
  );
  process.exit(1);
});
