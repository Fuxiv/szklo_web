import { Box, Button, SelectBox, TextBox, Toast } from "devextreme-react";
import { Item } from "devextreme-react/box";
import { useCallback, useEffect, useState } from "react";
import {
  currentUser,
  deleteAccount,
  editUser,
  getUserParametrs,
  saveParametrsInProfile,
} from "../../business/action/usersActions";
import { useAppDispatch, useAppSelector } from "../../business/reducer/store";
import { getString } from "../../locales/string";
import { AuthLayout } from "../auth/components/AuthLayout";
import ProfileField from "../auth/components/ProfileField";
import { CheckBox } from "devextreme-react/check-box";

import { useNavigate } from "react-router-dom";
import { logout } from "../../business/action/authAction";
import { ButtonEdit } from "./components/ButtonEdit";
import { InputEdit } from "./components/InputEdit";
import { HeaderParametrs } from "./components/HeaderParamters";
import { locale } from "devextreme/localization";


export const ProfileScreen = ({}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [data,setData]=useState<any>([])
  const [inputValues, setInputValues] = useState<any>();
  // const token = useAppSelector((state) => state.auth.token);
  let token = localStorage.getItem("token");
  const [showToast, setShowToast] = useState(false);
  const [isChanged,setIsChanged]=useState(false)
  const [showToastError, setShowToastError] = useState(false);
  const data = useAppSelector((state) => state.editUser);
  locale('pl'); //format daty
  let dropDownListData = localStorage.getItem("listDropDown");
  //@ts-ignore
  const filteredList = JSON.parse(dropDownListData).data?.config?.lists?.filter(
    (item: any) => item.LI_FIELDNAME === "DC_TYPE"
  );
  //@ts-ignore
  const filteredListDelivery = JSON.parse(dropDownListData).data?.config?.lists?.filter(
    (item: any) => item.LI_FIELDNAME === "DC_DELIVERY"
  );

  const onHiding = () => {
    setShowToast(false);
    setShowToastError(false);
  };

  const getParametrs = async () => {
    const res = await dispatch(getUserParametrs(token));
    setInputValues(res);
  };
  useEffect(() => {
    getParametrs();
  }, []);

  // const handleChange2 = useCallback(
  //   (newValue: any, index: any) => {
  //     setInputValues((prevInputValues: any) => {
  //       const updatedInputValues = [...prevInputValues];
  //       const currentInputValue = updatedInputValues[index];

  //       // if (!currentInputValue.USP_VALUE && currentInputValue.USP_TEXT) {
  //       // updatedInputValues[index] = {
  //       //   ...updatedInputValues[index],
  //       //   USP_TEXT: newValue.value,
  //       // };
  //       // } else {
  //       //  updatedInputValues[index] = {
  //       //   ...updatedInputValues[index],
  //       //   USP_VALUE: newValue.value,
  //       // };
  //       // }
  //       // return updatedInputValues;

  //       updatedInputValues[index] = {
  //         ...updatedInputValues[index],
  //         USP_VALUE: newValue.value,
  //       };
  //       return updatedInputValues;
  //     });
  //     console.log(inputValues)
  //   },
  //   [inputValues]
  // );
  const [latestChangedValue, setLatestChangedValue] = useState<any>();
  const handleChange2 = useCallback(
    (newValue: any, index: any) => {
      setIsChanged(true)
    setInputValues((prevInputValues: any) => {
      const updatedInputValues = [...prevInputValues];
      console.log(updatedInputValues[index].PA_TYPE)
      if (updatedInputValues[index].PA_TYPE
        === "X") {
        updatedInputValues[index] = {
          ...updatedInputValues[index],
          USP_TEXT: newValue.value,
        };
      } else {
        updatedInputValues[index] = {
          ...updatedInputValues[index],
          USP_VALUE: newValue.value,
        };
      }
      setLatestChangedValue([updatedInputValues[index]]);
      return updatedInputValues;
    });
  },
    [inputValues]
  );
   //@ts-ignore
  const changedData2 = data.data?.reduce((acc, item1) => {
    const item2 = latestChangedValue?.find(
      (item: any) => item.USP_ID === item1.USP_ID
    );
    if (item2) {
      if (item2 && item1.USP_VALUE !== item2.USP_VALUE) {
        acc.push({ USP_ID: item1.USP_ID, USP_VALUE: item2.USP_VALUE });
      } else if (item2 && item1.USP_TEXT !== item2.USP_TEXT) {
        acc.push({ USP_ID: item1.USP_ID, USP_TEXT: item2.USP_TEXT });
      }
    }
    // if (item2 && item1.USP_VALUE !== item2.USP_VALUE) {
    //   acc.push({ USP_ID: item1.USP_ID, USP_VALUE: item2.USP_VALUE });
    // }
    return acc; 
  }, []);

  

  const sendEditParams = async (e:any) => {
    console.log('changed data 2',changedData2)
    if(isChanged===true){
      await dispatch(saveParametrsInProfile(token, changedData2))
    }
    setIsChanged(false)
   
    //@ts-ignore
    // if (res === 200) {
    //   setShowToast(true);
    // } else setShowToastError(true);
  };
  return (
    <AuthLayout>
      <Toast
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
      <Toast
        id={"toastRegister"}
        visible={showToastError}
        message={"Nie udało sie zapiać"}
        type={"error"}
        onHiding={onHiding}
        displayTime={5000}
        position={"top center"}
        width={"50%"}
        height={70}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: 80,
        }}
      >
        <ProfileField>
          <div style={{ position: "absolute", left: 20, top: 20 }}>
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
                  marginTop: 30,
                }}
              >
                {getString("profile", "profil")}
              </h1>
            </Item>
          </Box>
          <div className="containerProfil">
            <div style={{width:'50%'}}>
            {inputValues?.map((item: any, index: any) => {
              return (
                <div className="containerProfil" key={index}>
                  {item.PA_GROUP === 10 || item.PA_GROUP === 17 ||item.PA_GROUP === 14? (
                    <Box
                      id={"containerFormProfil"}
                      crossAlign={"stretch"}
                      align={"center"}
                    >
                      <Item ratio={1}>
                        {item.PA_POS === 0 ? (
                          <p
                            style={{
                              textAlign: "left",
                              fontFamily: "Poppins",
                              color: "#fff",
                              fontSize: 18,
                              marginTop: 10,
                            }}
                          >
                            {item.PA_NAME}
                          </p>
                        ) : (
                          <InputEdit
                            key={item.USP_ID}
                            name={item.PA_NAME}
                            //@ts-ignore
                            value={item.PA_TYPE === "X" ? item.USP_TEXT : item.USP_VALUE
                              // item.USP_VALUE ? item.USP_VALUE : item.USP_TEXT
                            }
                            unit={item.PA_UNIT}
                            width={"70%"}
                            bg={"#FFF"}
                            onChange={(v) => handleChange2(v, index)}
                            onChangeCheckBox={(v) => {
                            
                              handleChange2(v, index);
                              dispatch(saveParametrsInProfile(token, [{USP_ID:item.USP_ID,USP_VALUE:v.value}]))
                            }}
                            textAreaShow={item.PA_TYPE === "X" ? true : false}
                            // rowsTextArea={item.PA_SIZE ? item.PA_SIZE : 0}
                            dateBox={
                              item.PA_TYPE === "D" ||
                              item.PA_TYPE === "M" ||
                              item.PA_TYPE === "T"
                                ? true
                                : false
                            }
                            typeDate={
                              item.PA_TYPE === "D"
                                ? "date"
                                : item.PA_TYPE === "T"
                                ? "time"
                                : "datetime"
                            }
                            checkbox={item.PA_TYPE === "B" ? true : false}
                            dropDownList={item.PA_TYPE === "L" ? true : false}
                            itemsSelect={
                              item.PA_LISYMBOL === "orderDelivery"
                                ? filteredListDelivery[0].items
                                : filteredList[0].items
                            }
                            numberBox={
                              item.PA_TYPE === "2" || item.PA_TYPE === "4" || item.PA_TYPE === "P"
                                ? true
                                : false
                            }
                            maxLengthTextBox={
                              item.PA_TYPE === "S" && item.PA_SIZE!==0
                                ? item.PA_SIZE
                                : item.PA_TYPE === "2"
                                ? "####0,00#"
                                : item.PA_TYPE === "4"
                                ? "####0,0000#"
                                : item.PA_TYPE ==="P"
                                ? "#0.##"
                                : 128
                            }
                            disabled={item.PA_ACCESS < 30 ? true : false}
                            valueDeliveryMethod={item.USP_VALUE}
                            dateFormat={
                              item.PA_TYPE === "D"
                                ? "yyyy-MM-dd"
                                : item.PA_TYPE === "T"
                                ? "HH:mm"
                                : "yyyy-MM-dd HH:mm"
                            }
                            onFocusOut={sendEditParams}
                          />
                        )}
                      </Item>
                    </Box>
                  ) : null}
                </div>
              );
            })}
            </div>
            <div style={{width:'50%'}}>
            {inputValues?.map((item: any, index: any) => {
              return (
                <div className="containerProfil" key={index}>
                  {item.PA_GROUP === 99 ? (
                    <Box
                      id={"containerFormProfil"}
                      crossAlign={"stretch"}
                      align={"center"}
                    >
                      <Item ratio={1}>
                        {item.PA_POS === 0 ? (
                          <p
                            style={{
                              textAlign: "left",
                              fontFamily: "Poppins",
                              color: "#fff",
                              fontSize: 18,
                              marginTop: 10,
                            }}
                          >
                            {item.PA_NAME}
                          </p>
                        ) : (
                          <InputEdit
                            key={item.USP_ID}
                            name={item.PA_NAME}
                            //@ts-ignore
                            value={
                              item.PA_TYPE === "X" ? item.USP_TEXT : item.USP_VALUE
                            }
                            unit={item.PA_UNIT}
                            width={"70%"}
                            bg={"#FFF"}
                            onChange={(v) => handleChange2(v, index)}
                            onChangeCheckBox={(v) => {
                              handleChange2(v, index);
                              dispatch(saveParametrsInProfile(token, [{USP_ID:item.USP_ID,USP_VALUE:v.value}]))
                            }}
                            textAreaShow={item.PA_TYPE === "X" ? true : false}
                            rowsTextArea={item.PA_SIZE ? item.PA_SIZE : 0}
                            dateBox={
                              item.PA_TYPE === "D" ||
                              item.PA_TYPE === "M" ||
                              item.PA_TYPE === "T"
                                ? true
                                : false
                            }
                            typeDate={
                              item.PA_TYPE === "D"
                                ? "date"
                                : item.PA_TYPE === "T"
                                ? "time"
                                : "datetime"
                            }
                            checkbox={item.PA_TYPE === "B" ? true : false}
                            dropDownList={item.PA_TYPE === "L" ? true : false}
                            itemsSelect={
                              item.PA_LISYMBOL === "orderDelivery"
                                ? filteredListDelivery[0].items
                                : filteredList[0].items
                            }
                            numberBox={
                              item.PA_TYPE === "2" || item.PA_TYPE === "4" || item.PA_TYPE === "P"
                                ? true
                                : false
                            }
                            maxLengthTextBox={
                              item.PA_TYPE === "S"
                                ? 128
                                : item.PA_TYPE === "2"
                                ? "####0.00#"
                                : item.PA_TYPE === "4"
                                ? "####0.0000#"
                                : item.PA_TYPE ==="P"
                                ? "#0.##"
                                : 128
                            }
                            disabled={item.PA_ACCESS < 30 ? true : false}
                            valueDeliveryMethod={item.USP_VALUE}
                            dateFormat={
                              item.PA_TYPE === "D"
                                ? "yyyy-MM-dd"
                                : item.PA_TYPE === "T"
                                ? "HH:mm"
                                : "yyyy-MM-dd HH:mm"
                            }
                            onFocusOut={sendEditParams}
                          />
                        )}
                      </Item>
                    </Box>
                  ) : null}
                </div>
              );
            })}
            </div>
          </div>
          <Box id={"sendBtnProfile"}>
            <Item ratio={1}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "flex-end",
                  paddingBottom: 20,
                }}
              >
                <Button
                  id={"myButtonInfo"}
                  text={getString("profile", "changePassword")}
                  width={"20%"}
                  height={45}
                  onClick={() => navigate("/user/profil/newPassword")}
                />
                <Button
                  id={"myButton1"}
                  text={getString("buttons", "close")}
                  width={"20%"}
                  height={45}
                  // onClick={sendEditParams}
                  onClick={() => navigate(-1)}
                  style={{ marginLeft: 20 }}
                />
              </div>
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
          </div>
        </ProfileField>
      </div>
    </AuthLayout>
  );
};
