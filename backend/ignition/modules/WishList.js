const {
  buildModule,
} = require("@nomicfoundation/hardhat-ignition/modules");

// yarn hardhat ignition deploy .\ignition\modules\WishList.js --network localhost

const WishListModule = buildModule("WishListModule", (m) => {
  // Accounts
  const owner = m.getAccount(0);
  const addr1 = m.getAccount(1);
  const addr2 = m.getAccount(2);

  // Paramètres par défaut

  const wishList = m.contract("WishList");

  return { wishList };
});

module.exports = WishListModule;
