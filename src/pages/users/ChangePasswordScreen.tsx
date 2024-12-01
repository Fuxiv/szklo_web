import { Box, Button, TextBox, Toast } from "devextreme-react";
import { Item } from "devextreme-react/box";
import { Button as TextBoxButton } from "devextreme-react/text-box";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getString } from "../../locales/string";
import {
  loginAction,
  logout,
  resetPasswordAction,
} from "../../business/action/authAction";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../business/reducer/store";
import { AuthLayout } from "../auth/components/AuthLayout";
import AuthField from "../auth/components/AuthField";
import { newPasswordAction } from "../../business/action/usersActions";
import { ButtonEdit } from "./components/ButtonEdit";

export const ChangePasswordScreen = ({}) => {
  const dispatch = useAppDispatch();
  const [oldPassword, setOldPassword] = useState<any>();
  const [newPassword, setNewPassword] = useState<any>();
  const [repeatPassword, setRepeatPassword] = useState<any>();
  const token = useAppSelector((state) => state.auth.token);
  const [showToast, setShowToast] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();

  const sumbit = async () => {
    if (newPassword !== oldPassword && newPassword === repeatPassword && newPassword.length>0 && repeatPassword.length>0 && oldPassword.lenght>0) {
      //@ts-ignore
      const succes = await dispatch(newPasswordAction(oldPassword, newPassword, token));

      if (succes === "POSITIVE") {
        dispatch(logout());
      }
    }
  };
  const onHiding = () => {
    setShowToast(false);
  };
  return (
    <AuthLayout>
      <Toast
        id={"toastRegister"}
        visible={showToast}
        message={getString("profile", "succesChangePassword")}
        type={"success"}
        onHiding={onHiding}
        displayTime={3000}
        position={"top center"}
        width={"50%"}
        height={70}
      />
      <AuthField>
      <div style={{position:'absolute'}}>
          <ButtonEdit
            id={"backArrow"}
            icon={"/icons/arrowBack.svg"}
            onClick={() => navigate(-1)}
            // width={"20%"}
            style={{ alignSelf: "left", display: "flex" }}
          />
          </div>
        <Box id={"login"} width={"100%"}>
         
          <Item ratio={1}>
            <div style={{ fontSize: 24, marginBottom: -30}}>
            <h1 className="text-h1" style={{ fontSize: 24}}>
              {getString("profile", "changePasswordtitle")}
            </h1>
           
          </div>
          </Item>
        </Box>
        <Box
          id={"containerInput"}
          width={"100%"}
          crossAlign={"stretch"}
          align={"center"}
        >
          <Item ratio={1}>
            <p id="titleInput">{getString("profile", "oldPassword")}</p>
            <TextBox
              id={"textInputAuth"}
              style={{ alignItems: "flex-start", display: "flex" }}
              mode={!showOldPassword ? "password" : "text"}
              onValueChanged={(v) => {
                setOldPassword(v.value);
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
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  icon={"/icons/eyePassword.svg"}
                />
              </div>
            </TextBox>
            <p id="titleInput" style={{ marginTop: 20 }}>
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
              text={getString("profile", "save")}
              width={"100%"}
              height={45}
              onClick={sumbit}
            />
          </Item>
        </Box>
      </AuthField>
    </AuthLayout>
  );
};
