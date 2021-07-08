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
}

export type RecordAction =
  | { type: RecordActionList.SET_LOADING; payload: boolean }
  | { type: RecordActionList.RECORDS_LOADED; payload: Record[] };