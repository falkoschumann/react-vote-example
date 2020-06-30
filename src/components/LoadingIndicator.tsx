import React from 'react';

type LoadingIndicatorProps = Readonly<{
  title?: string | null;
}>;

export default function LoadingIndicator({ title }: LoadingIndicatorProps) {
  return (
    <div className="Row VotingRow">
      <div className="Head">
        <h1 className="Title">{title}</h1>
        <div className="Spinner">
          <div className="bounce bounce1" />
          <div className="bounce bounce2" />
          <div className="bounce bounce3" />
        </div>
      </div>
    </div>
  );
}
