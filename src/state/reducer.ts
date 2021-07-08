import { RecordAction, RecordActionList, RecordState } from "./types";
import { Record } from "../types";

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
      };
    default:
      return state;
  }
}
