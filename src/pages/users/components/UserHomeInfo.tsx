import { Button } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import { getString } from "../../../locales/string";

export const UserHomeInfo = ({}) => {
  const data = [
    {
      id: 0,
      title: getString("guest", "title1"),
      description: getString("guest", "text"),
    },
    {
      id: 1,
      title: getString("guest", "title2"),
      description: getString("guest", "text"),
    },
    {
      id: 2,
      title: getString("guest", "title3"),
      description: getString("guest", "text"),
    },
  ];

  const data2 = [
    {
      id: 0,
      title: getString("guest", "title1"),
      description: getString("guest", "text"),
    },
    {
      id: 1,
      title: getString("guest", "title2"),
      description: getString("guest", "text"),
    },
    {
      id: 2,
      title: getString("guest", "title3"),
      description: getString("guest", "text"),
    },
  ];

  const SmallBox = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    return (
      <div
        style={{
          alignItems: "center",
          width: "20%",
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            color: "white",
            fontFamily: "Poppins",
            letterSpacing: 0.5,
            lineHeight: 1.5,
            fontSize: 12,
            marginBottom: 8,
          }}
        >
          {title}
        </p>
        <img src={"/icons/infoIcon.svg"}></img>
        <span
          style={{
            color: "white",
            fontFamily: "Poppins",
            letterSpacing: 0.5,
            fontSize: 8,
            marginTop: 18,
            lineHeight: 1.3,
            fontWeight: 300,
          }}
        >
          {description}
        </span>
      </div>
    );
  };

  return (
    <div
      className="containerInfoUser"
    >
      <h1
        style={{
          color: "#11C1D9",
          fontFamily: "Poppins",
          fontWeight: 800,
          fontSize: 34,
          textAlign:'left'
        }}
      >
        {getString("guest", "infoHeader")}
      </h1>
      <p
        style={{
          color: "white",
          fontFamily: "Poppins",
          paddingTop: 20,
          letterSpacing: 0.5,
          lineHeight: 1.6,
          textAlign: "left",
        }}
      >
        {getString("guest", "description")}
      </p>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 50,
        }}
      >
        {data.map((item) => {
          return <SmallBox title={item.title} description={item.description} />;
        })}
      </div>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 50,
        }}
      >
        {data2.map((item) => {
          return <SmallBox title={item.title} description={item.description} />;
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 50,
        }}
      >
        <div style={{  width: "20%"}}>
          <p
            style={{
              color: "#4D68BF",
              fontSize: 12,
              fontFamily: "Poppins",
              fontWeight: 400,
              letterSpacing: 0.5,
              textAlign: "center",
              
            }}
          >
            {getString("info", "timeOpen")}
          </p>
          <p
            style={{
              color: "#4D68BF",
              fontSize: 12,
              fontFamily: "Poppins",
              fontWeight: 500,
              letterSpacing: 0.5,
              textAlign: "center",
              opacity:0.9,
              marginTop:5
            }}
          >
            {getString("info", "time")}
          </p>
        </div>
        <div style={{  width: "20%"}}>
          <p
            style={{
              color: "#4D68BF",
              fontSize: 12,
              fontFamily: "Poppins",
              fontWeight: 400,
              letterSpacing: 0.5,
              textAlign: "center",
            }}
          >
            {getString("info", "contact")}
          </p>
          <p
            style={{
              color: "#4D68BF",
              fontSize: 12,
              fontFamily: "Poppins",
              fontWeight: 500,
              letterSpacing: 0.5,
              textAlign: "center",
              opacity:0.9,
              marginTop:5
            }}>
            {getString("info", "number")}
          </p>
        </div>
        <div style={{  width: "20%"}}>
          <p
            style={{
              color: "#4D68BF",
              fontSize: 12,
              fontFamily: "Poppins",
              fontWeight: 400,
              letterSpacing: 0.5,
              textAlign: "center",
            }}
          >
            {getString("info", "mail")}
          </p>
          <p
            style={{
              color: "#4D68BF",
              fontSize: 12,
              fontFamily: "Poppins",
              fontWeight: 500,
              letterSpacing: 0.5,
              textAlign: "center",
              opacity:0.9,
              marginTop:5
            }}
          >
            {getString("info", "adressemail")}
          </p>
        </div>
      </div>
    </div>
  );
};
