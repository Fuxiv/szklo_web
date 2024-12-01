import { AuthLayout } from "../auth/components/AuthLayout";
import { UserHomeInfo } from "./components/UserHomeInfo";

export const HomeUserScreen = ({}) => {
  return (
    <AuthLayout>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent:'center',
          paddingTop:10,
          paddingBottom:10,
          height:'100%',
        }}
      >
          <UserHomeInfo />
      </div>
    </AuthLayout>
  );
};
