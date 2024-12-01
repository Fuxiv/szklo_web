import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Item } from "devextreme-react/box";
import { InputEdit } from "./InputEdit";
import { useAppDispatch, useAppSelector } from "../../../business/reducer/store";
import { getOrderParametrs, saveParametrsInOrder } from "../../../business/action/usersActions";
import { Box } from "devextreme-react";
import { locale } from "devextreme/localization";


export const ParametrsArea = (dcId: any,props:any) => {
  const { state } = useLocation();
  let token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const [inputValues, setInputValues] = useState<any>();
  const [isChanged,setIsChanged]=useState(false)
  const data = useAppSelector((state) => state.editParamsOrder);
  let dropDownListData = localStorage.getItem("listDropDown");
  locale('pl');
  useEffect(() => {
    // loadMessages();
   locale(navigator.language);
  }, []);
  //@ts-ignore
  const filteredList = JSON.parse(dropDownListData).data?.config?.lists?.filter(
    (item:any) => item.LI_FIELDNAME === "DC_TYPE"
  );
  //@ts-ignore
  const filteredListDelivery = JSON.parse(dropDownListData).data?.config?.lists?.filter((item:any) => item.LI_FIELDNAME === "DC_DELIVERY");
  const getParametrs = async () => {
    const res = await dispatch(getOrderParametrs(token, dcId.dcId));
    setInputValues(res);
  };
  useEffect(() => {
    getParametrs();
  }, []);
  const [latestChangedValue, setLatestChangedValue] = useState<any>();

  //@ts-ignore
  const handleChange2 = useCallback((newValue, index) => {
    setIsChanged(true)
    setInputValues((prevInputValues: any) => {
      const updatedInputValues = [...prevInputValues];
      if (updatedInputValues[index].PA_TYPE
        === "X") {
        updatedInputValues[index] = {
          ...updatedInputValues[index],
          DCP_TEXT: newValue.value,
        };
      } else {
        updatedInputValues[index] = {
          ...updatedInputValues[index],
          DCP_VALUE: newValue.value,
        };
      }
      setLatestChangedValue([updatedInputValues[index]]);
      return updatedInputValues;
    });
    // setInputValues((prevInputValues: any) => {
    //   const updatedInputValues = [...prevInputValues];
  
    //   updatedInputValues[index] = {
    //     ...updatedInputValues[index],
    //     DCP_VALUE: newValue.value,
    //   };
    //   return updatedInputValues;
    // });
  console.log(inputValues)

  },
  [inputValues]
);
const [editData,setEditData]=useState()

//@ts-ignore
let changedData2 = data.data?.reduce((acc, item1) => {
  // const item2 =inputValues && inputValues?.find(
  const item2 =latestChangedValue && latestChangedValue?.find(
    (item: any) => item.DCP_ID === item1.DCP_ID
  );
  if (item2) {
    if (item2 && item1.DCP_VALUE !== item2.DCP_VALUE) {
      acc.push({ DCP_ID: item1.DCP_ID, DCP_VALUE: item2.DCP_VALUE});
    } else if (item2 && item1.DCP_TEXT !== item2.DCP_TEXT) {
      acc.push({ DCP_ID: item1.DCP_ID, DCP_TEXT: item2.DCP_TEXT });
    }
  }
  // if (item2 && item1.DCP_VALUE !== item2.DCP_VALUE) {
  //   acc.push({ DCP_ID: item1.DCP_ID, DCP_VALUE: item2.DCP_VALUE });
  // }
  return acc;
}, []);


const sendEditParams=()=>{
  if(isChanged===true){
  dispatch(saveParametrsInOrder(token,changedData2))
  }
  setIsChanged(false)
  // getParametrs();
}


  return (
    <div
      style={{
        // height: 200,
        width: "90%",
        paddingLeft: 20,
        display: "flex",
        flexDirection: "row",
        flexWrap:'wrap'
      }}
    >
            <div style={{width:'50%'}}>
      {inputValues
        ? inputValues?.map((item: any, index: any) => {
            return (
              <div className="containerProfil" key={index}>
                  {item.PA_GROUP === 10 || item.PA_GROUP === 17 ||item.PA_GROUP === 14? 
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
                        key={item.DCP_ID}
                        name={item.PA_NAME}
                        unit={item.PA_UNIT}
                        //@ts-ignore
                        value={item.PA_TYPE === "X" ? item.DCP_TEXT  :item.DCP_VALUE}
                        width={"70%"}
                        bg={"#FFF"}
                        onChange={(v) => {
                          handleChange2(v, index)
                        }}
                        onChangeCheckBox={(v) => {
                          console.log(v)
                          handleChange2(v, index)
                          dispatch(saveParametrsInOrder(token, [{DCP_ID:item.DCP_ID,DCP_VALUE:v.value}]))
                        }}
                        onOptionChangedCheckBox={console.log('sss')}  textAreaShow={item.PA_TYPE === "X" ? true : false}
                        dateBox={
                          item.PA_TYPE === "D" ||
                          item.PA_TYPE === "M" ||
                          item.PA_TYPE === "T"
                            ? true
                            : false
                        }
                        checkbox={item.PA_TYPE === "B" ? true : false}
                        dropDownList={item.PA_TYPE === "L" ? true : false}
                        itemsSelect={item.PA_LISYMBOL ==='orderDelivery' ? filteredListDelivery[0].items : filteredList[0].items}
                        numberBox={item.PA_TYPE === "2" || item.PA_TYPE === "4"  ? true : false}
                        maxLengthTextBox={
                          item.PA_TYPE === "S"
                            ? 128
                            : item.PA_TYPE === "2"
                            ? "####0.00#"
                            : item.PA_TYPE === "4"
                            ? "####0.0000#"
                            : 128
                        }
                        disabled={item.PA_ACCESS <30 ? true : false}
                        valueDeliveryMethod={item.DCP_VALUE}
                     
                        typeDate={
                          item.PA_TYPE === "D"
                            ? "date"
                            : item.PA_TYPE === "T"
                            ? "time"
                            : "datetime"
                        }
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
                </Box>: null}
              </div>
            );
          })
        : null}
</div>
<div style={{width:'50%'}}>
{inputValues
        ? inputValues?.map((item: any, index: any) => {
            return (
              <div className="containerProfil" key={index}>
                 {item.PA_GROUP === 99 ? 
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
                        key={item.DCP_ID}
                        name={item.PA_NAME}
                        unit={item.PA_UNIT}
                        //@ts-ignore
                        value={item.PA_TYPE === "X" ? item.DCP_TEXT  :item.DCP_VALUE}
                        width={"70%"}
                        bg={"#FFF"}
                        onChange={(v) => {
                          handleChange2(v, index)
                        }}
                        onChangeCheckBox={(v) => {
                          handleChange2(v, index)
                          dispatch(saveParametrsInOrder(token, [{DCP_ID:item.USP_ID,DCP_VALUE:v.value}]))
                        }}
                        textAreaShow={item.PA_TYPE === "X" ? true : false}
                        dateBox={
                          item.PA_TYPE === "D" ||
                          item.PA_TYPE === "M" ||
                          item.PA_TYPE === "T"
                            ? true
                            : false
                        }
                        checkbox={item.PA_TYPE === "B" ? true : false}
                        dropDownList={item.PA_TYPE === "L" ? true : false}
                        itemsSelect={item.PA_LISYMBOL ==='orderDelivery' ? filteredListDelivery[0].items : filteredList[0].items}
                        numberBox={item.PA_TYPE === "2" || item.PA_TYPE === "4"  ? true : false}
                        maxLengthTextBox={
                          item.PA_TYPE === "S"
                            ? 128
                            : item.PA_TYPE === "2"
                            ? "####0.00#"
                            : item.PA_TYPE === "4"
                            ? "####0.0000#"
                            : 128
                        }
                        disabled={item.PA_ACCESS <30 ? true : false}
                        valueDeliveryMethod={item.DCP_VALUE}
                     
                        typeDate={
                          item.PA_TYPE === "D"
                            ? "date"
                            : item.PA_TYPE === "T"
                            ? "time"
                            : "datetime"
                        }
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
                :null}
              </div>
            );
          })
        : null}
        </div>
      {/* <button onClick={sendEditParams}>click</button> */}
    </div>
  );
};
