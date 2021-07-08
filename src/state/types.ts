import { Record } from "../types";
import { MouseEventHandler } from "react";

export type RecordState = {
  recordData: Record[];
  loading: boolean;
  newRecord: null | {} | Record;
  recordBeingEdited: null | string;
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
  TOGGLE_RECORD_EDIT = "TOGGLE_RECORD_EDIT",
  UPDATE_RECORD = "UPDATE_RECORD",
  REMOVE_RECORD = "REMOVE_RECORD",
  START_CREATE_NEW = "START_CREATE_NEW",
  CANCEL_CREATE = "CANCEL_CREATE",
  SAVE_NEW_RECORD = "SAVE_NEW_RECORD",
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
    }
  | { type: RecordActionList.START_CREATE_NEW }
  | { type: RecordActionList.TOGGLE_RECORD_EDIT; payload: string | null }
  | { type: RecordActionList.CANCEL_CREATE }
  | { type: RecordActionList.SAVE_NEW_RECORD; payload: Record };
