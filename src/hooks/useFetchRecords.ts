import { useEffect } from "react";
import { getRecords } from "../api";
import processRecords from "../helpers/processRecords";

export default function useFetchRecords({
  page,
  onLoad,
  toggleLoadOn,
}: {
  page: number;
  onLoad: Function;
  toggleLoadOn: Function;
}): void {
  useEffect(() => {
    async function fetchRecords() {
      toggleLoadOn();

      const response = await getRecords(page);

      const processedRecords = processRecords(response.results);

      onLoad(processedRecords);
    }

    fetchRecords();
  }, [page]);
}
