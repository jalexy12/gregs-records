import { ChangeEventHandler, MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

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
      <button className="icon-button red" type="button" onClick={handleClear}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
    </div>
  );
}
