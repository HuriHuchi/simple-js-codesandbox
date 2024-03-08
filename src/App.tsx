import { useEffect, useRef, useState } from 'react'
import Editor from './components/Editor'
import Output from './components/Output'
import Soruce from './components/Soruce'
import { useEditorStore } from './store'

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [resizeMode, setResizeMode] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const { updateEditorState } = useEditorStore((s) => s.actions)

  useEffect(() => {
    const handleResize = (e) => {
      if (containerRef?.current) {
        containerRef.current.style.width = `${e.clientX}px`
      }
    }

    if (resizeMode) {
      document.addEventListener('mousemove', handleResize)
      return () => {
        document.removeEventListener('mousemove', handleResize)
      }
    }
  }, [resizeMode])

  useEffect(() => {
    const handleError = ({ error }: ErrorEvent) => {
      updateEditorState('error')
      setErrorMessage(error.message)
    }
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [updateEditorState])

  return (
    <div className='min-h-dvh flex bg-stone-800'>
      <Editor ref={containerRef} iframeRef={iframeRef} />
      <div
        className='cursor-col-resize h-screen w-2 bg-stone-700 hover:bg-stone-600 transition'
        onMouseDown={() => setResizeMode(true)}
        onMouseUp={() => setResizeMode(false)}></div>
      <div className='flex-1 flex flex-col'>
        <Output ref={iframeRef} errorMessage={errorMessage} />
        <Soruce />
      </div>
    </div>
  )
}

export default App
