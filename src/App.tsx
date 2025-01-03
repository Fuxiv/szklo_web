import "devextreme/dist/css/dx.light.css";
import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IndexScreen from "./pages/auth/IndexScreen";
import { LoginScreen } from "./pages/auth/LoginScreen";
import { StoreProvider } from "./business/reducer/storeProvider";
import { RegisterScreen } from "./pages/auth/RegisterScreen";
import { GuestFormScreen } from "./pages/users/GuestFormScreen";
import { VeryficationScreen } from "./pages/auth/VeryficationScreen";
import { HomeUserScreen } from "./pages/users/HomeUserScreen";
import PrivateRoute from "./pages/auth/PrivateRoute";
import Navbar from "./pages/users/components/Navbar";
import { store, useAppSelector } from "./business/reducer/store";
import { MessageScreen } from "./pages/users/MessageScreen";
import { setLoggedIn } from "./business/reducer/authSlice";
import { SendEmailScreen } from "./pages/auth/SendEmailScreen";
import { RemindPasswordScreen } from "./pages/auth/RemindPasswordScreen";
import { SendEmailToNewPassword } from "./pages/auth/SendEmailToNewPassword";
import { ProfileScreen } from "./pages/users/ProfileScreen";
import { ChangePasswordScreen } from "./pages/users/ChangePasswordScreen";
import { OrdersListScreen } from "./pages/users/OrdersListScreen";
import { EditOrders } from "./pages/users/EditOrders";
import { dropDownList } from "./business/action/dropDownListAction";

function App() {
  useEffect(() => {
    checkIfLoggedIn();
   
  }, []);
  const checkIfLoggedIn = () => {
    // @ts-ignore
    let value: userI = localStorage.getItem("token");
      //@ts-ignore
      store.dispatch(dropDownList(value))
    if (typeof value === "string") {
      value = JSON.parse(value);
    }
  
    if (value) {
      if (value !== undefined && value !== null) {
        //@ts-ignore
        store.dispatch(setLoggedIn({ token: value }));
        //@ts-ignore
        store.dispatch(dropDownList(value))
      }
    }
  };

  return (
    <StoreProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/admin/ordersList" element={<OrdersListScreen />} />
              <Route path="/admin/ordersList/edit" element={<EditOrders/>} />
              <Route path="/user/home" element={<HomeUserScreen />} />
              <Route path="/user/message" element={<MessageScreen />} />
              <Route path="/user/profil" element={<ProfileScreen />} />
              <Route
                path="/user/profil/newPassword"
                element={<ChangePasswordScreen />}
              />
                 </Route>
            <Route path="/" element={<IndexScreen />} />
            <Route path="/signIn" element={<LoginScreen />} />
            <Route path="/signUp" element={<RegisterScreen />} />
            <Route path="/signUp/sendConfirm" element={<SendEmailScreen />} />
            <Route
              path="/remindPassword"
              element={<SendEmailToNewPassword />}
            />
            <Route
              path="/resetuj-haslo/:remindToken"
              element={<RemindPasswordScreen />}
            />
            <Route
              path="/potwierdzenie-rejestracji/:token"
              element={<VeryficationScreen />}
            />
            <Route path="/contactForm" element={<GuestFormScreen />} />
          </Routes>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
