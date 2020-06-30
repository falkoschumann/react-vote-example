import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';

import ChoiceBar from '../ChoiceBar';

test('that it renders and button works', () => {
  const onClickHandler = jest.fn();
  const { getByText, container } = render(
    <ChoiceBar title="Hello" percent={33} count={123} onClickHandler={onClickHandler} />
  );

  const progress = container.querySelector('.Progress');
  expect(progress).toHaveStyle('width: 33%');

  expect(getByText('123')).toBeInTheDocument();

  fireEvent.click(getByText('Hello'));
  expect(onClickHandler).toHaveBeenCalled();
});

test('renders correctly (Snapshot Example)', () => {
  let tree: TestRenderer.ReactTestRenderer;

  TestRenderer.act(() => {
    tree = TestRenderer.create(<ChoiceBar title="Hello" percent={33} count={123} />);
  });

  expect(tree!.toJSON()).toMatchSnapshot();
});
