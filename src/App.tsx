import React, { useReducer } from "react";
import useFetchRecords from "./hooks/useFetchRecords";
import recordsReducer, { initialState } from "./state/reducer";
import {
  RecordList,
  RecordListContent,
  RecordListHeader,
  RecordListHeadingRow,
  RecordListItem,
} from "./components/RecordList";

import { RecordActionList } from "./state/types";
import { Record } from "./types";
import "./App.css";

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

  return (
    <RecordList>
      <RecordListHeader />
      <RecordListContent>
        <RecordListHeadingRow
          titles={["Title", "Year", "Condition", "Artist Name"]}
        />
        {recordData.map((record: Record) => (
          <RecordListItem
            title={record.albumTitle}
            year={record.year}
            condition={record.condition}
            artistName={record.artist.name}
            artistId={record.artist.id}
          />
        ))}
      </RecordListContent>
    </RecordList>
  );
}

export default App;
