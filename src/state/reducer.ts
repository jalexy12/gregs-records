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
    default:
      return state;
  }
}
