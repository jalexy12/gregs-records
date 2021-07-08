import React from "react";

export default function RecordList({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className="RecordList">{children}</div>;
}
