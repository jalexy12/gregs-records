import React from "react";

export default function RecordListContent({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className="RecordList_content">{children}</div>;
}
