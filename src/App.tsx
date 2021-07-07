import React, { useEffect, useReducer } from "react";
import useFetchRecords from "./hooks/useFetchRecords";
import processRecords from "./helpers/processRecords";
import { getRecords } from "./api";
import recordsReducer, { initialState } from "./state/reducer";
import "./App.css";
import { RecordActionList } from "./state/types";
import { Record } from "./types";

function App() {
  const [state, dispatch] = useReducer(recordsReducer, initialState);

  const { recordData, page, loading } = state;

  useFetchRecords({
    page,
    onLoad: (records: Record[]) =>
      dispatch({
        type: RecordActionList.RECORDS_LOADED,
        payload: records,
      }),
    toggleLoadOn: () =>
      dispatch({ type: RecordActionList.SET_LOADING, payload: true }),
  });

  console.log(recordData, loading);
  return <div className="App">Hello</div>;
}

export default App;
