import { ReactNode } from "react";
import "../../../field.css";

interface AuthFieldProps {
  children: ReactNode;
}

const AuthField = ({ children }: AuthFieldProps) => {
  return (
    <div className="authCard">
      <div className="authCartFilter">{children}</div>
    </div>
  );
};

export default AuthField;
