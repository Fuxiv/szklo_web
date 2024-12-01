import { DateBox, SelectBox } from "devextreme-react";
import React from "react";
import { useLocation } from "react-router-dom";
import { InputEdit } from "./InputEdit";
import { getString } from "../../../locales/string";
import Validator, {
  RequiredRule,
  PatternRule,
  StringLengthRule,
} from "devextreme-react/validator";
import { locale } from "devextreme/localization";


interface FormAreaProps {
  onChangeNumberOrders?: any;
  onChangeNumberContractor?: () => void;
  onChangeComments?: () => void;
  onChangeAdresse?: () => void;
  onChangeType?: () => void;
  onChangeStateOrder?: () => void;
  onChangeDateRegister?: () => void;
  onChangeDateDelivery?: () => void;
  onChangeDeliveryMethod?: () => void;
  valueNumberOrders?: string;
  valueNumberContractor?: string;
  valueComments?: string;
  valueAdresse?: string;
  valueType?: string;
  valueStateOrder?: string;
  valueDateRegister?: string;
  valueDateDelivery?: string;
  valueDeliveryMethod?: string | number;
}

export const FormArea = ({
  valueAdresse,
  valueComments,
  valueDateDelivery,
  valueDateRegister,
  valueDeliveryMethod,
  valueNumberContractor,
  valueNumberOrders,
  valueStateOrder,
  valueType,
  onChangeAdresse,
  onChangeComments,
  onChangeDateDelivery,
  onChangeDateRegister,
  onChangeDeliveryMethod,
  onChangeNumberContractor,
  onChangeNumberOrders,
  onChangeStateOrder,
  onChangeType,
}: FormAreaProps) => {
  const { state } = useLocation();

  locale('pl'); //format daty

  const validation = () => {
    if (valueType === undefined) {
    }
  };
  let dropDownListData = localStorage.getItem("listDropDown");
  //@ts-ignore
  const filteredList = JSON.parse(dropDownListData).data?.config?.lists?.filter(
    (item:any) => item.LI_FIELDNAME === "DC_TYPE"
  );
  //@ts-ignore
  const filteredListDelivery = JSON.parse(dropDownListData).data?.config?.lists?.filter((item:any) => item.LI_FIELDNAME === "DC_DELIVERY");
 
  const delivery = [
    {
      ID: 100,
      Name: "Dostawa do odbiorcy/stojaki",
    },
    {
      ID: 200,
      Name: "Odbiór własny-stojaki",
    },
    {
      ID: 250,
      Name: "Odbiór własny-luzem",
    },
  ];

  const typeList = [
    {
      ID: 1,
      Name: "Standard",
      Text: "S",
    },
    {
      ID: 2,
      Name: "Reklamacja",
      Text: "R",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          width: "50%",
          marginTop: 10,
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <InputEdit
            name={getString("orders", "orederNumber")}
            value={valueNumberOrders}
            // onChange={(v: any) => setNumberOrders(v.value)}
            onChange={onChangeNumberOrders}
//            width={"18%"}
            disabled={true}
            bg={"#FFE4B5"}
            flexGrow={1}
            flexShrink={1}
            flexBasis={0}
            // disabled={
            //   valueNumberOrders === undefined || state.data.DC_STATE > 0
            //     ? true
            //     : false
            // }
            // bg={valueNumberOrders === undefined ? "#FFE4B5" : "#fff"}
          />

          <InputEdit
            flexGrow={1}
            flexShrink={1}
            flexBasis={0}
            name={getString("orders", "stateOrder")}
            value={valueStateOrder}
//            width={"17.5%"}
            marginLeft={10}
            disabled={true}
            bg={"#FFE4B5"}
          />

          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              marginLeft: 10,
//             width: "19%",
              marginTop: 7,
            }}
          >
            {/* <p
              style={{
                color: "#fff",
                fontSize: 14,
                fontFamily: "Poppins",
                fontWeight: 400,
                marginTop: 7,
                textAlign: "left",
                paddingBottom: 5,
              }}
            >
              {getString("orders", "dateRegister")}
            </p> */}
            <DateBox
              id="textInputEdit"
              // disabled={true}
              value={valueDateRegister}
              type="datetime"
              style={{ backgroundColor: "#FFE4B5",
                flex: 1
              }}
              showDropDownButton={false}
              label={getString("orders", "dateRegister")}
              labelMode={'static'}
              stylingMode='filled'
              readOnly={true}
            />
          </div>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              marginLeft: 10,
              marginTop: 7,
            }}
          >
            {/* <p
              style={{
                color: "#fff",
                fontSize: 14,
                fontFamily: "Poppins",
                fontWeight: 400,
                marginTop: 7,
                textAlign: "left",
                paddingBottom: 5,
              }}
            >
              {getString("orders", "type")}
            </p> */}
            <SelectBox
              style={{flex: 1}}
              id="textInputEdit"
              displayExpr="LIL_TEXT"
              valueExpr="LIL_VALUE"
              items={filteredList[0].items}
              value={ valueType ? valueType?.toString() 
                : filteredList[0].items
                    .filter((item:any) => item.LIL_DEFAULT === "T")
                    .map((item:any) => item.LIL_VALUE)[0]}
              onValueChanged={onChangeType}
