import { current } from "@reduxjs/toolkit";
import Box, { Item } from "devextreme-react/box";
import { Button } from "devextreme-react/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getString } from "../../locales/string";
import AuthField from "./components/AuthField";
import { AuthLayout } from "./components/AuthLayout";

const IndexScreen = () => {
  const navigate = useNavigate();
  const focusBtn = useRef<HTMLDivElement>(null);
  const focusBtn2 = useRef<HTMLDivElement>(null);

  const [focusedButton, setFocusedButton] = useState(1);
  useEffect(() => {
    //@ts-ignore
    if (focusBtn.current) {
      // focusBtn?.current.focus();
      console.log(focusBtn.current)
    }
  }, []);


  function handleTabPress(event:any) {
    if (event.key === 'Tab') {
      event.preventDefault();
      if (focusedButton === 1) {
        focusBtn?.current?.focus();
        setFocusedButton(2);
      } else {
        focusBtn2?.current?.focus();
        setFocusedButton(1);
      }
    }
  }
  const focusTextBox = useCallback(() => {
    //@ts-ignore
    focusBtn.current?.instance.focus();
}, []);
useEffect(() => { 
    focusTextBox()
    //@ts-ignore
    setTimeout(()=>{
      focusTextBox()
    },500)
   
}, []);
  // useEffect(() => {
  //   const listener = (event: any) => {
  //     // if (event.code === "Tab") {
  //     //   //@ts-ignore
  //     //   setFocusedButton(2);
  //     //   console.log(focusedButton)
  //     //   // event.preventDefault();
  //     // }
  //     if (event.code === 'Tab') {
  //       event.preventDefault();
  //       if (focusedButton === 1) {
  //       //@ts-ignore
  //         // focusBtn?.current?.focus();
  //         setFocusedButton(1);
  //       } else {
  //       //@ts-ignore
  //         // focusBtn2?.current?.focus();
  //         setFocusedButton(2);
  //       }
  //     }
  //   };
  //   document.addEventListener("keyup", listener);
  //   return () => {
  //     document.removeEventListener("keyup", listener);
  //   };
  // },[focusedButton]);

  return (
    <div onKeyDown={handleTabPress}>
    <AuthLayout>
      <AuthField>
        <Box id={"logoInLogin"} width={"100%"}>
          <Item ratio={1}>
            <h1
              className="text-h1"
              style={{ width: "100%", fontSize: 90, textAlign: "left" }}
            >
              {"O..."}
            </h1>
          </Item>
        </Box>
        <div style={{ width: "100%" }}>
          <p
            style={{
              textAlign: "right",
              color: "white",
              fontFamily: "Poppins",
              marginTop: -20,
              fontSize: 14,
            }}
          >
           {getString('startApp','nameCompany')}
          </p>
        </div>
        <Box
          id={"containerButton"}
          width={"100%"}
          crossAlign={"stretch"}
          align={"center"}
        >
          <Item ratio={1}>

            <Button
              id={focusedButton === 1 ? "myButton1" : "myButton2"}
              text={getString("startApp", "logIn")}
              //@ts-ignore
              ref={focusBtn}
              width={"100%"}
              height={45}
              icon={"/icons/arrowLog.svg"}
              rtlEnabled={true}
              onClick={() => navigate("/signIn")}
              tabIndex={focusedButton === 1 ? 0 : -1}
            />
            <Button
              //@ts-ignore
              ref={focusBtn2}
              tabIndex={focusedButton === 2 ? 0 : -1}
              onClick={() => navigate("/signUp")}
              //@ts-ignore
              id={focusedButton === 2 ? "myButton1" : "myButton2"}
              text={getString("startApp", "register")}
              width={"100%"}
              height={45}
              icon={"/icons/arrowRegister.svg"}
              rtlEnabled={true}
            />
          </Item>
        </Box>
      </AuthField>
    </AuthLayout>
    </div>

  );
};

export default IndexScreen;
