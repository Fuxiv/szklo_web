import { ReactNode } from "react";

interface UserLayoutProps {
  children?: ReactNode; 
  props?: {
    padding?: string;
  };
}

export const UserLayout = ({ children, props }:UserLayoutProps) => {
  return (
    <div className="userLayout" {...props}>
      {children}
    </div>
  );
};
