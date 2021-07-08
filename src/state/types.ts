import { Record } from "../types";
import { MouseEventHandler } from "react";

export type RecordState = {
  recordData: Record[];
  loading: boolean;
};

export type PageState = {
  currentPage: number;
  pageUp: MouseEventHandler;
  pageDown: MouseEventHandler;
  jumpToPage: Function;
  allPages: number[];
};

export enum RecordActionList {
  SET_LOADING = "SET_LOADING",
  RECORDS_LOADED = "RECORDS_LOADED",
  UPDATE_RECORD = "UPDATE_RECORD",
  REMOVE_RECORD = "REMOVE_RECORD",
}

export type RecordAction =
  | { type: RecordActionList.SET_LOADING; payload: boolean }
  | { type: RecordActionList.RECORDS_LOADED; payload: Record[] }
  | {
      type: RecordActionList.UPDATE_RECORD;
      payload: { previousAlbumTitle: string; record: Record };
    }
  | {
      type: RecordActionList.REMOVE_RECORD;
      payload: string;
    };
