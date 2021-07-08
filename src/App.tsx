import React, { useReducer, useRef } from "react";
import useFetchRecords from "./hooks/useFetchRecords";
import useBasicSearch from "./hooks/useBasicSearch";
import recordsReducer, { initialState } from "./state/reducer";
import SearchBar from "./components/SearchBar";
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
import RecordForm from "./components/RecordForm";

function App() {
  const [state, dispatch] = useReducer(recordsReducer, initialState);
  const { searchValue, handleSearchChange, handleSearchClear, filterResults } =
    useBasicSearch();

  const { recordData, newRecord, recordBeingEdited, loading } = state;
  const { currentPage, pageUp, pageDown, jumpToPage, allPages } = usePagination(
    1,
    2
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  function toggleEdit(recordToToggle: string | null) {
    dispatch({
      type: RecordActionList.TOGGLE_RECORD_EDIT,
      payload: recordToToggle,
    });
  }

  function onStartCreateNew() {
    dispatch({ type: RecordActionList.START_CREATE_NEW });

    requestAnimationFrame(() => inputRef.current?.focus());
  }

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
    <main>
      <h1>Greg's Records</h1>
      <RecordList>
        <RecordListHeader>
          <div className="button-container">
            <button
              className="icon-button blue"
              type="button"
              onClick={onStartCreateNew}
            >
              Create New
            </button>
          </div>
          <SearchBar
            handleSearchChange={handleSearchChange}
            handleClear={handleSearchClear}
            searchValue={searchValue}
          />
          <Pagination
            currentPage={currentPage}
            handlePageUp={pageUp}
            handlePageDown={pageDown}
            handleJumpToPage={jumpToPage}
            allPages={allPages}
          />
        </RecordListHeader>
        <RecordListContent loading={loading}>
          <RecordListHeadingRow
            titles={["Title", "Year", "Condition", "Artist Name"]}
          />
          {newRecord && (
            <div className="RecordList_item">
              <RecordForm
                recordData={newRecord}
                onSave={(recordToCreate: Record) =>
                  dispatch({
                    type: RecordActionList.SAVE_NEW_RECORD,
                    payload: recordToCreate,
                  })
                }
                onCancel={() =>
                  dispatch({ type: RecordActionList.CANCEL_CREATE })
                }
                inputRef={inputRef}
              />
            </div>
          )}
          {filterResults(recordData).map((record: Record) => (
            <RecordListItem
              key={record.albumTitle}
              record={record}
              isEditing={recordBeingEdited === record.albumTitle}
              toggleEdit={toggleEdit}
              onRecordRemove={(removalRecordName: string) =>
                dispatch({
                  type: RecordActionList.REMOVE_RECORD,
                  payload: removalRecordName,
                })
              }
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
    </main>
  );
}

export default App;
