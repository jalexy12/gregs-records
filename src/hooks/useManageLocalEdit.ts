import React, { ChangeEventHandler, useState } from "react";

export default function useManageLocalEdit({
  defaultData,
  onSave,
}: {
  defaultData: any;
  onSave: Function;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(() => defaultData);

  function handleChange(fieldName: string) {
    return (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) =>
      setData((currentData: any) => {
        const [fieldKey, subFieldKey] = fieldName.split(".");
        const isNested = !!subFieldKey;

        if (isNested) {
          return {
            ...currentData,
            [fieldKey]: {
              ...currentData[fieldKey],
              [subFieldKey]: e.target?.value,
            },
          };
        } else {
          return {
            ...currentData,
            [fieldName]: e.target?.value,
          };
        }
      });
  }

  function toggleEdit() {
    if (isEditing) {
      setData(defaultData);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }

  function save() {
    onSave(data);
    setIsEditing(false);
  }

  return {
    handleChange,
    unsavedData: data,
    save,
    toggleEdit,
    isEditing,
  };
}
