import React, { useReducer } from "react";
import useFetchRecords from "./hooks/useFetchRecords";
import recordsReducer, { initialState } from "./state/reducer";
import {
  RecordList,
  RecordListContent,
  RecordListHeader,
  RecordListHeadingRow,
  RecordListItem,
  RecordListFooter,
} from "./components/RecordList";
import Pagination, { usePagination } from "./components/Pagination";
import { RecordActionList } from "./state/types";
import { Record } from "./types";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(recordsReducer, initialState);

  const { recordData, loading } = state;
  const { currentPage, pageUp, pageDown, jumpToPage, allPages } = usePagination(
    1,
    2
  );

  useFetchRecords({
    page: currentPage,
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
      <RecordListContent loading={loading}>
        <RecordListHeadingRow
          titles={["Title", "Year", "Condition", "Artist Name"]}
        />
        {recordData.map((record: Record) => (
          <RecordListItem
            key={record.albumTitle}
            title={record.albumTitle}
            year={record.year}
            condition={record.condition}
            artistName={record.artist.name}
            artistId={record.artist.id}
            onRecordSave={(newRecord: Record) =>
              dispatch({
                type: RecordActionList.UPDATE_RECORD,
                payload: {
                  previousAlbumTitle: record.albumTitle,
                  record: newRecord,
                },
              })
            }
          />
        ))}
      </RecordListContent>
      <RecordListFooter>
        <Pagination
          currentPage={currentPage}
          handlePageUp={pageUp}
          handlePageDown={pageDown}
          handleJumpToPage={jumpToPage}
          allPages={allPages}
        />
      </RecordListFooter>
    </RecordList>
  );
}

export default App;
