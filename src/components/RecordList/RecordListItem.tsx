import { RecordCondition } from "../../types";
import useManageLocalEdit from "../../hooks/useManageLocalEdit";
import "./styles.css";

interface Props {
  title: string;
  year: number;
  condition: RecordCondition;
  artistName: string;
  artistId: number;
  onRecordSave: Function;
}

export default function RecordListItem({
  title,
  year,
  condition,
  artistName,
  artistId,
  onRecordSave,
}: Props): JSX.Element {
  const { handleChange, unsavedData, save, toggleEdit, isEditing } =
    useManageLocalEdit({
      defaultData: {
        albumTitle: title,
        year,
        condition,
        artist: {
          name: artistName,
          id: artistId,
        },
      },
      onSave: onRecordSave,
    });

  return (
    <div className="RecordList_item">
      {isEditing ? (
        <>
          <div className="input-container">
            <input
              type="text"
              onChange={handleChange("albumTitle")}
              value={unsavedData.albumTitle}
            />
          </div>
          <div className="input-container">
            <input
              type="number"
              onChange={handleChange("year")}
              value={unsavedData.year}
            />
          </div>
          <div className="input-container">
            <select
              value={unsavedData.condition}
              onChange={handleChange("condition")}
            >
              {Object.keys(RecordCondition)
                .filter((conditionKey) => isNaN(Number(conditionKey)))
                .map((conditionName) => (
                  <option key={conditionName} value={conditionName}>
                    {conditionName}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-container">
            <input
              type="text"
              onChange={handleChange("artist.name")}
              value={unsavedData.artist.name}
            />
          </div>

          <button type="button" onClick={save}>
            Save
          </button>
          <button type="button" onClick={toggleEdit}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span>{title}</span>
          <span>{year}</span>
          <span>{condition}</span>
          <span>{artistName}</span>
          <button type="button" onClick={toggleEdit}>
            Edit
          </button>
        </>
      )}
    </div>
  );
}
