import { useCallback, useRef, useState } from 'react'
import Editor from './components/Editor'
import Output from './components/Output'
import Soruce from './components/Soruce'
import { useEditorActions } from './store/editor'
import { useHandleGlobalError } from './hooks/useHandleGlobalError'
import Resizer from './components/Resizer'

function App() {
  // refs
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  // states
  const [errorMessage, setErrorMessage] = useState('')

  const { updateEditorState } = useEditorActions()

  const onError = useCallback(
    ({ error }: ErrorEvent) => {
      updateEditorState('error')
      setErrorMessage(error?.message)
    },
    [updateEditorState],
  )

  // handle global error
  useHandleGlobalError({ onError })

  return (
    <div className='min-h-dvh flex bg-stone-800'>
      <Editor ref={editorRef} iframeRef={iframeRef} />
      <Resizer resizeElementRef={editorRef} />
      <div className='flex-1 flex flex-col'>
        <Output ref={iframeRef} errorMessage={errorMessage} />
        <Soruce />
      </div>
    </div>
  )
}

export default App
