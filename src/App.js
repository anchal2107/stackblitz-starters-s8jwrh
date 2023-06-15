import React from 'react';
import ReactDOM from 'react-dom';
import FileTree from './components/FileTree';

/* Changes made to this file will not affect your tests.
 * This file is used to control the behavior of the web preview.
 */

const root = {
  name: 'foo',
  type: 'dir',
  children: [
    {
      name: 'bar',
      type: 'dir',
      children: [
        {
          name: 'corge',
          type: 'file',
        },
      ],
    },
    {
      name: 'baz',
      type: 'dir',
      children: [
        {
          name: 'bar',
          type: 'file',
        },
      ],
    },
    {
      name: 'quux',
      type: 'file',
    },
    {
      name: 'grault',
      type: 'file',
    },
  ],
};

const App = (props) => (
  <div id="app">
    <FileTree root={root} />
  </div>
);

export default App;
