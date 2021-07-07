import { Record } from "../types";

export type RecordState = {
  recordData: Record[];
  page: number;
  loading: boolean;
};

export enum RecordActionList {
  SET_LOADING = "SET_LOADING",
  RECORDS_LOADED = "RECORDS_LOADED",
}

export type RecordAction =
  | { type: RecordActionList.SET_LOADING; payload: boolean }
  | { type: RecordActionList.RECORDS_LOADED; payload: Record[] };
