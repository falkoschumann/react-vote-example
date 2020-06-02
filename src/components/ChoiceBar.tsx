import React from 'react';

type ChoiceBarProps = Readonly<{
  title: string;
  percent: number;
}>;

export default function ChoiceBar({ title, percent }: ChoiceBarProps) {
  return (
    <div className="ChoiceBar">
      <div className="Progress" style={{ width: percent + '%' }}>
        <div className="ChoiceBarTitle">{title}</div>
      </div>
      <div className="ChoiceBarBadge">123</div>
    </div>
  );
}
