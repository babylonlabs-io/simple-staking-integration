import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useOnClickOutside } from "usehooks-ts";

import { trim } from "@/utils/trim";

import { Hash } from "../Hash/Hash";
import { LoadingSmall } from "../Loading/Loading";

interface BbnConnectedSmallProps {
  bbnAddress: string;
  bbnWalletBalance: number;
  onDisconnect: () => void;
}

export const BbnConnectedSmall: React.FC<BbnConnectedSmallProps> = ({
  bbnAddress,
  bbnWalletBalance,
  onDisconnect,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleClickOutside = () => {
    setShowMenu(false);
  };

  const ref = useRef(null);
  useOnClickOutside(ref, handleClickOutside);

  return (
    bbnAddress && (
      <div className="relative flex text-sm" ref={ref}>
        <button
          className="flex cursor-pointer outline-none items-stretch w-full justify-between"
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="flex items-center rounded-lg border border-base-200/75 p-2 pr-4 w-full">
            <div className="flex items-center gap-1 w-full justify-center">
              <span className="text-secondary font-semibold">BBN:</span>
              {typeof bbnWalletBalance === "number" ? (
                <p>
                  <strong>{bbnWalletBalance.toFixed(2)} BBN</strong>
                </p>
              ) : (
                <LoadingSmall text="Loading..." />
              )}
            </div>
          </div>
          <div className="relative flex items-center rounded-lg border border-secondary bg-secondary/10 p-2">
            {trim(bbnAddress)}
          </div>
        </button>
        {showMenu && (
          <div className="absolute top-0 z-10 mt-[4.5rem] flex flex-col gap-4 rounded-lg bg-base-300 p-4 shadow-lg w-full">
            <div className="flex items-center justify-between">
              <h3 className="font-bold dark:text-neutral-content">
                Keplr Wallet
              </h3>
              <button
                className="btn btn-circle btn-ghost btn-sm"
                onClick={() => setShowMenu(false)}
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="flex flex-col">
              <Hash value={bbnAddress} address noFade fullWidth />
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                setShowMenu(false);
                onDisconnect();
              }}
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    )
  );
};
