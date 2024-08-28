import { IoMdClose } from "react-icons/io";
import { PiWalletBold } from "react-icons/pi";

import { GeneralModal } from "./GeneralModal";

interface BbnConnectModalProps {
  open: boolean;
  onClose: (value: boolean) => void;
  onConnect: () => void;
}

export const BbnConnectModal: React.FC<BbnConnectModalProps> = ({
  open,
  onClose,
  onConnect,
}) => {
  return (
    <GeneralModal open={open} onClose={onClose}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold">Connect to Babylon Network</h3>
        <button
          className="btn btn-circle btn-ghost btn-sm"
          onClick={() => onClose(false)}
        >
          <IoMdClose size={24} />
        </button>
      </div>
      <p className="mb-4">
        You are about to connect to the Babylon network using Keplr wallet.
      </p>
      <button
        className="btn-secondary btn h-[2.5rem] min-h-[2.5rem] rounded-lg px-2 text-white w-full"
        onClick={onConnect}
      >
        <PiWalletBold size={20} />
        Connect to Babylon network
      </button>
    </GeneralModal>
  );
};
