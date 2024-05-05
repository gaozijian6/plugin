// 文件路径: src/App.js
import React, { useMemo, useCallback } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { BlockquoteButton, Element } from './BlockquotePlugin';
import './App.css'

const App = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback(props => <Element {...props} />, []);

  const initialValue = [
    { type: 'paragraph', children: [{ text: 'A line of text.' }] },
    { type: 'blockquote', children: [{ text: 'A wise quote.' }] }
  ];

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <BlockquoteButton />
      <Editable renderElement={renderElement} />
    </Slate>
  );
};

export default App;
