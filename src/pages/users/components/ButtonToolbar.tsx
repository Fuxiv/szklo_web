import { Button } from "devextreme-react"
import { getString } from "../../../locales/string"


interface ButtonToolbarProps{
    text:string;
    onClick?:any;
    style?:any;
    icon?:any;
    id?:any;
    width?:string | number;
    
}

export const ButtonToolbar=({text,onClick,style,icon,id,width}:ButtonToolbarProps)=>{
    return(
        <Button
        id={id ? id : "selectbuttonToolbar"}
        text={text}
        width={150}
        height={35}
        onClick={onClick}
        style={style}
        icon={icon}
      /> 
    )
}