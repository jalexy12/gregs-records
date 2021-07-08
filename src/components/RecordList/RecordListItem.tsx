import { Record } from "../../types";
import "./styles.css";
import RecordForm from "../RecordForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Props {
  record: Record;
  onRecordSave: Function;
  onRecordRemove: Function;
  toggleEdit: Function;
  isEditing: boolean;
}

export default function RecordListItem({
  record,
  onRecordSave,
  onRecordRemove,
  toggleEdit,
  isEditing,
}: Props): JSX.Element {
  const {
    albumTitle,
    year,
    condition,
    artist: { name: artistName },
  } = record;

  return (
    <div className="RecordList_item">
      {isEditing ? (
        <RecordForm
          recordData={record}
          onSave={onRecordSave}
          onCancel={() => toggleEdit(null)}
        />
      ) : (
        <>
          <span>{albumTitle}</span>
          <span>{year}</span>
          <span>{condition}</span>
          <span>{artistName}</span>
          <button
            className="icon-button green"
            type="button"
            onClick={() => toggleEdit(albumTitle)}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button
            className="icon-button red"
            type="button"
            onClick={() => onRecordRemove(albumTitle)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      )}
    </div>
  );
}
