import React from "react";

export default function RecordListHeader({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className="RecordList_header">{children}</div>;
}
