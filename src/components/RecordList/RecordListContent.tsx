import React from "react";

export default function RecordListContent({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}): JSX.Element {
  return (
    <div className="RecordList_content">
      {loading ? "Loading..." : children}
    </div>
  );
}
