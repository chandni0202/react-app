import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from './dashboard.jsx';

//snapshot test case to check page renders correctly
// run npm test -- -u if do any changes in page view
it('renders correctly', () => {
  const tree = renderer
    .create(<Dashboard/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});