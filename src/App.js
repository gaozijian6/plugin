import React, { useMemo, useState,useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [isBlockquote, setIsBlockquote] = useState(false);

  const renderElement = useCallback((props) => {
    return isBlockquote ? <BlockquoteElement {...props} /> : <ParagraphElement {...props} />;
  }, [isBlockquote]);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <div>
        <button onClick={() => setIsBlockquote(!isBlockquote)}>
          {isBlockquote ? '切换为段落' : '切换为引用'}
        </button>
      </div>
      <Editable renderElement={renderElement} />
    </Slate>
  );
};

const BlockquoteElement = ({ attributes, children }) => (
  <blockquote {...attributes}>{children}</blockquote>
);

const ParagraphElement = ({ attributes, children }) => (
  <p {...attributes}>{children}</p>
);

export default App;