//              width={"120%"}
              disabled={state.data.DC_STATE > 0 ? true : false}
              label={getString("orders", "type")}
              labelMode={'static'}
              stylingMode='filled'
            >
              <Validator>
                <RequiredRule message="Uzupełnij" />
                <PatternRule pattern="" message="Uzupełnij" />
              </Validator>
            </SelectBox>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flex: 1}}>
          <InputEdit
            flexGrow={1}
            flexShrink={1}
            flexBasis={0}
            name={getString("orders", "numberContractor")}
            value={valueNumberContractor}
            onChange={onChangeNumberContractor}
//            width={"36.5%"}
            disabled={state.data.DC_STATE > 0 ? true : false}
          />
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              marginLeft: 10,
              marginTop:10,
              flex: 1
            }}
          >
            {/* <p
              style={{
                color: "#fff",
                fontSize: 14,
                fontFamily: "Poppins",
                fontWeight: 400,
                marginTop: 7,
                textAlign: "left",
                paddingBottom: 5,
              }}
            >
              {getString("orders", "dateDelivery")}
            </p> */}
            <DateBox
              id="textInputEdit"
              value={valueDateDelivery}
              onValueChanged={onChangeDateDelivery}
              type="datetime"
              dateSerializationFormat="yyyy-MM-dd HH:mm"
              disabled={state.data.DC_STATE > 0 ? true : false}
              label={getString("orders", "dateDelivery")}
              labelMode={'static'}
              stylingMode='filled'
            />
          </div>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              marginLeft: 10,
              marginTop:10
            }}
          >
            {/* <p
              style={{
                color: "#fff",
                fontSize: 14,
                fontFamily: "Poppins",
                fontWeight: 400,
                marginTop: 7,
                textAlign: "left",
                paddingBottom: 5,
              }}
            >
              {getString("orders", "delivery")}
            </p> */}
            <SelectBox
              id="textInputEdit"
              displayExpr="LIL_TEXT"
              valueExpr="LIL_VALUE"
              items={filteredListDelivery[0].items}
              //@ts-ignore
              defaultValue={
                valueDeliveryMethod ? valueDeliveryMethod?.toString() 
                  : filteredListDelivery[0].items
                      .filter((item:any) => item.LIL_DEFAULT === "T")
                      .map((item:any) => item.LIL_VALUE)[0]
                  
              }
              onValueChanged={onChangeDeliveryMethod}
              width={"100%"}
              disabled={state.data.DC_STATE > 0 ? true : false}
              label={getString("orders", "delivery")}
              labelMode={'static'}
              stylingMode='filled'
            >
              <Validator>
                <RequiredRule message="Uzupełnij" />
                {/* <PatternRule
                        pattern="/^[^0-100]+$/"
                        message="Uzupełnij"
                    /> */}
                <StringLengthRule
                  message="Name must have at least 2 symbols"
                  min={2}
                />
              </Validator>
            </SelectBox>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <InputEdit
            textAreaShow
            name={getString("orders", "comments")}
            value={valueComments}
            onChange={onChangeComments}
            width={"100%"}
            disabled={state.data.DC_STATE > 0 ? true : false}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <InputEdit
            textAreaShow
            name={getString("orders", "adressDelivery")}
            value={valueAdresse}
            onChange={onChangeAdresse}
            width={"100%"}
            disabled={state.data.DC_STATE > 0 ? true : false}
          />
        </div>
      </div>
    </div>
  );
};
