import React from 'react';

import { Vote, Choice } from '../types';
import VoteList from './VoteList';
import InactiveVoteComposer from './InactiveVoteComposer';
import VoteComposer from './VoteComposer';

type VoteControllerState = Readonly<{
  allVotes: ReadonlyArray<Vote>;
  currentVoteId: string | null;
  voteComposerActive: boolean;
}>;

type SetCurrentVoteAction = Readonly<{
  type: 'SET_CURRENT_VOTE';
  vote: Vote;
}>;

type UnsetCurrentVoteAction = Readonly<{
  type: 'UNSET_CURRENT_VOTE';
}>;

type CloseVoteAction = Readonly<{
  type: 'CLOSE_VOTE_COMPOSER';
}>;

type OpenVoteAction = Readonly<{
  type: 'OPEN_VOTE_COMPOSER';
}>;

type AddVoteAction = Readonly<{
  type: 'ADD_VOTE';
  vote: Vote;
}>;

type RegisterVoteAction = Readonly<{
  type: 'REGISTER_VOTE';
  vote: Vote;
  choice: Choice;
}>;

type VoteControllerAction =
  | SetCurrentVoteAction
  | UnsetCurrentVoteAction
  | CloseVoteAction
  | OpenVoteAction
  | AddVoteAction
  | RegisterVoteAction;

function voteControllerReducer(
  state: VoteControllerState,
  action: VoteControllerAction
): VoteControllerState {
  switch (action.type) {
    case 'SET_CURRENT_VOTE':
      return { ...state, currentVoteId: action.vote.id, voteComposerActive: false };
    case 'UNSET_CURRENT_VOTE':
      return { ...state, currentVoteId: null };
    case 'CLOSE_VOTE_COMPOSER':
      return { ...state, voteComposerActive: false };
    case 'OPEN_VOTE_COMPOSER':
      return { ...state, currentVoteId: null, voteComposerActive: true };
    case 'ADD_VOTE':
      return { ...state, allVotes: [...state.allVotes, action.vote], voteComposerActive: false };
    case 'REGISTER_VOTE':
      const { vote, choice } = action;
      const allVotes = state.allVotes.map((v) =>
        v.id !== vote.id
          ? v
          : {
              ...vote,
              choices: vote.choices.map((c) =>
                c.id !== choice.id ? c : { ...c, count: c.count + 1 }
              ),
            }
      );
      return { ...state, allVotes };
    default:
      return state;
  }
}

type VoteControllerProps = Readonly<{
  initialVotes: ReadonlyArray<Vote>;
}>;

export default function VoteController({ initialVotes }: VoteControllerProps) {
  const [state, dispatch] = React.useReducer(voteControllerReducer, {
    allVotes: initialVotes,
    currentVoteId: null,
    voteComposerActive: false,
  });
  const { allVotes, currentVoteId, voteComposerActive } = state;

  function setCurrentVote(vote: Vote) {
    dispatch({ type: 'SET_CURRENT_VOTE', vote });
  }

  function unsetCurrentVote() {
    dispatch({ type: 'UNSET_CURRENT_VOTE' });
  }

  function openVoteComposer() {
    dispatch({ type: 'OPEN_VOTE_COMPOSER' });
  }

  function closeVoteComposer() {
    dispatch({ type: 'CLOSE_VOTE_COMPOSER' });
  }

  function registerVote(vote: Vote, choice: Choice) {
    dispatch({ type: 'REGISTER_VOTE', vote, choice });
  }

  function addVote(vote: Vote) {
    dispatch({ type: 'ADD_VOTE', vote });
  }

  return (
    <div>
      <VoteList
        allVotes={allVotes}
        currentVoteId={currentVoteId}
        onSelectVote={setCurrentVote}
        onDismissVote={unsetCurrentVote}
        onRegisterVote={registerVote}
      />
      {voteComposerActive ? (
        <VoteComposer onSave={addVote} onDeactivate={closeVoteComposer} />
      ) : (
        <InactiveVoteComposer onActivate={openVoteComposer} />
      )}
    </div>
  );
}
