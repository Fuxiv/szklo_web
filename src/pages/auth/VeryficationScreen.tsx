import Box, { Item } from "devextreme-react/box";
import { getString } from "../../locales/string";
import { Button } from "devextreme-react/button";

import VerifiField from "./components/VerifiField";
import { useDispatch } from "react-redux";
import { AuthLayout } from "./components/AuthLayout";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../business/reducer/store";
import { verifyProfileAction } from "../../business/action/authAction";

export const VeryficationScreen = ({}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {token } = useParams();
  const [resulte, setResulte] = useState<"NOT_YET_CHECKED" | "NEGATIVE" | "POSITIVE">("NOT_YET_CHECKED");

  useEffect(() => {
    const checkCode = async () => {
      if (token === undefined || Array.isArray(token)) {
        return;
      }
    console.log('3');

      if(resulte!=='POSITIVE'){
        console.log('111111',token);
      const result = await dispatch(verifyProfileAction(token)); 
      console.log('res in checkcode',result)
      setResulte(result);
        }
    };
    checkCode();
    // console.log('result',resulte)

  }, []);

  return (
    <AuthLayout>
      <VerifiField>
        <h1 className="text-h1">{getString("verifi", "header")}</h1>
        <p
          style={{
            color: resulte === "POSITIVE" ? "green" : "red",
            textAlign: "center",
            fontSize: 18,
            fontFamily: "Poppins",
          }}
        >
          {resulte === "POSITIVE"
            ? getString("verifi", "description")
            : resulte === "NEGATIVE" ? getString("verifi", "notVerifi") : ''}
        </p>

        <Button
          onClick={() => navigate("/signIn")}
          id={"myButton1"}
          text={getString("verifi", "login")}
          width={"100%"}
          height={45}
          icon={"/icons/arrowLog.svg"}
          rtlEnabled={true}
        />
      </VerifiField>
    </AuthLayout>
  );
};
