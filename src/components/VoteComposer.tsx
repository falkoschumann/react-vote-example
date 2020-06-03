import React from 'react';

type VoteComposerProps = Readonly<{
  onDeactivate: () => void;
}>;

export default function VoteComposer({ onDeactivate }: VoteComposerProps) {
  const [voteTitle, setVoteTitle] = React.useState('');
  const [voteDescription, setVoteDescription] = React.useState('');

  return (
    <div className="Row VoteComposer Spacer">
      <div className="Head">
        <h1 className="Title">
          <input
            className="Title"
            autoFocus
            name="title"
            type="text"
            placeholder="What do you want to know ?"
            value={voteTitle}
            onChange={(e) => setVoteTitle(e.target.value)}
          />
        </h1>
        <input
          className="Description"
          name="description"
          type="text"
          placeholder="Describe your question on one sentence here"
          value={voteDescription}
          onChange={(e) => setVoteDescription(e.target.value)}
        />
      </div>
      <div className="ButtonBar">
        <button className="Button">Save</button>
        <button className="Button" onClick={onDeactivate}>
          Cancel
        </button>
      </div>
    </div>
  );
}
