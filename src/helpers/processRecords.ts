import { RecordResponse, Record } from "../types";

export default function processRecords(
  responseRecords: RecordResponse[]
): Record[] {
  return responseRecords.map((record: RecordResponse) => {
    const { album_title, ...otherProps } = record;

    return {
      ...otherProps,
      albumTitle: album_title,
    };
  });
}
