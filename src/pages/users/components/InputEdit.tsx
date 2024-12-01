import {  Button, DateBox, SelectBox, TextArea } from "devextreme-react";
import TextBox from "devextreme-react/text-box";
import Box, { Item } from "devextreme-react/box";
import NumberBox from "devextreme-react/number-box";
import { CheckBox } from 'devextreme-react/check-box';
import { locale,loadMessages } from "devextreme/localization";
import config from "devextreme/core/config";
import { useCallback, useEffect, useRef, useState } from "react";

interface AppInputProps {
  name: string;
  value: string | any;
  marginTop?: number;
  width?: number | string;
  marginLeft?: number;
  // onChange?: (
  //   e: NativeEventInfo<TextBoxInstance, Event> & ValueChangedInfo
  // ) => void;
  onChange?: (e: any) => void;
  onChangeCheckBox?: (e: any) => void;
  disabled?: boolean;
  textAreaShow?: boolean;
  bg?: string;
  children?: any;
  maskRules?: any;
  maskMessage?: any;
  dateBox?: boolean;
  checkbox?: boolean;
  dropDownList?: boolean;
  maxLengthTextBox?: number | any;
  numberBox?: boolean;
  rowsTextArea?:number;
  itemsSelect?:any
  valueDeliveryMethod?: string | number;
  typeDate?:string | any;
  dateFormat?:any;
  onFocusOut?:any;
  unit?:string;
  valueCheckBox?:boolean;
  onOptionChangedCheckBox?:any
  flexBasis?: string | number;
  flexGrow?: number;
  flexShrink?: number;
}

export const InputEdit = ({
  name,
  value,
  onChange,
  width,
  marginLeft,
  disabled,
  textAreaShow,
  bg,
  children,
  maskRules,
  maskMessage,
  dateBox,
  checkbox,
  dropDownList,
  maxLengthTextBox,
  numberBox,
  rowsTextArea,
  itemsSelect,
  valueDeliveryMethod,
  typeDate,
  dateFormat,
  onFocusOut,
  onChangeCheckBox,
  unit,
  valueCheckBox,
  onOptionChangedCheckBox,
  flexBasis,
  flexGrow,
  flexShrink
}: AppInputProps) => {
  locale('pl'); //format daty
  const [localeState, setLocaleState] = useState(() => {
    const storageLocale = sessionStorage.getItem('locale');
    return storageLocale != null ? storageLocale : 'pl';
  });

  useEffect(() => {
    locale(localeState);
  }, [localeState]);

 
  config({
    // decimalSeparator: ",",
    // ...
})
const selectRef = useRef(null);  
const [isListOpen, setIsListOpen] = useState(false);
const handleButtonClick = () => { 
  if (isListOpen) {
    //@ts-ignore
    selectRef.current.instance.close(); // jeśli lista jest otwarta, zamknij ją
    setIsListOpen(false); // ustaw stan na false
  } else {
    //@ts-ignore
    selectRef.current.instance.open(); // jeśli lista jest zamknięta, otwórz ją
    setIsListOpen(true); // ustaw stan na true
  }
}; 
  return (
    <>
      <Box
        id={"containerFormProfil"}
        width={width}
        crossAlign={"stretch"}
        align={"center"}
        style={{ marginLeft: marginLeft, marginTop: 10, flexGrow: flexGrow, flexShrink: flexShrink, flexBasis: flexBasis}}
      >
        <Item ratio={1}>
          {textAreaShow ? (
            <TextArea
              disabled={disabled}
              value={value}
              id={"textAreaEdit"}
              onValueChanged={onChange}
              //minHeight={50}
              minHeight={100}
              maxHeight={100}
              valueChangeEvent="keyup"
              label={name}
              labelMode={"static"}
              stylingMode="filled"
              inputAttr={{rows:rowsTextArea}}
              onFocusOut={onFocusOut}
              autoResizeEnabled={false}   
              
            ></TextArea>
          ) : dateBox ? (
            <DateBox
              style={{ marginLeft: marginLeft, marginTop: 10, flexGrow: flexGrow, flexShrink: flexShrink, flexBasis: flexBasis}}
              id="textInputEdit"
              value={value}
              onValueChanged={onChange}
              type={typeDate}
              label={name}
              dateSerializationFormat={dateFormat}
              labelMode={"static"}
              stylingMode="filled"
              // disabled={disabled}
              interval={1}
              onFocusOut={onFocusOut}
              readOnly={disabled}
            />
          ) : checkbox ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  marginTop: 5,
                  textAlign: "left",
                  paddingBottom: 2,
                }}
              >
                {name}
              </p>
              <CheckBox value={value}  onValueChanged={onChangeCheckBox}/>
            </div>
          ) : dropDownList ? (
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
              <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
           
            <SelectBox
              ref={selectRef}
              id="textInputEdit"
              displayExpr="LIL_TEXT"
              valueExpr="LIL_VALUE"
              items={itemsSelect}
              //@ts-ignore
              onValueChanged={onChange}
              // disabled={state.data.DC_STATE > 0 ? true : false}
              label={name}
              labelMode={"static"}
              stylingMode="filled"
              disabled={disabled}
              defaultValue={
                valueDeliveryMethod 
              }
              onFocusOut={onFocusOut}
              width={unit ? '90%': '100%'}
              deferRendering={true}
              showDropDownButton={false}
              openOnFieldClick={false}
            />
               <Button id={"myButtonArrow"} icon={"/icons/arrowDown.svg"} onClick={handleButtonClick}></Button>
            </div>
             {unit? 
              <p style={{color:'#ffff',fontFamily:'Poppins',marginLeft:10}}>{unit}</p>: null}
            </div>
          ) : numberBox ? (
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>

            <NumberBox
              id={"textNumberBox"}
              labelMode={"static"}
              stylingMode="filled"
              label={name}
              value={value}
              onValueChanged={onChange}
              format={maxLengthTextBox}
              onFocusOut={onFocusOut}
              step={0}
              // max={14}
              // disabled={disabled}
              width={unit ? '90%': '100%'}
              
            />
              {unit? 
            <p style={{color:'#ffff',fontFamily:'Poppins',marginLeft:10}}>{unit}</p>: null}
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
            <TextBox
              onFocusOut={onFocusOut}
              label={name}
              // disabled={disabled}
              value={value}
              id={"textInputEdit"}
              onValueChanged={onChange}
              style={{ backgroundColor: bg }}
              valueChangeEvent="keyup"
              maskRules={maskRules}
              maskInvalidMessage={maskMessage}
              labelMode={"static"}
              stylingMode="filled"
              maxLength={maxLengthTextBox}
              width={unit ? '90%': '100%'}
              readOnly={disabled}
              // isValid={true}
              
            >
              {children}
            </TextBox>
            {unit? 
            <p style={{color:'#ffff',fontFamily:'Poppins',marginLeft:10}}>{unit}</p>: null}
            </div>
          )}
        </Item>
      </Box>
    </>
  );
};
