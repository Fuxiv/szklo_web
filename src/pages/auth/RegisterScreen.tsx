import { Box, Button, TextBox } from "devextreme-react";
import { Item } from "devextreme-react/box";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getString } from "../../locales/string";
import { registerAction } from "../../business/action/authAction";
import { useAppDispatch, useAppSelector } from "../../business/reducer/store";
import AuthField from "./components/AuthField";
import { AuthLayout } from "./components/AuthLayout";

export const RegisterScreen = ({}) => {
  const dispatch = useAppDispatch();

  const [mail, setMail] = useState<any>();
  const [password, setPassword] = useState<any>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const registerError = useAppSelector((state) => state.auth.errorRegister);
  const [showPassword, setShowPassword] = useState(false);
  const [validationPassword, setValidationPassword] = useState(true);
  const [validationMail, setValidationMail] = useState(false);
  const inputRef = useRef(null);


  const validationEmail = () => {
    const customerEmailRegex =
      /[a-zA-Z0-9.!\#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/;
    console.log("regex", customerEmailRegex.test(mail.trim()));
    setValidationMail(!customerEmailRegex.test(mail.trim()))
    return !customerEmailRegex.test(mail.trim());
  };

  const validPassword = () => {
    if (password.length < 6) setValidationPassword(false);
    else setValidationPassword(true);
  };
  const sumbit = async () => {
    validationEmail()
    validPassword();
    setIsLoading(true);
    if (!validationEmail() && password.trim().length >=6) {
    const isSucces = await dispatch(registerAction(mail, password));

    if (!isSucces) {
      setIsLoading(false);

      return;
    } else if (isSucces) {
      navigate("/signIn");
    }
  }
  };

  const keyPress = (e: any) => {
    if (e.event.key === "Enter") {
      //@ts-ignore
    sumbit();
    };
  };

  const focusTextBox = useCallback(() => {
    //@ts-ignore
  inputRef.current?.instance.focus();
}, []);
useEffect(() => { 
    focusTextBox()
    //@ts-ignore
    setTimeout(()=>{
      focusTextBox()
    },500)
   
}, []);

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter") {
        sumbit();
        // event.preventDefault();
      }
    };
    document.addEventListener("keyup", listener);
    return () => {
      document.removeEventListener("keyup", listener);
    };
  }, [password,mail]);

  return (
    <AuthLayout>
      <AuthField>
        <Box id={"login"} width={"100%"}>
          <Item ratio={1}>
            <h1 className="text-h1">{getString("register", "sign_up")}</h1>
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
            ref={inputRef}
              onKeyUp={keyPress}
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
              {getString("login", "password")}
            </p>

            <TextBox
              onKeyUp={keyPress}
              id={"textInputAuth"}
              mode={showPassword ? "text": "password"}
              onValueChanged={(v) => {
                setPassword(v.value);
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
                tabIndex={-1}
                  style={{
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    zIndex: 1,
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                  icon={"/icons/eyePassword.svg"}
                />
              </div>
            </TextBox>
            {validationPassword === false ? (
              <p
                style={{
                  color: "white",
                  fontFamily: "Poppins",
                  fontSize: 11,
                  marginTop: 5,
                }}
              >
                {getString("login", "validPassword")}
              </p>
            ) : null}
          </Item>
        </Box>
        <Box id={"nextBox"}>
          <Item ratio={1}>
          <Button
              onClick={sumbit}
              id={"myButton1"}
              text={getString("login", "next")}
              width={"100%"}
              height={45}
              icon={"/icons/arrowLog.svg"}
              rtlEnabled={true}
            />
          </Item>
          </Box>
          <Box>
          <Item ratio={1}>
            
            {registerError.errorRegister !=''  && registerError ? (
              <span
                style={{
                  color: "#c42b2b",
                  marginTop: 10,
                  fontSize: 13,
                  fontFamily: "Poppins",
                  textAlign: "center",
                }}
              >
                {getString("error", "existEmail")}
              </span>
            ) : null}

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
                {getString("register", "haveAccount")}
              </p>
              <Link
                to={{ pathname: "/signIn" }}
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  textDecoration: "none",
                }}
              >
                {getString("register", "toLogin")}
              </Link>
            </div>
            {/* <Link
                to={{ pathname: "/signUp/sendConfirm" }}
                style={{
                  color: "#fff",
                  fontSize: 12,
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  textDecoration: "none",
                  marginTop:20,
                  textDecorationLine:'underline'

                }}
              >
                {getString("register", "notEmailVerify")}
              </Link> */}
          </Item>
         
        </Box>
      </AuthField>
    </AuthLayout>
  );
};
