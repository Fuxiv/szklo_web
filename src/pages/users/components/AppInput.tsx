import { TextBox } from "devextreme-react";
import Box, { Item } from "devextreme-react/box";
import { NativeEventInfo } from "devextreme/events";
import { ValueChangedInfo } from "devextreme/ui/editor/editor";
import { TextBoxInstance } from "devextreme/ui/text_box";

interface AppInputProps {
  name: string;
  value: string | any;
  marginTop?: number;
  width?: number | string;
  marginLeft?: number;
  onChange?: (e: NativeEventInfo<TextBoxInstance, Event> & ValueChangedInfo) => void;
  disabled?:boolean;
}

export const AppInput = ({
  name,
  value,
  onChange,
  width,
  marginLeft,
  disabled
}: AppInputProps) => {
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
              color: "#fff",
              fontSize: 14,
              fontFamily: "Poppins",
              fontWeight: 400,
              marginTop: 15,
              textAlign: "left",
              paddingBottom: 10,
            }}
          >
            {name}
          </p>
          <TextBox
          disabled={disabled}
            value={value}
            id={"textInputAuth"}
            onValueChanged={onChange}
          ></TextBox>
        </Item>
      </Box>
    </>
  );
};
