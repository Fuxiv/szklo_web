import { Button } from "devextreme-react"
import { getString } from "../../../locales/string"


interface ButtonEditProps{
    text?:string;
    onClick?:any;
    style?:any;
    icon?:any;
    id?:any;
    width?:string | number;
    useSubmitBehavior?:any
}

export const ButtonEdit=({text,onClick,style,icon,id,width,useSubmitBehavior}:ButtonEditProps)=>{
    return(
        <Button
        id={id ? id : "myButton1"}
        text={text}
        width={width ? width :"10%"}
        height={35}
        onClick={onClick}
        style={style}
        icon={icon}
        useSubmitBehavior={useSubmitBehavior}
      /> 
    )
}