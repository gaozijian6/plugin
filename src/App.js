import React, { useCallback, useMemo } from 'react'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import './App.css'


const App = () => {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={editor} initialValue={initialValue}>
        <BlockButton format="block-quote" />
      <Editable renderElement={renderElement} />
    </Slate>
  )
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
  )

  let newProperties = {
      type: isActive ? 'paragraph':format,
    }
  Transforms.setNodes(editor, newProperties)

}

const isBlockActive = (editor, format) => {
  const { selection } = editor
  if (!selection) return false
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === format,
    })
  )
  return !!match
}

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const BlockButton = ({ format}) => {
  const editor = useSlate()
  return (
    <button
      className={isBlockActive(
        editor,
        format,
      )? 'active' : ''}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {format}
    </button>
  )
}

const initialValue = [
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'A line of text' }],
  },
]

export default App

