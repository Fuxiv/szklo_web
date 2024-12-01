import { Box, Button, TextBox, Toast } from "devextreme-react";
import { Item } from "devextreme-react/box";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getString } from "../../locales/string";
import {
  loginAction,
  resetPasswordAction,
} from "../../business/action/authAction";
import AuthField from "./components/AuthField";
import { AuthLayout } from "./components/AuthLayout";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../business/reducer/store";

export const RemindPasswordScreen = ({}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState<any>();
  const [repeatPassword, setRepeatPassword] = useState<any>();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { remindToken } = useParams();

  console.log(remindToken);
  const sumbit = async () => {
    // console.log(mail,password)
    if (newPassword === repeatPassword) {
      //@ts-ignore
      const succes = await dispatch(resetPasswordAction(newPassword, remindToken));
      console.log("remind password 2/2", succes);

      if (succes === "POSITIVE") {
        navigate("/signIn");
      }
    }
  };
  return (
    <AuthLayout>
      <AuthField>
        <Box id={"login"} width={"100%"}>
          <Item ratio={1}>
            <h1 className="text-h1">
              {getString("remindPassword", "writeNewPassword")}
            </h1>
          </Item>
        </Box>
        <Box
          id={"containerInput"}
          width={"100%"}
          crossAlign={"stretch"}
          align={"center"}
        >
          <Item ratio={1}>
            <p
              style={{
                color: "#fff",
                fontSize: 14,
                fontFamily: "Poppins",
                fontWeight: 400,
                marginBottom: 12,
                textAlign: "left",
              }}
            >
              {getString("remindPassword", "newPassword")}
            </p>
            <TextBox
              id={"textInputAuth"}
              mode={!showNewPassword ? "password" : "text"}
              onValueChanged={(v) => {
                setNewPassword(v.value);
              }}
            >
               <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  right: 30,
                  marginTop: 6,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    zIndex: 1,
                  }}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  icon={"/icons/eyePassword.svg"}
                />
              </div>
            </TextBox>
            <p
              style={{
                color: "#fff",
                fontSize: 14,
                fontFamily: "Poppins",
                fontWeight: 400,
                marginBottom: 12,
                marginTop: 26,
                textAlign: "left",
              }}
            >
              {getString("remindPassword", "repeatPassword")}
            </p>

            <TextBox
              id={"textInputAuth"}
              mode={!showRepeatPassword ? "password" : "text"}
              onValueChanged={(v) => {
                setRepeatPassword(v.value);
              }}
            >
                <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  right: 30,
                  marginTop: 6,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    zIndex: 1,
                  }}
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  icon={"/icons/eyePassword.svg"}
                />
              </div>
            </TextBox>
          </Item>
        </Box>
        <Box id={"nextBox"}>
          <Item ratio={1}>
            <Button
              id={"myButton1"}
              text={getString("remindPassword", "reset")}
              width={"100%"}
              height={45}
              onClick={sumbit}
              icon={"/icons/arrowLog.svg"}
              rtlEnabled={true}
            />
            <div
              style={{
                justifyContent: "center",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <p
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "Poppins",
                  fontWeight: 300,
                  marginRight: 5,
                }}
              >
                {getString("login", "notAccount")}
              </p>
              <Link
                to={{ pathname: "/signUp" }}
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  textDecoration: "none",
                }}
              >
                {getString("login", "toRegister")}
              </Link>
            </div>
          </Item>
        </Box>
      </AuthField>
    </AuthLayout>
  );
};
