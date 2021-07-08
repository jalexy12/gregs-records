import React from "react";

export default function RecordListFooter({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className="RecordList_footer">{children}</div>;
}
