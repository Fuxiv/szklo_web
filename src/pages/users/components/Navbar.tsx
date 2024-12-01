import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../../business/action/authAction";
import { useAppDispatch } from "../../../business/reducer/store";
import { getString } from "../../../locales/string";
import { Hamburger } from "./Hamburger";

const Navbar = () => {
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
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <nav>
      <div
        className="navbar"
        style={{ left: isMobile ? (open ? 0 : "-100%") : 0 }}
      >
        <a
          onClick={() => {
            navigate("/admin/ordersList");
          }}
          className="siteTitle"
        >
          {nameComapny}
          {/* {getString("orders", "nameCompany")} */}
        </a>
        <ul
          style={{
            display: "flex",
            justifyContent: "space-between",
            // width: "25%",
          }}
        >
           <li>
             <a
              onClick={() => {
                 navigate('/user/profil')
             setOpen(false)

              }}
               style={{
                 display: "flex",
                alignItems: "center",
                 flexDirection: "column",
                 marginRight:20
               }}
             >
               <img src={"/icons/profile.svg"} />
              <p className="textNavbar">{getString("navbar", "profile")}</p>
             </a>
          </li>
          <li>
            <a
              onClick={() => {
                dispatch(logout());
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                cursor: "pointer",
              }}
            >
              <img src={"/icons/logout.svg"} />
              <p className="textNavbar">{getString("navbar", "logout")}</p>
            </a>
          </li>
        </ul>
      </div>
      {/* <Hamburger open={open} setOpen={setOpen}/> */}
    </nav>
    // <nav>
    //   <div className="navbar" style={{left: isMobile ? (open ? 0 : '-100%'):0}}>
    //     <a
    //       onClick={() => {
    //         navigate("/user/home");
    //       }}
    //       className="siteTitle"
    //     >
    //       Logo
    //     </a>
    //     <ul
    //       style={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         width: "25%",
    //       }}
    //     >
    //       <li>
    //         <a
    //           style={{
    //             display: "flex",
    //             alignItems: "center",
    //             flexDirection: "column",
    //           }}
    //         >
    //           <img src={"/icons/settlement.svg"} />
    //           <p className="textNavbar">{getString("navbar", "state")}</p>
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           onClick={() => {
    //             navigate("/user/message");
    //         setOpen(false)

    //           }}
    //           // href="/user/message"
    //           style={{
    //             display: "flex",
    //             alignItems: "center",
    //             flexDirection: "column",
    //           }}
    //         >
    //           <img src={"/icons/message.svg"} />
    //           <p className="textNavbar">{getString("navbar", "messages")}</p>
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           onClick={() => {
    //             navigate('/user/profil')
    //         setOpen(false)

    //           }}
    //           style={{
    //             display: "flex",
    //             alignItems: "center",
    //             flexDirection: "column",
    //           }}
    //         >
    //           <img src={"/icons/profile.svg"} />
    //           <p className="textNavbar">{getString("navbar", "profile")}</p>
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           onClick={() => {
    //             dispatch(logout());
    //         setOpen(false)
    //           }}
    //           style={{
    //             display: "flex",
    //             alignItems: "center",
    //             flexDirection: "column",
    //           }}
    //         >
    //           <img src={"/icons/logout.svg"} />
    //           <p className="textNavbar">{getString("navbar", "logout")}</p>
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    //   <Hamburger open={open} setOpen={setOpen}/>
    // </nav>
  );
};
export default Navbar;
