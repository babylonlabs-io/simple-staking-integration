import { shouldDisplayTestingMsg } from "@/config";

import { BbnConnectSmall } from "../Connect/BbnConnectSmall";
import { BbnConnectedSmall } from "../Connect/BbnConnectedSmall";
import { ConnectSmall } from "../Connect/ConnectSmall";
import { ConnectedSmall } from "../Connect/ConnectedSmall";
import { Logo } from "../Logo/Logo";
import { TestingInfo } from "../TestingInfo/TestingInfo";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

interface HeaderProps {
  onConnect: () => void;
  onConnectBabylon: () => void;
  address: string;
  bbnAddress: string;
  btcWalletBalanceSat?: number;
  bbnWalletBalance?: number;
  onDisconnect: () => void;
  onDisconnectBabylon: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onConnect,
  onConnectBabylon,
  address,
  bbnAddress,
  btcWalletBalanceSat,
  bbnWalletBalance,
  onDisconnect,
  onDisconnectBabylon,
}) => {
  return (
    <nav>
      <div className="bg-base-300 shadow-sm">
        <div className="container mx-auto flex w-full items-center justify-between gap-4 p-6 pb-4 md:pb-6">
          <Logo />
          <div className="flex flex-1">
            {shouldDisplayTestingMsg() && (
              <div className="hidden flex-1 xl:flex">
                <TestingInfo />
              </div>
            )}
          </div>
          <ConnectSmall
            onConnect={onConnect}
            address={address}
            btcWalletBalanceSat={btcWalletBalanceSat}
            onDisconnect={onDisconnect}
          />
          <BbnConnectSmall
            onConnect={onConnectBabylon}
            bbnAddress={bbnAddress}
            bbnWalletBalance={bbnWalletBalance}
            onDisconnect={onDisconnectBabylon}
          />
          <ThemeToggle />
        </div>
        <div
          className={`${address && "justify-end p-6 pt-0"}container mx-auto flex w-full items-center gap-4 md:hidden md:p-0`}
        >
          <ConnectedSmall
            address={address}
            btcWalletBalanceSat={btcWalletBalanceSat}
            onDisconnect={onDisconnect}
          />
          <BbnConnectedSmall
            bbnAddress={bbnAddress}
            bbnWalletBalance={bbnWalletBalance}
            onDisconnect={onDisconnectBabylon}
          />
        </div>
      </div>
      {shouldDisplayTestingMsg() && (
        <div className="container mx-auto flex w-full items-center p-6 pb-0 xl:hidden">
          <TestingInfo />
        </div>
      )}
    </nav>
  );
};
