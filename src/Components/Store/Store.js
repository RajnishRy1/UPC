import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import fileSlice from "./InputfileSlice";
import CurrentStateSlice from "./CurrentStateSlice";
// const reducers = combineReducers({
//   profile: profileSlice.reducer,
//   store: storeSlice.reducer,
//   allstores: allStoresSlice.reducer,
//   signUp: signUpSlice.reducer,
//   eAlert: eAlertSlice.reducer,
//   flags: flagSlice.reducer,
// });

const reducers = combineReducers({
  file: fileSlice.reducer,
  CurrentState: CurrentStateSlice.reducer,
});

const persistConfig = {
  key: "upcproj_intfc",
  blacklist: ["CurrentState"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const Store = configureStore({
  reducer: persistedReducer,
});

export default Store;
export const per = persistConfig;
