import { ChangeEventHandler, MouseEventHandler } from "react";

interface Props {
  handleSearchChange: ChangeEventHandler;
  handleClear: MouseEventHandler;
  searchValue: string;
}

export default function SearchBar({
  handleSearchChange,
  handleClear,
  searchValue,
}: Props): JSX.Element {
  return (
    <div className="search-bar">
      <input type="text" onChange={handleSearchChange} value={searchValue} />
      <button type="button" onClick={handleClear}>
        Clear Search
      </button>
    </div>
  );
}
