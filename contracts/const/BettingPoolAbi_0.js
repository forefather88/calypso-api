module.exports = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_gameType",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_endDate",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_currency",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "_currencyDetails",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "_whitelist",
        type: "address[]",
      },
      {
        internalType: "bool[]",
        name: "_bools",
        type: "bool[]",
      },
      {
        internalType: "int256[]",
        name: "_handicap",
        type: "int256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_depositedCal",
        type: "uint256",
      },
    ],
    name: "addMaxCap",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newAddress",
        type: "address",
      },
    ],
    name: "addWhitelistAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_side",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
    ],
    name: "betWithEth",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_side",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
    ],
    name: "betWithToken",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newDate",
        type: "uint256",
      },
    ],
    name: "changeEndDate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newAddress",
        type: "address",
      },
    ],
    name: "changeOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimReward",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "claimedAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "claimedUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "createdDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currency",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "depositedCal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "game",
    outputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "gameType",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_betId",
        type: "string",
      },
    ],
    name: "getBet",
    outputs: [
      {
        internalType: "string",
        name: "betId",
        type: "string",
      },
      {
        internalType: "address",
        name: "_bettor",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "_side",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_createdDate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_side",
        type: "uint8",
      },
    ],
    name: "getBetAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBetIdsOf",
    outputs: [
      {
        internalType: "string[]",
        name: "_betIds",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolDetail",
    outputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "gameType",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "endDate",
            type: "uint256",
          },
        ],
        internalType: "struct Game",
        name: "_game",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "_currency",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_poolFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_depositedCal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxCap",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isPrivate",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_minPoolSize",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_hasHandicap",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_isUnlimited",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolDetail2",
    outputs: [
      {
        internalType: "uint8",
        name: "_result",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_total",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_winOutcome",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_winTotal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_refund",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_poolFeeAmount",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_betUsers",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "_createdDate",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_whitelist",
        type: "address[]",
      },
      {
        internalType: "bool",
        name: "_claimedDepositAndFee",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_minBet",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "int256",
            name: "whole",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "fractional",
            type: "int256",
          },
        ],
        internalType: "struct Handicap",
        name: "_handicap",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "_reward",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_claimed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "handicap",
    outputs: [
      {
        internalType: "int256",
        name: "whole",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "fractional",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hasHandicap",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isPrivate",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isUnlimited",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "isWhiteList",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxCap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minBet",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minPoolSize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "contract Oracle",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "platformFeeAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolFeeAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolManager",
    outputs: [
      {
        internalType: "contract PoolManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_oldAddress",
        type: "address",
      },
    ],
    name: "removeWhitelistAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "result",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_sideWin",
        type: "uint8",
      },
      {
        internalType: "int256",
        name: "_aResult",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "_bResult",
        type: "int256",
      },
    ],
    name: "setResult",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "sideTotals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_sideWin",
        type: "uint8",
      },
    ],
    name: "testSetResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "testforwardAffiliateAward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "testforwardPlatformFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "title",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "total",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "whitelist",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winOutcome",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winTotal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawDepositAndFee",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
