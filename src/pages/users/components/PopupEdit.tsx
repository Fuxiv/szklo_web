import {
  Box,
  Button,
  CheckBox,
  DateBox,
  Popup,
  SelectBox,
  TextBox,
} from "devextreme-react";
import { Item } from "devextreme-react/box";
import React, { useCallback } from "react";
import { getString } from "../../../locales/string";
import NumberBox from "devextreme-react/number-box";
import ThreeTest from "./ThreeTest";

interface PopupEditProps {
  visible: boolean;
  onHiding: any;
  value?: string;
  tpId: any;
  tpDcId: any;
  tpPos: any;
  tpSymbol: any;
  tpName: any;
  tpType: any;
  tpQnt: any;
  tpGQnt: any;
  tpRQnt: any;
  tpTQnt: any;
  tpW: any;
  tpH: any;
  dcState: any;
  tpShape: any;
  tpIdent: any;
  tpMuntins: any;
  tpWeight: any;
  onClick: any;
  closePopup: any;
  dcNumber: any;
  dcType: any;
  onChange?: any;
  onChangeTpId?: any;
  onChangeTpDcId?: any;
  onChangeTpGQnt?: any;
  onChangeTpH?: any;
  onChangeTpIdent?: any;
  onChangeTpName?: any;
  onChangeTpPos?: any;
  onChangeTpQnt?: any;
  onChangeTpRQnt?: any;
  onChangeTpShape?: any;
  onChangeTpSymbol?: any;
  onChangeTpTQnt?: any;
  onChangeTpType?: any;
  onChangeTpW?: any;
  onChangeTpMuntins?: any;
  onChangeTpWeight?: any;
  onValueChangedType?: any;
  itemsType?: any;
  defalutValueType?: any;
  dcRegister: any;
  totalWeight?: any;
}

