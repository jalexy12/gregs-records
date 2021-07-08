import { RecordAction, RecordActionList, RecordState } from "./types";

export const initialState: RecordState = {
  recordData: [],
  loading: false,
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
    case RecordActionList.UPDATE_RECORD:
      const currentRecordIndex: number = state.recordData.findIndex(
        (record) => record.albumTitle === action.payload.previousAlbumTitle
      );
      console.log({
        ...state,
        recordData: [
          ...state.recordData.slice(0, currentRecordIndex),
          action.payload.record,
          ...state.recordData.slice(currentRecordIndex + 1),
        ],
      });
      return {
        ...state,
        recordData: [
          ...state.recordData.slice(0, currentRecordIndex),
          action.payload.record,
          ...state.recordData.slice(currentRecordIndex + 1),
        ],
      };
    default:
      return state;
  }
}
