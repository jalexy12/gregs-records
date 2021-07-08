import { RecordCondition } from "../../types";
import useManageLocalEdit from "../../hooks/useManageLocalEdit";

interface Props {
  recordData: any;
  onSave: Function;
  onCancel: Function;
}

export default function RecordForm({
  recordData,
  onSave,
  onCancel,
}: Props): JSX.Element {
  const { handleChange, unsavedData } = useManageLocalEdit({
    defaultData: recordData,
  });

  return (
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

      <button type="button" onClick={(e) => onSave(unsavedData)}>
        Save
      </button>
      <button type="button" onClick={(e) => onCancel()}>
        Cancel
      </button>
    </>
  );
}
