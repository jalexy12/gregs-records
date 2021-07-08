import React, { useState } from "react";

interface Props {
  defaultData: any;
}

interface LocalEditState {
  handleChange: Function;
  unsavedData: any;
}

export default function useManageLocalEdit({
  defaultData,
}: Props): LocalEditState {
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

  return {
    handleChange,
    unsavedData: data,
  };
}
