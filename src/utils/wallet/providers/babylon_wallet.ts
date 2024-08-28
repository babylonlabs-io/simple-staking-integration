import { BabylonChainInfo } from "@/utils/chains";

const chainId: string = process.env.NEXT_PUBLIC_BBN_CHAIN_ID || "chain-test";

export class BbnWalletInfo {
  name: string;
  address: Buffer;
  addressBech32: string;
  publicKey: Buffer;
  chainId: string;

  constructor(
    chainId: string,
    name: string,
    address: Buffer,
    addressBech32: string,
    publicKey: Buffer,
  ) {
    this.chainId = chainId;
    this.name = name;
    this.address = address;
    this.addressBech32 = addressBech32;
    this.publicKey = publicKey;
  }

  async signData(data: Buffer): Promise<Buffer> {
    const resp = await window.keplr?.signArbitrary(
      this.chainId,
      this.addressBech32,
      data,
    );
    return Buffer.from(resp.signature, "base64");
  }
}

export async function connectKeplrWallet(): Promise<BbnWalletInfo> {
  // OKX provides Keplr wallet, but it cannot used with our app
  if (!window.keplr || window?.keplr?.isOkxWallet) {
    throw new Error("Keplr wallet is not installed");
  }

  // Enable Keplr before using it
  // This method will ask the user whether to allow access if they haven't visited this website.
  // Also, it will request that the user unlock the wallet if the wallet is locked.
  try {
    await window.keplr?.enable(chainId);
  } catch (error) {
    if ((error as Error)?.message?.includes(chainId)) {
      try {
        // User has no BBN chain in their wallet
        // Add BBN chain to keplr
        await window.keplr.experimentalSuggestChain(BabylonChainInfo);
      } catch (error) {
        throw new Error("Babylon chain is not enabled");
      }

      // Enable BBN chain, throws error to outer catch block if rejected
      await window.keplr?.enable(chainId);
    } else {
      if ((error as Error)?.message?.includes("rejected")) {
        throw new Error("Keplr wallet connection request rejected");
      } else if ((error as Error)?.message?.includes("context invalidated")) {
        throw new Error("Extension context invalidated");
      } else {
        throw new Error((error as Error)?.message);
      }
    }
  }

  const info = await window.keplr?.getKey(chainId);
  return new BbnWalletInfo(
    chainId,
    info.name,
    info.address,
    info.bech32Address,
    Buffer.from(info.pubKey),
  );
}
