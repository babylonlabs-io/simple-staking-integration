import { useRef, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { PiWalletBold } from "react-icons/pi";
import { Tooltip } from "react-tooltip";
import { useOnClickOutside } from "usehooks-ts";

import { useHealthCheck } from "@/app/hooks/useHealthCheck";
import { trim } from "@/utils/trim";

import { Hash } from "../Hash/Hash";
import { LoadingSmall } from "../Loading/Loading";

interface BbnConnectSmallProps {
  onConnect: () => void;
  bbnAddress: string;
  bbnWalletBalance?: number;
  onDisconnect: () => void;
}

export const BbnConnectSmall: React.FC<BbnConnectSmallProps> = ({
  onConnect,
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

  const { isApiNormal, isGeoBlocked, apiMessage } = useHealthCheck();

  const renderApiNotAvailableTooltip = () => {
    if (!isGeoBlocked && isApiNormal) return null;

    return (
      <>
        <span
          className="cursor-pointer text-xs"
          data-tooltip-id="tooltip-connect-bbn"
          data-tooltip-content={apiMessage}
          data-tooltip-place="bottom"
        >
          <AiOutlineInfoCircle />
        </span>
        <Tooltip id="tooltip-connect-bbn" className="tooltip-wrap" />
      </>
    );
  };

  return bbnAddress ? (
    <div className="relative mr-[-10px] text-sm hidden md:flex" ref={ref}>
      <button
        className="flex cursor-pointer outline-none items-stretch"
        onClick={() => setShowMenu(!showMenu)}
      >
        <div className="flex items-center rounded-lg border border-base-200/75 p-2 pr-4">
          <div className="flex items-center gap-1">
            <span className="text-secondary font-semibold">BBN:</span>
            {typeof bbnWalletBalance === "number" ? (
              <p>
                <strong>{bbnWalletBalance.toFixed(2)} tBBN</strong>
              </p>
            ) : (
              <LoadingSmall text="Loading..." />
            )}
          </div>
        </div>
        <div className="relative right-[10px] flex items-center rounded-lg border border-secondary bg-secondary/10 p-2">
          {trim(bbnAddress)}
        </div>
      </button>
      {showMenu && (
        <div
          className="absolute right-[10px] top-0 z-10 mt-[4.5rem] flex flex-col gap-4 rounded-lg bg-base-300 p-4 shadow-lg"
          style={{
            width: "calc(100% - 8px)",
          }}
        >
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
  ) : (
    <div className="flex items-center gap-1">
      <button
        className="btn-secondary btn h-[2.5rem] min-h-[2.5rem] rounded-full px-2 text-white md:rounded-lg"
        onClick={onConnect}
        disabled={!!bbnAddress || !isApiNormal}
      >
        <PiWalletBold size={20} className="flex md:hidden" />
        <span className="hidden md:flex">Connect to Babylon network</span>
      </button>
      {!isApiNormal && renderApiNotAvailableTooltip()}
    </div>
  );
};
