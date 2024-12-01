import { Box, TextBox, Toast, Validator } from "devextreme-react";
import { Button } from "devextreme-react/button";
import { Item } from "devextreme-react/box";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getString } from "../../locales/string";
import { loginAction } from "../../business/action/authAction";
import AuthField from "./components/AuthField";
import { AuthLayout } from "./components/AuthLayout";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../business/reducer/store";
import { setRegisterFail } from "../../business/reducer/authSlice";

export const LoginScreen = ({}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [mail, setMail] = useState<any>();
  const [password, setPassword] = useState<any>();
  const token = useAppSelector((state) => state.auth.token);
  // console.log("TOKEN", token);
  const registerSuccess = useSelector(
    (state: any) => state.auth.registerSuccess
  );
  const [showToast, setShowToast] = useState(registerSuccess);
  const [checkValid, setCheckValid] = useState(true);
  const messageError = useAppSelector((state) => state.auth.error);
  const [validationPassword, setValidationPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const inputRef = useRef(null);

  let handleChange = (e: any) => {
    const value = e.value;
    setPassword(value);
  };

  const ref = useRef(null);
  const validPassword = () => {
    // console.log('valid',password)
    if (password?.length < 6) setValidationPassword(false);
    else setValidationPassword(true);
  };
  const validationEmail = () => {
    const customerEmailRegex =
      /[a-zA-Z0-9.!\#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/;
    // console.log("regex", customerEmailRegex.test(mail.trim()));
    setValidEmail(customerEmailRegex.test(mail.trim()))
    return !customerEmailRegex.test(mail.trim());
  };

  //@ts-ignore
  const sumbit = async () => {
    // console.log(password, "passs in submit");
    validPassword();
    setCheckValid(false);
    if (!validationEmail() && password.trim().length >= 6) {
      const succes = await dispatch(loginAction(mail, password));
      console.log(succes);
      if (succes === "SUCCESS") {
        navigate("/admin/ordersList");
      }
    }
  };

  const onHiding = () => {
    setShowToast(false);
  };

  const keyPress = (e: any) => {
    if (e.event.key === "Enter") {
      //@ts-ignore
      sumbit();
    }
  };

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
  }, [password, mail]);

  const InputLogin = ({
    name,
    onChange,
    value,
    passwordMode,
    mode,
    marginTop
  }: {
    name: string;
    onChange: any;
    value: string;
    passwordMode?: boolean;
    mode?: any;
    marginTop?:number
  }) => {
    return (
      <>
        <p
          style={{
            color: "#fff",
            fontSize: 14,
            fontFamily: "Poppins",
            fontWeight: 400,
            marginBottom: 12,
            textAlign: "left",
            marginTop:marginTop
          }}
        >
          {name}
        </p>
        <TextBox
          onKeyDown={keyPress}
          id={"textInputAuth"}
          onValueChanged={onChange}
          value={value}
          mode={mode}
        >
          {passwordMode ? (
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
                onClick={() => setShowPassword(!showPassword)}
                icon={"/icons/eyePassword.svg"}
              />
            </div>
          ) : null}
        </TextBox>
      </>
    );
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

 
  return (
    <AuthLayout>
      <Toast
        id={"toastRegister"}
        visible={showToast}
        message={getString("register", "verifyMailInfo")}
        type={"success"}
        onHiding={onHiding}
        displayTime={10000}
        position={"top center"}
        width={"50%"}
        height={70}
      />
      <AuthField>
        <Box id={"login"} width={"100%"}  tabIndex={-1}>
          <Item ratio={1}>
            <h1 className="text-h1">{getString("login", "login")}</h1>
          </Item>
        </Box>
        <Box
          id={"containerInput"}
          width={"100%"}
          crossAlign={"stretch"}
          align={"center"}
        >
          <Item ratio={1}>
            {/* <InputLogin
              name={getString("login", "email")}
              value={mail}
              onChange={(v: any) => {
                setMail(v.value);
              }}
            /> */}
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
            tabIndex={2}
              onKeyDown={keyPress}
              id={"textInputAuth"}
              valueChangeEvent="keyup"
              onValueChanged={(v) => {
                setMail(v.value);
              }}
            >
                {validEmail ===false ? (
              <p
                style={{
                  color: "white",
                  fontFamily: "Poppins",
                  fontSize: 10,
                  marginTop: 5,
                }}
              >
                {getString("login", "wrongEmail")}
              </p>
            ) : null}
            </TextBox> 
            {/* <InputLogin
              name={getString("login", "password")}
              value={password}
              onChange={handleChange}
              mode={showPassword ? "text" : "password"}
              marginTop={26}
              passwordMode
            /> */}
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
              id={"textInputAuth"}
              mode={showPassword ? "text" : "password"}
              onValueChanged={handleChange}
              onKeyUp={keyPress}
              valueChangeEvent="keyup"
              
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

            {/* <div
              style={{
                justifyContent: "flex-end",
                width: "100%",
                display: "flex",
              }}
            >
              <Button
                id={"forgetBtn"}
                onClick={() => navigate("/remindPassword")}
                text={getString("login", "forgetPassword")}
              />
            </div> */}
          </Item>
        </Box>
        {messageError ? (
          <Box style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <Item ratio={1}>
              <span
                style={{
                  color: "#c42b2b",
                  marginTop: 5,
                  fontSize: 14,
                  fontFamily: "Poppins",
                  textAlign: "center",
                }}
              >
                {messageError.error}
              </span>
            </Item>
          </Box>
        ) : null}

        <Box id={"nextBox"} style={{ marginTop: 25 }}>
          <Item ratio={1}>
            <Button
              ref={ref}
              id={"myButton1"}
              text={getString("login", "next")}
              width={"100%"}
              height={45}
              onClick={sumbit}
              icon={"/icons/arrowLog.svg"}
              rtlEnabled={true}
              useSubmitBehavior={checkValid}
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
                onClick={() => dispatch(setRegisterFail({ errorRegister: "" }))}
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
