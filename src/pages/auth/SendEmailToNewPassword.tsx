import { Box, Button, TextBox, Toast } from "devextreme-react";
import { Item } from "devextreme-react/box";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getString } from "../../locales/string";
import {
  registerAction,
  remindPasswordAction,
  sendConfirm,
} from "../../business/action/authAction";
import { useAppDispatch, useAppSelector } from "../../business/reducer/store";
import AuthField from "./components/AuthField";
import { AuthLayout } from "./components/AuthLayout";

export const SendEmailToNewPassword = ({}) => {
  const dispatch = useAppDispatch();

  const [mail, setMail] = useState<any>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [succesSend, setSuccesSend] = useState(false);
  const [validationMail, setValidationMail] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const onHiding = () => {
    setShowToast(false);
  };
  const validationEmail = () => {
    const customerEmailRegex =
      /[a-zA-Z0-9.!\#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/;
    console.log("regex", customerEmailRegex.test(mail.trim()));
    setValidationMail(!customerEmailRegex.test(mail.trim()));
    return !customerEmailRegex.test(mail.trim());
  };


  const sumbit = async () => {
   if(!validationEmail()){
    const succes = await dispatch(remindPasswordAction(mail)).then(() =>
      setSuccesSend(true)
    );
   }
  };

  return (
    <AuthLayout>
      <Toast
        id={"toastRegister"}
        visible={succesSend}
        message={getString("remindPassword", "verifyMailInfo")}
        type={"success"}
        onHiding={onHiding}
        closeOnClick
        displayTime={10000}
        position={"top center"}
        width={"50%"}
        height={70}
      />
      <AuthField>
        <Box id={"login"} width={"100%"}>
          <Item ratio={1}>
            <h1 className="text-h1">
              {getString("remindPassword", "remindPassword")}
            </h1>
          </Item>
        </Box>
        <Box>
          <Item ratio={1}>
            <p
              style={{
                color: "#fff",
                fontSize: 14,
                fontFamily: "Poppins",
                fontWeight: 400,
                marginTop: 12,
              }}
            >
              {getString("remindPassword", "writeEmail")}
            </p>
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
              {getString("login", "email")}
            </p>
            <TextBox
              id={"textInputAuth"}
              onValueChanged={(v) => {
                setMail(v.value);
              }}
            />
            {validationMail ?  <p
                style={{
                  color: "white",
                  fontFamily: "Poppins",
                  fontSize: 11,
                  marginTop: 5,
                }}
              >
               {getString("register", "badEmail")}
              </p> : null}
          </Item>
        </Box>
        <Box id={"nextBox"}>
          <Item ratio={1}>
            <Button
              onClick={sumbit}
              id={"myButton1"}
              text={getString("verifi", "send")}
              width={"100%"}
              height={45}
              icon={"/icons/arrowLog.svg"}
              rtlEnabled={true}
            />
          </Item>
        </Box>
      </AuthField>
    </AuthLayout>
  );
};
