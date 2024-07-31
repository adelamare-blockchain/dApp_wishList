export const contractABI = [
  { inputs: [], name: "AlreadyBought", type: "error" },
  { inputs: [], name: "NotEnoughFunds", type: "error" },
  {
    inputs: [],
    name: "_itemIds",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "uint256", name: "_price", type: "uint256" },
    ],
    name: "addToWishList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_for", type: "address" },
      { internalType: "uint16", name: "_itemId", type: "uint16" },
    ],
    name: "buyItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_of", type: "address" },
    ],
    name: "getWishList",
    outputs: [
      {
        components: [
          { internalType: "uint16", name: "itemId", type: "uint16" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "bool", name: "isBought", type: "bool" },
          { internalType: "address", name: "buyer", type: "address" },
        ],
        internalType: "struct WishList.Item[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const contractAddress =
  "0x6855a7f660BeC65AA7F29A0545bF914a806D123d";
///Disponible sur https://amoy.polygonscan.com/address/0x6855a7f660BeC65AA7F29A0545bF914a806D123d#code
