<div align="center">
  <img src="/logo.svg" alt="WishList dApp Logo" width="200"/>

# WishList dApp

[![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.24-363636?style=for-the-badge&logo=solidity&logoColor=white)](https://docs.soliditylang.org/en/v0.8.24/)
[![Hardhat](https://img.shields.io/badge/Built%20with-Hardhat-FFDB1C?style=for-the-badge&logo=hardhat&logoColor=white)](https://hardhat.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A decentralized application for creating and managing wish lists on the blockchain. Empower your gifting experience with transparency and security.

[Explore Demo](https://your-demo-url.com) • [Report Bug](https://github.com/adelamare-blockchain/dApp_wishList/issues) • [Request Feature](https://github.com/adelamare-blockchain/dApp_wishList/issues)

</div>

## 📑 Table of Contents

- [🌟 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📘 Smart Contract](#-smart-contract)
- [💻 Frontend](#-frontend)
- [🧪 Testing](#-testing)
- [🌐 Deployment](#-deployment)
- [📸 Screenshots](#-screenshots)
- [🛣️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

## 🌟 Features

- 📝 Create and manage personal wish lists on the blockchain
- 🎁 Add items with names, descriptions, and prices
- 👀 View wish lists of friends and family
- 💰 Purchase items from others' wish lists securely
- 🔒 Transparent and tamper-proof transactions
- 🌐 Cross-platform compatibility (Desktop & Mobile)

## 🛠️ Tech Stack

### Backend

- Solidity ^0.8.24
- Hardhat 2.22.5
- OpenZeppelin Contracts 5.0.2
- Ethers.js 6.4.0

### Frontend

- Next.js 14.2.5
- React 18
- TailwindCSS 3.4.1
- RainbowKit 2.1.3
- wagmi 2.12.0

### Testing & Quality Assurance

- Chai
- Mocha
- Hardhat Network Helpers
- Solidity Coverage

## 🏗️ Project Structure

```sh
wishlist-dapp/
├── backend/
│   ├── contracts/
│   │   └── WishList.sol
│   ├── test/
│   │   └── WishList.test.js
│   ├── scripts/
│   │   └── deploy.js
│   ├── hardhat.config.js
│   └── package.json
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── styles/
│   └── package.json
└── README.md
```

## 📜 Smart Contract

The `WishList.sol` contract is the backbone of our dApp, enabling users to:

1. Add items to their wish list
2. Buy items from others' wish lists
3. Retrieve wish list data

### Key Functions

```solidity
function addToWishList(string calldata _name, uint256 _price) external;
function buyItem(address _for, uint16 _itemId) external payable;
function getWishList(address _of) external view returns(Item[] memory);
```

## 🚀 Deployed on Polygon AMOY testnet:

🔍 [**View full contract on Polygonscan**](https://amoy.polygonscan.com/address/0x6855a7f660BeC65AA7F29A0545bF914a806D123d#code)

## 🖥️ Frontend

Our frontend provides an intuitive interface for seamless interaction with the WishList smart contract:

- 🌈 Connect wallet using RainbowKit
- ➕ Add and manage items in personal wish list
- 🔍 Explore and purchase items from friends' wish lists
- 📱 Responsive design for optimal mobile and desktop experience

## 🚀 Getting Started

1. Clone the repository

```sh
git clone https://github.com/adelamare-blockchain/dApp_wishList
cd wishlist-dapp

```

2. Install dependencies

```sh
cd backend && yarn
cd ../frontend && yarn
```

3. Set up environment variables (refer to `.env.example` in both directories)

4. Run the development server

```sh
# Terminal 1: Backend
cd backend
yarn hardhat node

# Terminal 2: Frontend
cd frontend
yarn run dev
```

5. Open `http://localhost:3000` in your browser

## 🧪 Testing

We've rigorously tested all functionalities using Hardhat. Run the test suite:

```sh
cd backend
yarn hardhat test
```

<details>
<summary>View Test Results</summary>

```sh
WishList
  Deployment
    ✔ Should deploy with an empty wish list
  addToWishList
    ✔ Should allow users to add items to their wish list
  buyItem
    ✔ Should allow users to buy items from the wish list
    ✔ Should revert if not enough funds are sent
    ✔ Should revert if the item is already bought
  getWishList
    ✔ Should return the correct wish list for an address

6 passing (1.52s)

```

</details>

## 🌐 Deployment

1. Deploy the smart contract

```sh
cd backend
yarn hardhat run scripts/deploy.js --network polygonAmoy
```

2. Get the contract address & ABI in `frontend/constants/index.jsx`

3. Build and deploy the frontend

```sh
cd frontend
yarn run build
# Deploy the 'out' directory to your preferred hosting service
```

## 📸 Screenshots

<div align="center">
  <img src="https://your-image-url-here.com/screenshot1.png" alt="WishList Homepage" width="45%"/>
  <img src="https://your-image-url-here.com/screenshot2.png" alt="Add Item to WishList" width="45%"/>
</div>
<div align="center">
  <img src="https://your-image-url-here.com/screenshot3.png" alt="View Friend's WishList" width="45%"/>
</div>

## 🤝 Contributing

Contributions are welcome! Please check out our Contribution Guidelines for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments

- OpenZeppelin for secure smart contract libraries
- Hardhat for Ethereum development environment
- RainbowKit for wallet connection UI
- TailwindCSS for utility-first CSS framework

<div align="center">
  Made with ❤️ by Antoine Delamare (https://github.com/adelamare-blockchain)
</div>
