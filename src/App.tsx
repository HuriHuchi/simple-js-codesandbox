import { useCallback, useRef, useState } from 'react'
import Editor from './components/Editor'
import Output from './components/Output'
import Soruce from './components/Soruce'
import { useEditorActions } from './store/editor'
import { usePaneResize } from './hooks/usePaneResize'
import { useHandleError } from './hooks/useHandleError'
import Resizer from './components/Resizer'

function App() {
  // refs
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // states
  const [errorMessage, setErrorMessage] = useState('')

  const { updateEditorState } = useEditorActions()
  const { activateResizeMode } = usePaneResize({ elementRef: containerRef })

  const onError = useCallback(
    ({ error }: ErrorEvent) => {
      updateEditorState('error')
      setErrorMessage(error?.message)
    },
    [updateEditorState],
  )

  // handle global error
  useHandleError({ onError })

  return (
    <div className='min-h-dvh flex bg-stone-800'>
      <Editor ref={containerRef} iframeRef={iframeRef} />
      <Resizer
        onMouseDown={(e) => {
          e.preventDefault()
          activateResizeMode()
        }}
      />
      <div className='flex-1 flex flex-col'>
        <Output ref={iframeRef} errorMessage={errorMessage} />
        <Soruce />
      </div>
    </div>
  )
}

export default App
