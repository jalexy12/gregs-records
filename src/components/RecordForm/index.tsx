import React from "react";
import { RecordCondition } from "../../types";
import useManageLocalEdit from "../../hooks/useManageLocalEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheck } from "@fortawesome/free-solid-svg-icons";

interface Props {
  recordData: any;
  onSave: Function;
  onCancel: Function;
  inputRef?: React.Ref<HTMLInputElement>;
}

export default function RecordForm({
  recordData,
  onSave,
  onCancel,
  inputRef,
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
          ref={inputRef}
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

      <button
        className="icon-button blue"
        type="button"
        onClick={() => onSave(unsavedData)}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button
        className="icon-button red"
        type="button"
        onClick={() => onCancel()}
      >
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
    </>
  );
}
