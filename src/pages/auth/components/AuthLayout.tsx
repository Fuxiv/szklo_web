import { ReactNode } from "react";

interface AuthLayoutProps {
  children?: ReactNode;
  props?: {
    padding?: string;
  };
}

export const AuthLayout = ({ children, props }: AuthLayoutProps) => {
  return (
    <div className="authLayout" {...props}>
      {children}
    </div>
  );
};
