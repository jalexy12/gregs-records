import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useState,
} from "react";

interface BasicSearchState {
  searchValue: string;
  handleSearchChange: ChangeEventHandler;
  handleSearchClear: MouseEventHandler;
  filterResults: Function;
}

export default function useBasicSearch(): BasicSearchState {
  const [searchValue, setSearchValue] = useState<string>("");

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function handleSearchClear() {
    setSearchValue("");
  }

  function filterResults(data: any) {
    if (!data || data.length === 0) {
      return data;
    }

    const sampleItem = data[0];
    const keys = Object.keys(sampleItem);

    return data.filter((dataItem: any) => {
      return (
        keys.filter((key) => String(dataItem[key]).includes(searchValue))
          .length > 0
      );
    });
  }

  return {
    searchValue,
    handleSearchChange,
    handleSearchClear,
    filterResults,
  };
}
