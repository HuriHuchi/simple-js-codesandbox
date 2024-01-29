import { useRef } from 'react'
import Editor from './components/Editor'
import Output from './components/Output'
import Soruce from './components/Soruce'

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  return (
    <div className='w-full min-h-dvh flex bg-stone-800'>
      <Editor iframeRef={iframeRef} />
      <div className='flex-1 flex flex-col'>
        <Output ref={iframeRef} />
        <Soruce />
      </div>
    </div>
  )
}

export default App
