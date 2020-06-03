import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import VoteController from './components/VoteController';
import App from './App';

const allVote = [
  {
    id: 'vote_1',
    title: 'How is your day?',
    description: 'Tell me: how has your day been so far?',
    choices: [
      { id: 'choice_1', title: 'Good', count: 7 },
      { id: 'choice_2', title: 'Bad', count: 12 },
      { id: 'choice_3', title: 'Not sure yet', count: 1 },
    ],
  },
  {
    id: 'vote_2',
    title: 'Programming languages',
    description: 'What is your preffered language?',
    choices: [
      { id: 'choice_1', title: 'JavaScript', count: 5 },
      { id: 'choice_2', title: 'Java', count: 9 },
      { id: 'choice_3', title: 'Plain englisch', count: 17 },
    ],
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App>
      <VoteController votes={allVote} />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
