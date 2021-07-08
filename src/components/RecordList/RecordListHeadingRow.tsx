interface Props {
  titles: string[];
}

export default function RecordListHeadingRow({ titles }: Props): JSX.Element {
  return (
    <div className="RecordList_titles">
      {titles.map((title) => (
        <span>{title}</span>
      ))}
    </div>
  );
}
