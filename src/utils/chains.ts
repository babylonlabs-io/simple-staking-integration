// We can provide all the information about the chains here

export const BabylonChainInfo = {
  // Chain-id of the Babylon chain.
  chainId: process.env.NEXT_PUBLIC_BBN_CHAIN_ID || "chain-test",
  // The name of the chain to be displayed to the user.
  chainName: process.env.NEXT_PUBLIC_BBN_CHAIN_NAME || "Babylon Devnet",
  chainSymbolImageUrl:
    "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/bbn-dev/chain.png",
  // RPC endpoint of the chain
  rpc:
    process.env.NEXT_PUBLIC_BBN_RPC ||
    "https://rpc-euphrates.devnet.babylonchain.io",
  // REST endpoint of the chain.
  rest:
    process.env.NEXT_PUBLIC_BBN_LCD ||
    "https://lcd-euphrates.devnet.babylonchain.io",
  nodeProvider: {
    name: "Babylon Labs",
    email: "contact@babylonlabs.io",
    website: "https://babylonlabs.io/",
  },
  // The BIP44 path.
  bip44: {
    // You can only set the coin type of BIP44.
    // 'Purpose' is fixed to 44.
    coinType: 118,
  },
  // Bech32 configuration to show the address to user.
  bech32Config: {
    bech32PrefixAccAddr: "bbn",
    bech32PrefixAccPub: "bbnpub",
    bech32PrefixValAddr: "bbnvaloper",
    bech32PrefixValPub: "bbnvaloperpub",
    bech32PrefixConsAddr: "bbnvalcons",
    bech32PrefixConsPub: "bbnvalconspub",
  },
  // List of all coin/tokens used in this chain.
  currencies: [
    {
      // Coin denomination to be displayed to the user.
      coinDenom: "BBN",
      // Actual denom (i.e. uatom, uscrt) used by the blockchain.
      coinMinimalDenom: "ubbn",
      // # of decimal points to convert minimal denomination to user-facing denomination.
      coinDecimals: 6,
      // Image of the coin
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/bbn-dev/chain.png",
    },
  ],
  // List of coin/tokens used as a fee token in this chain.
  feeCurrencies: [
    {
      // Coin denomination to be displayed to the user.
      coinDenom: "BBN",
      // Actual denom (i.e. uatom, uscrt) used by the blockchain.
      coinMinimalDenom: "ubbn",
      // # of decimal points to convert minimal denomination to user-facing denomination.
      coinDecimals: 6,
      // Image of the coin
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/bbn-dev/chain.png",
      // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
      // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
      // coinGeckoId: ""
      // (Optional) This is used to set the fee of the transaction.
      // If this field is not provided and suggesting chain is not natively integrated, Keplr extension will set the Keplr default gas price (low: 0.01, average: 0.025, high: 0.04).
      // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
      // Make sure that the gas prices are higher than the minimum gas prices accepted by chain finality providers and RPC/REST endpoint.
      gasPriceStep: {
        low: 0.007,
        average: 0.007,
        high: 0.01,
      },
    },
  ],
  // Staking coin information
  stakeCurrency: {
    // Coin denomination to be displayed to the user.
    coinDenom: "BBN",
    // Actual denom (i.e. uatom, uscrt, uosmo) used by the blockchain.
    coinMinimalDenom: "ubbn",
    // # of decimal points to convert minimal denomination to user-facing denomination.
    coinDecimals: 6,
    // Image of the coin
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/bbn-dev/chain.png",
    // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
    // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
    // coinGeckoId: ""
  },
  features: ["cosmwasm"],
};
