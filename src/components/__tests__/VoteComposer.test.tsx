import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import VoteComposer from '../VoteComposer';

test('VoteComposer should work', () => {
  const onSaveHandler = jest.fn();
  const { getByText, getByPlaceholderText } = render(<VoteComposer onSave={onSaveHandler} />);
  const titleInput = getByPlaceholderText('What do you want to know ?');
  const descriptionInput = getByPlaceholderText('Describe your question on one sentence here');

  fireEvent.change(titleInput, { target: { value: 'Does this work?' } });
  fireEvent.change(descriptionInput, { target: { value: 'Let me know...' } });
  fireEvent.change(getByPlaceholderText('Choice #1'), { target: { value: 'I think so' } });
  fireEvent.change(getByPlaceholderText('Choice #2'), { target: { value: 'Unsure yet' } });
  fireEvent.click(getByText('Save'));

  expect(onSaveHandler).toBeCalledWith({
    title: 'Does this work?',
    description: 'Let me know...',
    choices: [
      { title: 'I think so', count: 0 },
      { title: 'Unsure yet', count: 0 },
    ],
  });
});
