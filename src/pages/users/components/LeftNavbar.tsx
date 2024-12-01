import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../../business/action/authAction";
import { useAppDispatch } from "../../../business/reducer/store";
import { getString } from "../../../locales/string";
// import { Hamburger } from "./Hamburger";

const LeftNavbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(window.innerWidth);
  let name =localStorage.getItem("name");
  //@ts-ignore
 const nameComapny=JSON.parse(name)
  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);
  
  const isMobile = width <= 768;

  return (
    <div className="leftNavbar" style={{ width: "10%"}}>
      
    <ul >
      {/* <li style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft:20
        }}>
    <a
          onClick={() => {
            // navigate("/user/home");
          }}
          className="siteTitle"
          style={{marginLeft:0}}
        >
          {nameComapny}
        </a>
        </li> */}
      <li
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a style={{display:'flex',flexDirection:'row',alignItems:'center',cursor:'pointer',marginLeft:20,marginTop:0}} onClick={() => {
                navigate("/admin/ordersList");
              }}>
                 <img src={"/icons/orders.svg"} />
          <p
            style={{
              fontFamily: "Poppins",
              fontSize: 15,
              color: "white",
              marginLeft: 15,
              cursor:'pointer',
              textAlign:'left'
            }}
          >
            {getString("orders", "orderRegister")}
          </p>
        </a>
      </li>
      {/* <li
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "center",
          alignItems: "center",
          marginTop:25
        }}
      >
       
        <a style={{display:'flex',flexDirection:'row',alignItems:'center',cursor:'pointer',marginLeft:20}} onClick={() => {
          navigate("/admin/racksList");

        }}>
           <img src={"/icons/glassCart.svg"} />
          <p
            style={{
              fontFamily: "Poppins",
              fontSize: 15,
              color: "white",
              marginLeft: 18,
              cursor:'pointer'
            }}
          >
            {getString("orders", "racks")}
          </p>
        </a>
      </li> */}
    </ul>
  </div>
  );
};
export default LeftNavbar;
