import axios from "axios";
import { encode } from "url-safe-base64";

export const getBBNBalance = async (key: string) => {
  if (!key) {
    return;
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BBN_LCD}/cosmos/bank/v1beta1/balances/${encode(
        key,
      )}`,
    );
    return response?.data?.balances ? response.data : null;
  } catch (error) {
    throw new Error((error as Error)?.message);
  }
};
