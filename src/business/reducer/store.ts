import { persistReducer } from "redux-persist";
import {
  configureStore,
  combineReducers,
  AnyAction,
  EnhancedStore,
  Reducer,
  CombinedState,
} from "@reduxjs/toolkit";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice, { authState } from "./authSlice";
import storage from "redux-persist/lib/storage";
import editUserSlice, { editUserState } from "./editUserSlice";
import listSlice, { listState } from "./listSlice";
import editOrdersParamsSlice from "./editOrdersParamsSlice";


type ReducerT = Reducer<
  CombinedState<{
    auth: authState;
    editUser:editUserState
    list:listState
    editParamsOrder:editUserState
  }>,
  AnyAction
>;

const rootReducer = combineReducers({
  auth: authSlice,
  editUser:editUserSlice,
  list:listSlice,
  editParamsOrder:editOrdersParamsSlice
});

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "persistedSelectedData", "workshop"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
});

export type RootState = ReturnType<ReducerT>;

export type AppAction<T = any> = AnyAction & { payload?: T };

export type AppThunk<R = void> = ThunkAction<R, RootState, any, AppAction>;

export type AppDispatch = ThunkDispatch<RootState, any, AppAction>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
