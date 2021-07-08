import { RecordAction, RecordActionList, RecordState } from "./types";
import { Record, RecordCondition } from "../types";

export const initialState: RecordState = {
  recordData: [],
  loading: false,
  newRecord: null,
  recordBeingEdited: null,
};

export default function recordsReducer(
  state: RecordState,
  action: RecordAction
): RecordState {
  switch (action.type) {
    case RecordActionList.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case RecordActionList.RECORDS_LOADED:
      return {
        ...state,
        recordData: action.payload,
        loading: false,
      };

    case RecordActionList.START_CREATE_NEW:
      return {
        ...state,
        newRecord: {
          albumTitle: "",
          artist: {
            name: "",
            id: Math.random() * 400,
          },
          year: 2021,
          condition: RecordCondition[RecordCondition.good],
        },
      };
    case RecordActionList.SAVE_NEW_RECORD:
      return {
        ...state,
        recordData: state.recordData.concat([action.payload]),
        newRecord: null,
      };
    case RecordActionList.REMOVE_RECORD:
      return {
        ...state,
        recordData: state.recordData.filter(
          (record) => record.albumTitle !== action.payload
        ),
      };
    case RecordActionList.TOGGLE_RECORD_EDIT:
      return {
        ...state,
        recordBeingEdited: action.payload,
      };
    case RecordActionList.UPDATE_RECORD:
      const currentRecordIndex: number = state.recordData.findIndex(
        (record) => record.albumTitle === action.payload.previousAlbumTitle
      );
      const currentRecord: Record = state.recordData[currentRecordIndex];
      const currentCollection =
        currentRecord.artist.name !== action.payload.record.artist.name
          ? state.recordData.map((oldRecord) =>
              oldRecord.artist.id === action.payload.record.artist.id
                ? { ...oldRecord, artist: { ...action.payload.record.artist } }
                : oldRecord
            )
          : state.recordData;

      if (currentRecord.artist.name !== action.payload.record.artist.name) {
        localStorage.setItem(
          `artistId:${action.payload.record.artist.id}`,
          action.payload.record.artist.name
        );
      }

      return {
        ...state,
        recordData: [
          ...currentCollection.slice(0, currentRecordIndex),
          action.payload.record,
          ...currentCollection.slice(currentRecordIndex + 1),
        ],
        recordBeingEdited: null,
      };
    case RecordActionList.CANCEL_CREATE:
      return {
        ...state,
        newRecord: null,
      };
    default:
      return state;
  }
}
