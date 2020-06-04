import React from 'react';
import { render, fireEvent, wait, waitForElement } from '@testing-library/react';

import VoteListPage from '../VoteListPage';

const theVotes = [
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
    description: 'What is your preferred language?',
    choices: [
      { id: 'choice_1', title: 'JavaScript', count: 5 },
      { id: 'choice_2', title: 'Java', count: 9 },
      { id: 'choice_3', title: 'Plain english', count: 17 },
    ],
  },
];

afterEach(() => {
  jest.restoreAllMocks();
});

test('it loads data and renders', async () => {
  const fetchMock = jest
    .spyOn(window, 'fetch')
    .mockImplementationOnce(() => ({
      ok: () => true,
      json: () => theVotes,
    }))
    .mockImplementationOnce(() => ({
      ok: () => true,
      json: jest.fn(),
    }))
    .mockImplementationOnce(() => ({
      ok: () => true,
      json: () => theVotes,
    }));

  const { container, queryByText } = render(<VoteListPage />);
  const spinner = container.querySelector('.Spinner');
  expect(spinner).toBeInTheDocument();

  const vote = await waitForElement(() => queryByText('Programming languages'));
  expect(vote).toBeInTheDocument();

  expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/votes?slow', undefined);

  fireEvent.click(vote);
  fireEvent.click(queryByText('JavaScript'));
  await wait();

  expect(fetchMock).toHaveBeenCalledTimes(3);
});
