// Librairies
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { ethers, ignition } = require("hardhat");
const {
  anyValue,
} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

// components
const WishListModule = require("../ignition/modules/WishList");

// MAIN FUNCTION
describe("WishList", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  const deployWishListFixture = async () => {
    // Contracts are deployed using the first signer/account by default
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // Contract deployed through ignition/modules
    const { wishList } = await ignition.deploy(WishListModule);

    // Items to buy
    // Item1
    const item1 = {
      itemId: 1n,
      name: "Voiture",
      price: ethers.parseEther("3"),
      isBought: false,
      buyer: ethers.AddressZero,
    };

    // Item2
    const item2 = {
      itemId: 2n,
      name: "Ordinateur",
      price: ethers.parseEther("1"),
      isBought: false,
      buyer: ethers.AddressZero,
    };

    // Add 2 items to wishList
    await wishList
      .connect(addr1)
      .addToWishList(item1.name, item1.price);
    await wishList
      .connect(addr1)
      .addToWishList(item2.name, item2.price);

    console.log("Item 1 : ", item1);
    return {
      wishList,
      owner,
      addr1,
      addr2,
      addr3,
      item1,
      item2,
    };
  };

  describe("Deployment", function () {
    it("Should deploy with an empty wish list", async function () {
      const { wishList, owner } = await loadFixture(
        deployWishListFixture
      );

      const wishListItems = await wishList.getWishList(owner.address);
      expect(wishListItems.length).to.equal(0);
    });
  });

  describe("addToWishList", function () {
    it("Should allow users to add items to their wish list", async function () {
      const { wishList, addr1, item1, item2 } = await loadFixture(
        deployWishListFixture
      );
      const items = await wishList.getWishList(addr1.address);
      expect(items.length).to.equal(2);
      expect(items[0].name).to.equal(item1.name);
      expect(items[0].price).to.equal(item1.price);
      expect(items[1].name).to.equal(item2.name);
      expect(items[1].price).to.equal(item2.price);

      console.log("Items[0].itemId", items[0].itemId);
      console.log("Item1.itemId", item1.itemId);
    });
  });

  describe("buyItem", function () {
    it("Should allow users to buy items from the wish list", async function () {
      const { wishList, addr1, addr2, item1 } = await loadFixture(
        deployWishListFixture
      );

      // Utilisation correcte de l'ID de l'item
      const itemIndex = 0;
      await wishList
        .connect(addr2)
        .buyItem(addr1.address, itemIndex, {
          value: item1.price,
        });

      const items = await wishList.getWishList(addr1.address);
      expect(items[itemIndex].isBought).to.equal(true);
      expect(items[itemIndex].buyer).to.equal(addr2.address);
    });

    it("Should revert if not enough funds are sent", async function () {
      const { wishList, addr1, addr2 } = await loadFixture(
        deployWishListFixture
      );

      const itemIndex = 0;
      await expect(
        wishList.connect(addr2).buyItem(addr1.address, itemIndex, {
          value: ethers.parseEther("0.5"),
        })
      ).to.be.revertedWithCustomError(wishList, "NotEnoughFunds");
    });

    it("Should revert if the item is already bought", async function () {
      const { wishList, addr1, addr2, item1 } = await loadFixture(
        deployWishListFixture
      );

      const itemIndex = 0;
      await wishList
        .connect(addr2)
        .buyItem(addr1.address, itemIndex, {
          value: item1.price,
        });

      await expect(
        wishList.connect(addr2).buyItem(addr1.address, itemIndex, {
          value: item1.price,
        })
      ).to.be.revertedWithCustomError(wishList, "AlreadyBought");
    });
  });

  describe("getWishList", function () {
    it("Should return the correct wish list for an address", async function () {
      const { wishList, owner, addr1, item1, item2 } =
        await loadFixture(deployWishListFixture);

      const addr1WishList = await wishList.getWishList(addr1.address);
      expect(addr1WishList.length).to.equal(2);
      expect(addr1WishList[0].name).to.equal(item1.name);
      expect(addr1WishList[0].price).to.equal(item1.price);
      expect(addr1WishList[1].name).to.equal(item2.name);
      expect(addr1WishList[1].price).to.equal(item2.price);
    });
  });
});
