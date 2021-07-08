import { RecordResponse, Record } from "../types";

export default function processRecords(
  responseRecords: RecordResponse[]
): Record[] {
  return responseRecords.map((record: RecordResponse) => {
    const { album_title, ...otherProps } = record;
    const { id, name } = otherProps.artist;
    const possibleNewName = localStorage.getItem(`artistId:${id}`);

    return {
      ...otherProps,
      albumTitle: album_title,
      artist: {
        id,
        name: possibleNewName ? possibleNewName : name,
      },
    };
  });
}
