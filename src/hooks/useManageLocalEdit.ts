import React, { useState } from "react";

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
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setData((currentData: any) => ({
        ...currentData,
        [fieldName]: e.target?.value,
      }));
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
