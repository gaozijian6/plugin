// 文件路径: src/BlockquotePlugin.js
import React from 'react';
import { useSlate, ReactEditor } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';

// 菜单组件
const BlockquoteButton = () => {
  const editor = useSlate();

  return (
    <button
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, 'blockquote');
      }}
    >
      Blockquote
    </button>
  );
};

// 切换blockquote和paragraph
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  console.log(isActive);
  Transforms.setNodes(
    editor,
    { type: isActive ? 'paragraph' : format },
  );
};

// 检查当前是否是blockquote
const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });
  return !!match;
};

// 渲染元素
const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'blockquote':
      return <blockquote {...attributes}>{children}</blockquote>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export { BlockquoteButton, Element };
