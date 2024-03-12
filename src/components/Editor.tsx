import { transplieCode } from '../utils/transpile'
import { useEditorActions, useIframeLoaded } from '../store/editor'
import MonacoEditor from '@monaco-editor/react'
import { useDebounce } from '@toss/react'
import { forwardRef, useEffect } from 'react'

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
    </div>
  )
}

render(
  <App />,
  document.getElementById('app')
)`.trim()

interface Props {
  iframeRef: React.RefObject<HTMLIFrameElement>
}

type Payload = { value: string }

const Editor = forwardRef<HTMLDivElement, Props>(({ iframeRef }, ref) => {
  const { updateSourceCode, updateEditorState } = useEditorActions()
  const iframedLoaded = useIframeLoaded()

  const updateIframe = (payload: Payload) =>
    iframeRef.current?.contentWindow?.postMessage(payload, '*')

  const handleEditorChange = useDebounce((value: string | undefined) => {
    updateEditorState('editing')

    if (iframeRef?.current && value) {
      const { iframeCode, sourceCode } = transplieCode(value)
      updateSourceCode(sourceCode)
      updateIframe({ value: iframeCode })
    }
  }, 500)

  useEffect(() => {
    handleEditorChange(editorCode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref} className='border-r border-stone-600 p-4 flex flex-col gap-8 w-1/2 resize-x'>
      {iframedLoaded ? (
        <MonacoEditor
          height='100%'
          defaultLanguage='javascript'
          defaultValue={editorCode}
          theme='vs-dark'
          onChange={handleEditorChange}
          options={{
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 16,
            tabSize: 2,
            matchBrackets: 'always',
          }}
        />
      ) : null}
    </div>
  )
})

export default Editor
