import React from 'react';

type ErrorMessageProps = Readonly<{
  msg: string;
  onRetry: () => void;
}>;

export default function ErrorMessage({ msg, onRetry }: ErrorMessageProps) {
  return (
    <div className="Row VotesRow">
      <div className="Head">
        <h1 className="Title">An error occured!</h1>
      </div>
      <div className="Body">{msg}</div>
      <div className="Buttonbar">
        <button className="Button" onClick={onRetry}>
          Try again
        </button>
      </div>
    </div>
  );
}
