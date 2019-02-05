import React from 'react';
import ReactDOM from 'react-dom';
import { PropViewer } from './PropViewer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PropViewer test='test 1' />, div);
  ReactDOM.unmountComponentAtNode(div);
});
