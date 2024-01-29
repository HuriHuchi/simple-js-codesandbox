import { useEffect, useRef, useState } from 'react'
import Editor from './components/Editor'
import Output from './components/Output'
import Soruce from './components/Soruce'
import { useEditorStore } from './store'

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const { updateEditorState } = useEditorStore((s) => s.actions)

  useEffect(() => {
    const handleError = ({ error }: ErrorEvent) => {
      updateEditorState('error')
      setErrorMessage(error.message)
    }
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [updateEditorState])

  return (
    <div className='w-full min-h-dvh flex bg-stone-800'>
      <Editor iframeRef={iframeRef} />
      <div className='flex-1 flex flex-col'>
        <Output ref={iframeRef} errorMessage={errorMessage} />
        <Soruce />
      </div>
    </div>
  )
}

export default App
