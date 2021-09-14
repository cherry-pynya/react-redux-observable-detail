import { createSlice } from "@reduxjs/toolkit";
import { URL, pending, error, success } from "../URL";
import { ofType } from "redux-observable";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  map,
  catchError,
  retry,
  mergeMap,
} from "rxjs/operators";

const data = [];
const item = {
  id: null,
  name: "",
  price: "",
  content: "",
};

export const listSlice = createSlice({
  name: "list",
  initialState: {
    data,
    status: pending,
    item,
  },
  reducers: {
    clearForm: (state) => {
      state.item = item;
    },
    changeForm: (state, action) => {
      const { name, value } = action.payload;
      state.item = { ...state.item, [name]: value };
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
      state.status = success;
    },
    setItem: (state, action) => {
      state.item = action.payload;
      state.status = success;
    },
    requestData: (state, action) => {
      state.status = pending;
    },
    requestDataById: (state, action) => {
      state.status = pending;
    },
  },
});

export const requestDataEpic = (action$) =>
  action$.pipe(
    ofType(listSlice.actions.requestData),
    mergeMap(() =>
      ajax({
        url: URL,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).pipe(
        retry(3),
        map((res) => setData(res.response)),
        catchError((e) => of(changeStatus(error)))
      )
    )
  );

  export const requestDataByIdEpic = (action$) =>
  action$.pipe(
    ofType(listSlice.actions.requestDataById),
    mergeMap((action) =>
      ajax({
        url: `${URL}/${action.payload}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).pipe(
        retry(3),
        map((res) => setItem(res.response)),
        catchError((e) => of(changeStatus(error)))
      )
    )
  );

// Action creators are generated for each case reducer function
export const {
  clearForm,
  changeForm,
  changeStatus,
  setData,
  requestData,
  requestDataById,
  setItem
} = listSlice.actions;

export default listSlice.reducer;
