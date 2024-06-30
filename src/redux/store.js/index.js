// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../slices/rootReducer"; // Create this file for your combined reducers

const makeStore = () => configureStore({
  reducer: rootReducer,
});

export const wrapper = createWrapper(makeStore);