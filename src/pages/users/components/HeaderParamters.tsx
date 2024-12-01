import { useEffect, useState } from "react";

export const HeaderParametrs = ({text}:{text:string}) => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#87CEFA",
        borderRadius: 5,
        height: 40,
        alignItems: "center",
        marginTop:10
      }}
    >
      <p
        style={{
          fontSize: 15,
          fontFamily: "Poppins",
          fontWeight: 600,
          marginLeft: 10,
        }}
      >
       {text}
      </p>
    </div>
  );
};
