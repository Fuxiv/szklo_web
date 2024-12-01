import { Box, Button, TextBox, Toast } from "devextreme-react";
import { Item } from "devextreme-react/box";
import { useEffect, useState } from "react";
import {
  currentUser,
  deleteAccount,
  editUser,
} from "../../business/action/usersActions";
import { useAppDispatch, useAppSelector } from "../../business/reducer/store";
import { getString } from "../../locales/string";
import { AuthLayout } from "../auth/components/AuthLayout";
import ProfileField from "../auth/components/ProfileField";
import { CheckBox } from "devextreme-react/check-box";
// import {
//   setCity,
//   setCompanyName,
//   setCountry,
//   setEmail,
//   setName,
//   setNip,
//   setPhone,
//   setSurname,
//   setType,
//   setZipCode,
// } from "../../business/reducer/editUserSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../business/action/authAction";
import { ButtonEdit } from "./components/ButtonEdit";

export const ProfileScreen = ({}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log();
  const [userName, setUserName] = useState<any>();
  const [mail, setMail] = useState<any>();
  const [message, setMessage] = useState<any>();
  let value = localStorage.getItem("token");
  const token = useAppSelector((state) => state.auth.token);
  const [showToast, setShowToast] = useState(false);

  //   console.log("TOKEN", token);
  //   console.log("value", value);
  const data = useAppSelector((state) => state.editUser);
  console.log(
    JSON.stringify({
      data,
    })
  );

  useEffect(() => {
    dispatch(currentUser(token));
  }, [token, dispatch]);

  const sumbit = async () => {
    //@ts-ignore
    const res = await dispatch(editUser(data, token));
    console.log("res profil", res);
    //@ts-ignore
    if (res === true) {
      setShowToast(true);
    }
  };

  const deleteProfil = async () => {
    const res = await dispatch(deleteAccount(token));
    //@ts-ignore
    if (res === true) {
      dispatch(logout());
    }
  };
  const onHiding = () => {
    setShowToast(false);
  };
  return (
    <AuthLayout>
      {/* <Toast
        id={"toastRegister"}
        visible={showToast}
        message={getString("profile", "seucesEditProfil")}
        type={"success"}
        onHiding={onHiding}
        displayTime={5000}
        position={"top center"}
        width={"50%"}
        height={70}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            marginTop: data.type === "COMPANY" ? 80 : 30,
          }}
        >
          <ProfileField>
            <div style={{ position: "absolute", left: 10, top: 10 }}>
              <ButtonEdit
                id={"backArrow"}
                icon={"/icons/arrowBack.svg"}
                onClick={() => navigate(-1)}
                style={{ alignSelf: "left", display: "flex" }}
              />
            </div>
            <Box width={"100%"}>
              <Item ratio={1}>
                <h1
                  className="text-h1"
                  style={{
                    width: "100%",
                    fontWeight: 700,
                    fontFamily: "Poppins",
                    marginBottom: 15,
                    textAlign: "left",
                  }}
                >
                  {getString("profile", "profil")}
                </h1>
              </Item>
            </Box>
            <div className="containerProfil">
              <Box
                id={"containerFormProfil"}
                // width={"45%"}
                crossAlign={"stretch"}
                align={"center"}
              >
                <Item ratio={1}>
                  <p id={"titleInput"}>{getString("profile", "name")}</p>
                  <TextBox
                    id={"textInputGuest"}
                    value={data.name}
                    onValueChanged={(v) => {
                      dispatch(setName(v.value));
                    }}
                  />
                  <p id={"titleInput"}>{getString("profile", "lastname")}</p>
                  <TextBox
                    id={"textInputGuest"}
                    value={data.surname}
                    onValueChanged={(v) => {
                      dispatch(setSurname(v.value));
                    }}
                  />
                  <p id={"titleInput"}>{getString("profile", "email")}</p>

                  <TextBox
                    id={"textInputGuest"}
                    height={45}
                    value={data.email}
                    onValueChanged={(v) => {
                      dispatch(setEmail(v.value));
                    }}
                  />
                  <p id={"titleInput"}>{getString("profile", "phoneNumber")}</p>

                  <TextBox
                    id={"textInputGuest"}
                    height={45}
                    value={data.phone}
                    onValueChanged={(v) => {
                      dispatch(setPhone(v.value));
                    }}
                  />
                  <p id={"titleInput"}>{getString("profile", "password")}</p>
                  <Button
                    id={"myButtonInfo"}
                    text={getString("profile", "changePassword")}
                    width={"100%"}
                    height={45}
                    onClick={() => navigate("/user/profil/newPassword")}
                  />
                </Item>
              </Box>

              <Box
                id={"containerFormProfil"}
                // width={"45%"}
                crossAlign={"stretch"}
                align={"center"}
                style={{ marginTop: -8 }}
              >
                <Item ratio={1}>
                  <p id={"titleInput"}>{getString("profile", "fv")}</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <CheckBox
                      value={data.type === "PRIVATE_PERSON" ? true : false}
                      onValueChange={(v) =>
                        dispatch(setType(v === true ? "PRIVATE_PERSON" : ""))
                      }
                    />
                    <p
                      style={{
                        color: "#081733",
                        fontFamily: "Poppins",
                        fontSize: 14,
                        marginLeft: 10,
                      }}
                    >
                      {getString("profile", "privatePerson")}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <CheckBox
                      value={data.type === "COMPANY" ? true : false}
                      onValueChange={(v) =>
                        dispatch(setType(v === true ? "COMPANY" : ""))
                      }
                    />
                    <p
                      style={{
                        color: "#081733",
                        fontFamily: "Poppins",
                        fontSize: 14,
                        marginLeft: 10,
                      }}
                    >
                      {getString("profile", "company")}
                    </p>
                  </div>
                  {data?.type === "COMPANY" ? (
                    <>
                      <p id={"titleInput"}>
                        {getString("profile", "companyName")}
                      </p>
                      <TextBox
                        id={"textInputGuest"}
                        value={data.companyName}
                        onValueChanged={(v) => {
                          dispatch(setCompanyName(v.value));
                        }}
                      />
                      <p id={"titleInput"}>{getString("profile", "nip")}</p>
                      <TextBox
                        id={"textInputGuest"}
                        value={data.nip}
                        onValueChanged={(v) => {
                          dispatch(setNip(v.value));
                        }}
                      />
                    </>
                  ) : null}
                  <p id={"titleInput"}>{getString("profile", "street")}</p>
                  <TextBox
                    id={"textInputGuest"}
                    value={data.city}
                    onValueChanged={(v) => {
                      dispatch(setCity(v.value));
                    }}
                  />
                  <p id={"titleInput"}>{getString("profile", "postalCode")}</p>

                  <TextBox
                    id={"textInputGuest"}
                    height={45}
                    value={data.zipCode}
                    onValueChanged={(v) => {
                      dispatch(setZipCode(v.value));
                    }}
                  />
                  <p id={"titleInput"}>{getString("profile", "city")}</p>

                  <TextBox
                    id={"textInputGuest"}
                    height={45}
                    value={data.country}
                    onValueChanged={(v) => {
                      dispatch(setCountry(v.value));
                    }}
                  />
                </Item>
              </Box>
            </div>
            <Box id={"sendBtnProfile"}>
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
            <div
              style={{
                justifyContent: "center",
                width: "100%",
                display: "flex",
              }}
            >
              {/* <Button
                id={"deleteAccount"}
                text={getString("profile", "deleteAccount")}
                icon={"/icons/trash.svg"}
                onClick={deleteProfil}
              /> */}
            {/* </div>
          </ProfileField>
        </div>
      </div> */} 
    </AuthLayout>
  );
};
