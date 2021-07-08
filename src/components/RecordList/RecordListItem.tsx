import { RecordCondition } from "../../types";
import "./styles.css";

interface Props {
  title: string;
  year: number;
  condition: RecordCondition;
  artistName: string;
  artistId: number;
}

export default function RecordListItem({
  title,
  year,
  condition,
  artistName,
  artistId,
}: Props): JSX.Element {
  return (
    <div className="RecordList_item">
      <span>{title}</span>
      <span>{year}</span>
      <span>{condition}</span>
      <span>{artistName}</span>
    </div>
  );
}