export const PopupEdit = ({
  visible,
  onHiding,
  tpGQnt,
  tpH,
  tpIdent,
  tpName,
  tpPos,
  tpShape,
  tpSymbol,
  dcState,
  dcRegister,
  tpTQnt,
  tpType,
  tpW,
  tpMuntins,
  tpWeight,
  dcType,
  dcNumber,
  onClick,
  closePopup,
  totalWeight,
  onChangeTpGQnt,
  onChangeTpH,
  onChangeTpIdent,
  onChangeTpName,
  onChangeTpPos,
  onChangeTpShape,
  onChangeTpSymbol,
  onChangeTpTQnt,
  onChangeTpW,
  onChangeTpMuntins,
  onChangeTpWeight,
  onValueChangedType,
}: PopupEditProps) => {
  let dropDownListData = localStorage.getItem("listDropDown");
  //@ts-ignore
  const filteredListType = JSON.parse(dropDownListData).data?.config?.lists?.filter((item: any) => item.LI_FIELDNAME === "TP_TYPE");

  const itemType = [
    {
      ID: "S",
      Name: "struktura/zespolenie",
    },
    {
      ID: "P",
      Name: "pojedyncze szkło",
    },
  ];

  const itemShape = [
    {
      ID: 0,
      Name: "prostokąt",
    },
    {
      ID: 1,
      Name: "Kształt",
    },
  ];

  const itemSzprosy = [
    {
      ID: 0,
      Name: "Szprosy",
    },
    {
      ID: 1,
      Name: "",
    },
  ];

  const InputPopup = useCallback(
    ({
      name,
      value,
      disabled,
      onChange,
      width,
      marginLeft,
      bg,
      numberBox,
      format
    }: {
      name: string;
      value: any;
      disabled?: boolean;
      onChange?: any;
      width?: any;
      bg?: string;
      marginLeft?: number;
      numberBox?:boolean;
      format?:any
    }) => {
      return (
        <>
          <Box
            id={"containerFormProfil"}
            width={width}
            crossAlign={"stretch"}
            align={"center"}
            style={{ marginLeft: marginLeft }}
          >
            <Item ratio={1}>
              <p
                style={{
                  color: "#000",
                  fontSize: 14,
                  // fontFamily: "Poppins",
                  // fontWeight: 400,
                  marginTop: 5,
                  textAlign: "left",
                  paddingBottom: 2,
                }}
              >
                {name}
              </p>
              {numberBox ?  <NumberBox
                disabled={disabled}
                value={value}
                onValueChanged={onChange}
                style={{ backgroundColor: bg}}
                format={format}
                // rtlEnabled={true}
                
                
              ></NumberBox> : 
              <TextBox
                disabled={disabled}
                value={value}
                // id={"textInputEdit"}
                onValueChanged={onChange}
                style={{ backgroundColor: bg }}
              ></TextBox>}
            </Item>
          </Box>
        </>
      );
    },
    []
  );

  return (
    <Popup
      visible={visible}
      onHiding={onHiding}
      // container=".dx-viewport"
      showCloseButton={false}
      showTitle={false}
      style={{ display: "flex", alignItems: "flex-start", width: "100%" }}
      position={"center"}
      height={"90%"}
      width={"80%"}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "space-around",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <InputPopup
          name={"Numer zamówienia"}
          value={dcNumber}
          // onChange={onChangeTpId}
          disabled={true}
          width={"20%"}
        />
        <InputPopup
          name={"Typ"}
          value={dcType}
          // onChange={onChangeTpId}
          disabled={true}
          width={"4%"}
          marginLeft={10}
          bg={"#FFA500"}
        />
        <InputPopup
          name={"Stan zamówienia"}
          value={dcState}
          // onChange={onChangeTpId}
          disabled={true}
          width={"20.6%"}
          marginLeft={10}
          bg={"#FFFF00"}
        />
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <p
            style={{
              color: "#000",
              fontSize: 14,

              marginTop: 3,
              textAlign: "left",
              paddingBottom: 5,
            }}
          >
            {getString("orders", "dateRegister")}
          </p>
          <DateBox
            disabled={true}
            value={dcRegister}
            type="datetime"
            style={{ backgroundColor: "#FFE4B5" }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 5,
        }}
      >
        <InputPopup
          name={"Pozycja"}
          value={tpPos}
          onChange={onChangeTpPos}
          width={"18%"}
        />
        <InputPopup
          name={"Symbol"}
          value={tpSymbol}
          onChange={onChangeTpSymbol}
          width={"25%"}
          marginLeft={10}
        />
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            marginTop: 7,
            marginLeft: 10,
            width: "20%",
          }}
        >
          <p>Rodzaj</p>
          <SelectBox
            // id="textInputAuth"
            displayExpr="LIL_TEXT"
            valueExpr="LIL_VALUE"
            items={filteredListType[0].items}
            defaultValue={
              tpType
                ? tpType
                : filteredListType[0].items
                    .filter((item: any) => item.LIL_DEFAULT === "T")
                    .map((item: any) => item.LIL_VALUE)[0]
            }
            onValueChanged={onValueChangedType}
            width={"100%"}
            style={{ backgroundColor: "#FFE4B5" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: 20,
            width: "18%",
          }}
        >
          <InputPopup
            name={"Stan"}
            value={tpGQnt}
            disabled={true}
            onChange={onChangeTpGQnt}
            width={"100%"}
            bg={"#87CEFA"}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 5,
        }}
      >
        <InputPopup
          name={"Opis pozycji"}
          value={tpName}
          onChange={onChangeTpName}
          width={"64.3%"}
        />
        <div style={{ position: "absolute",
            right:20,
            marginTop: 10, width: '19%',}}><p style={{marginLeft:10,marginBottom:5}}>Opcje</p>
        <div
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 15,
            display: "flex",
            flexDirection: "column",
            borderColor: "#87CEFA",
            backgroundColor: "transparent",
            borderStyle: "solid",
           
            marginLeft: 10,
           
            
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p>Kształt</p>
            <CheckBox
              value={tpShape}
              rtlEnabled
              onValueChanged={onChangeTpShape}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            <p>Szprosy</p>
            <CheckBox
              value={tpMuntins}
              rtlEnabled
              onValueChanged={onChangeTpMuntins}
            />
          </div>
        </div>
        </div>
        {/* <div
          style={{
            flexDirection: "column",
            display: "flex",
            marginLeft: 10,
            marginTop: 7,
            width: "20%",
          }}
        >
          <p>Prostokąt/kształt</p>
          <SelectBox
            // id="textInputAuth"
            // id="dx-selectbox"
            displayExpr="Name"
            valueExpr="ID"
            items={itemShape}
            defaultValue={tpShape}
            onValueChanged={onChangeTpShape}
            width={"100%"}
            style={{backgroundColor:'#6C4ABF',color:'#fff'}}
            // wrapItemText={'white'}
          />
        </div> */}

        {/* <div
          style={{
            flexDirection: "column",
            display: "flex",
            marginLeft: 10,
            marginTop: 7,
            width: "20%",
          }}
        >
          <p>Szprosy</p>
          <SelectBox
            // id="textInputAuth"
            displayExpr="Name"
            valueExpr="ID"
            items={itemSzprosy}
            defaultValue={tpMuntins}
            onValueChanged={onChangeTpMuntins}
            width={"100%"}
            style={{backgroundColor:'#32CD32'}}
          />
        </div> */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "space-between",
          marginTop: 5,
          alignItems: "center",
        }}
      >
        <InputPopup
          name={"Szerokość [mm]"}
          value={tpW}
          onChange={onChangeTpW}
          width={"10%"}
          numberBox
        />
        <p style={{ marginTop: 25, marginLeft: 20 }}>X</p>
        <InputPopup
          name={"Wysokość [mm]"}
          value={tpH}
          onChange={onChangeTpH}
          width={"10%"}
          marginLeft={20}
          numberBox
          
        />
        <InputPopup
          name={"Ilość [szt]"}
          value={tpTQnt}
          onChange={onChangeTpTQnt}
          width={"12%"}
          marginLeft={20}
          numberBox
          format={"####0#"}
          
        />
        <InputPopup
          name={"Ciężar jedn. [kg]"}
          value={tpWeight}
          onChange={onChangeTpWeight}
          marginLeft={20}
          width={"13%"}
          numberBox
        />
        <InputPopup
          name={"Ciężar [kg]"}
          value={totalWeight}
          // onChange={onChangeTpWeight}
          marginLeft={20}
          width={"12%"}
          numberBox
          format={'####0.#'}
        />
        
      </div>
      <InputPopup
        name={"Identyfikacja"}
        value={tpIdent}
        onChange={onChangeTpIdent}
        width={"64.3%"}
      />

      <ThreeTest />

      <div style={{ position: "absolute", bottom: 20, left: 20 }}>
        <Button
          onClick={onClick}
          text="Zapisz"
          style={{
            backgroundColor: "#4CB050",
            borderColor: "#4CB050",
            width: 150,
            color: "white",
          }}
        />
      </div>
      <div style={{ position: "absolute", bottom: 20, right: 20 }}>
        <Button
          onClick={closePopup}
          text="Anuluj"
          style={{
            backgroundColor: "#284479",
            borderColor: "#284479",
            width: 150,
            color: "white",
          }}
        />
      </div>
    </Popup>
  );
};
