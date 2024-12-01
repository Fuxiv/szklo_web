import { Box, Button, TextBox, Toast, Validator } from "devextreme-react";
import { Item } from "devextreme-react/box";
import { useState } from "react";
import { sendMessage } from "../../business/action/usersActions";
import { useAppDispatch } from "../../business/reducer/store";
import { getString } from "../../locales/string";
import { AuthLayout } from "../auth/components/AuthLayout";
import GuestField from "../auth/components/GuestField";
import { GuestInfo } from "./components/GuestInfo";
import { TextArea } from "devextreme-react/text-area";
import {
  AsyncRule,
  EmailRule,
  PatternRule,
  RequiredRule,
} from "devextreme-react/validator";
export const GuestFormScreen = ({}) => {
  const dispatch = useAppDispatch();

  console.log();
  const [userName, setUserName] = useState<any>();
  const [mail, setMail] = useState<any>("");
  const [message, setMessage] = useState<any>();
  const [showToast, setShowToast] = useState(false);
  const [validForm, setValidForm] = useState(true);

  const validationEmail = () => {
    const customerEmailRegex =
      /[a-zA-Z0-9.!\#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/;
    console.log("regex", customerEmailRegex.test(mail.trim()));
    return !customerEmailRegex.test(mail.trim());
  };

  const [checkValid, setCheckValid] = useState(true);
  console.log("showToast", showToast);
  const sumbit = async () => {
    // setCheckValid(false);
    if (
      !validationEmail() &&
      userName.trim().length > 0 &&
      message.trim().length > 0
    ) {
      setValidForm(true);
      const res = await dispatch(sendMessage(userName, mail, message));
      console.log("response sen message", res);
      //@ts-ignore
      if (res) {
        setShowToast(true);
        setTimeout(() => {
          setUserName("");
          setMail("");
          setMessage("");
        }, 1000);
      }
    } else {
      setValidForm(false);
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
        message={getString("guest", "sendSucces")}
        type={"success"}
        closeOnClick
        displayTime={10000}
        onHiding={onHiding}
        position={"top center"}
        width={"50%"}
        height={70}
      />
      <div
      className={"containerFormGuest"}
      >
          <GuestInfo />
        <div
          className="formContainerGuest"
        >
          <GuestField>
            <Box width={"100%"}>
              <Item ratio={1}>
                <h1
                  className="text-h1"
                  style={{
                    width: "100%",
                    fontWeight: 700,
                    fontFamily: "Poppins",
                    marginBottom: 30,
                  }}
                >
                  {getString("guest", "writeMessage")}
                </h1>
              </Item>
            </Box>
            <Box
              id={"containerForm"}
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
                  {getString("guest", "userName")}
                </p>
                <TextBox
                  id={"textInputGuest"}
                  value={userName}
                  onValueChanged={(v) => {
                    setUserName(v.value);
                  }}
                >
                  {/* <Validator>
                    <RequiredRule message="Wprowadź imię i nazwisko" />
                 
                  </Validator> */}
                </TextBox>
                <p
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    marginTop: 20,
                    textAlign: "left",
                    marginBottom: 10,
                  }}
                >
                  {getString("guest", "email")}
                </p>
                <TextBox
                  id={"textInputGuest"}
                  value={mail}
                  onValueChanged={(v) => {
                    setMail(v.value);
                  }}
                >
                  {/* <Validator>
                    <RequiredRule message="Błędnie wprowadzony email" />
                    <EmailRule message="Błędnie wprowadzony email" />
               
                  </Validator> */}
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
                  {getString("guest", "message")}
                </p>

                <TextArea
                  id={"textAreaGuest"}
                  height={"auto"}
                  // isValid={true}
                  minHeight={100}
                  maxHeight={400}
                  autoResizeEnabled={true}
                  value={message}
                  onValueChanged={(v) => {
                    setMessage(v.value);
                  }}
                >
                  {/* <Validator>
                    <RequiredRule message="Wprowadź tekst" />
                  </Validator> */}
                </TextArea>
              </Item>
            </Box>
            {validForm === false ? (
              <p
                style={{
                  color: "#c42b2b",
                  marginTop: 20,
                  fontSize: 13,
                  fontFamily: "Poppins",
                  textAlign: "center",
                }}
              >
                {getString('guest','validForm')}
              </p>
            ) : null}
            <Box id={"sendBtn"} style={{marginTop:20}}>
              <Item ratio={1}>
                <Button
                  id={"myButton1"}
                  text={getString("guest", "send")}
                  width={"100%"}
                  height={45}
                  onClick={sumbit}
                  icon={"/icons/arrowLog.svg"}
                  rtlEnabled={true}
                  useSubmitBehavior={checkValid}
                />
              </Item>
            </Box>
          </GuestField>
        </div>
      </div>
    </AuthLayout>
  );
};
