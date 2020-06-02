import React from 'react';

type ChoiceBarProps = Readonly<{
  title: string;
  percent: number;
}>;

export default function ChoiceBar({ title, percent }: ChoiceBarProps) {
  const [count, setCount] = React.useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="ChoiceBar" onClick={handleClick}>
      <div className="Progress" style={{ width: percent + '%' }}>
        <div className="ChoiceBarTitle">{title}</div>
      </div>
      <div className="ChoiceBarBadge">{count}</div>
    </div>
  );
}
