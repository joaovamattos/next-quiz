import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { toast } from "react-toastify";

interface ToastContextData {
  showToast(type: string, message: string): void;
  showConfirmToast: boolean;
  setShowConfirmToast: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [showConfirmToast, setShowConfirmToast] = useState(false);

  function showToast(type, message) {
    toast[type](message);
  }

  return (
    <Context.Provider
      value={{ showToast, showConfirmToast, setShowConfirmToast }}
    >
      {children}
    </Context.Provider>
  );
};

export function useToast() {
  const context = useContext(Context);
  return context;
}
