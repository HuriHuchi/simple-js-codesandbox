import { transplieCode } from '../utils/transpile'
import { useEditorStore } from '../store'
import MonacoEditor from '@monaco-editor/react'
import { useDebounce } from '@toss/react'
import { forwardRef } from 'react'

interface Props {
  iframeRef: React.RefObject<HTMLIFrameElement>
}

const editorCode = /* html */ `
import React, { useEffect } from 'https://cdn.skypack.dev/react'
import { render } from 'https://cdn.skypack.dev/react-dom'

import confetti from 'https://cdn.skypack.dev/canvas-confetti'

function App() {
  useEffect(() => confetti(), [])

  return (
    <div className="app">
      <h1>JavaScript Sandbox</h1>
      <p>
        You can use NPM packages provided by {''}
        <a href="https://www.skypack.dev/">Skypack</a>.
      </p>
      <img src="/image.gif" />
    </div>
  )
}

render(
  <App />,
  document.getElementById('app')
)`.trim()

const Editor = forwardRef<HTMLDivElement, Props>(({ iframeRef }, ref) => {
  const { updateSourceCode, updateEditorState } = useEditorStore((store) => store.actions)

  const handleEditorChange = (value: string | undefined) => {
    updateEditorState('editing')

    if (iframeRef?.current && value) {
      const { iframeCode, sourceCode } = transplieCode(value)

      updateSourceCode(sourceCode)
      const payload = { type: 'javascript', value: iframeCode }
      iframeRef.current.contentWindow?.postMessage(payload, '*')
    }
  }

  return (
    <div ref={ref} className='border-r border-stone-600 p-4 flex flex-col gap-8 w-1/2 resize-x'>
      <MonacoEditor
        height='100%'
        defaultLanguage='javascript'
        defaultValue={editorCode}
        theme='vs-dark'
        onChange={useDebounce(handleEditorChange, 500)}
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 16,
          tabSize: 2,
          matchBrackets: 'always',
        }}
      />
    </div>
  )
})

export default Editor
