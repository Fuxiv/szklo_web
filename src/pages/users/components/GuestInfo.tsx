import { Button } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import { getString } from "../../../locales/string";


export const GuestInfo = ({}) => {
  const navigate = useNavigate();

  return (
    <div
    className="guestInfoContainer"
    >
      <h1
        style={{
          color: '#11C1D9',
          fontFamily: 'Poppins',
          fontWeight: 800,
          fontSize: 34,
        }}
      >
        {getString('guest', 'infoHeader')}
      </h1>
      <p
        style={{
          color: 'white',
          fontFamily: 'Poppins',
          paddingTop: 20,
          letterSpacing: 0.5,
          lineHeight: 1.8,
          textAlign:'left',
          display:'flex',
          flexWrap:'wrap'
        }}
      >
        {getString('guest', 'description')}
      </p>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 50,
        }}
      >
        <div
          style={{
            alignItems: 'center',
            width: '30%',
            textAlign: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p
            style={{
              color: 'white',
              fontFamily: 'Poppins',
              letterSpacing: 0.5,
              lineHeight: 1.8,
              fontSize: 12,
              marginBottom: 8,
            }}
          >
            {getString('guest', 'title1')}
          </p>
          <img src={'/icons/infoIcon.svg'}></img>
          <span
            style={{
              color: 'white',
              fontFamily: 'Poppins',
              letterSpacing: 0.5,
              fontSize: 8,
              marginTop: 18,
            }}
          >
            {getString('guest', 'text')}
          </span>
        </div>
        <div
          style={{
            alignItems: 'center',
            width: '30%',
            textAlign: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p
            style={{
              color: 'white',
              fontFamily: 'Poppins',
              letterSpacing: 0.5,
              lineHeight: 1.8,
              fontSize: 12,
              marginBottom: 8,
            }}
          >
            {getString('guest', 'title2')}
          </p>
          <img src={'/icons/infoIcon.svg'}></img>
          <span
            style={{
              color: 'white',
              fontFamily: 'Poppins',
              letterSpacing: 0.5,
              fontSize: 8,
              marginTop: 18,
            }}
          >
            {getString('guest', 'text')}
          </span>
        </div>
        <div
          style={{
            alignItems: 'center',
            width: '30%',
            textAlign: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p
            style={{
              color: 'white',
              fontFamily: 'Poppins',
              letterSpacing: 0.5,
              lineHeight: 1.8,
              fontSize: 12,
              marginBottom: 8,
            }}
          >
            {getString('guest', 'title3')}
          </p>
          <img src={'/icons/infoIcon.svg'}></img>
          <span
            style={{
              color: 'white',
              fontFamily: 'Poppins',
              letterSpacing: 0.5,
              fontSize: 8,
              marginTop: 18,
            }}
          >
            {getString('guest', 'text')}
          </span>
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:90,height:120,justifyContent:'space-between'}}>
      <Button
        id={'myButtonInfo'}
        text={getString('startApp','logIn')}
        width={'50%'}
        height={45}
        icon={'/icons/arrowLog.svg'}
        onClick={()=>navigate('/signIn')}
        rtlEnabled={true}
      />
      <Button
         onClick={()=>navigate('/signUp')}
        id={'myButtonInfo'}
        text={getString('startApp','register')}
        width={'50%'}
        height={45}
        icon={'/icons/arrowLog.svg'}
        rtlEnabled={true}
      />
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
        <div style={{  width: "30%"}}>
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
        <div style={{  width: "30%"}}>
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
        <div style={{  width: "30%"}}>
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
