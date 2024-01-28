import Editor from './components/Editor'
import Output from './components/Output'
import Soruce from './components/Soruce'

function App() {
  return (
    <div className='w-full min-h-dvh flex bg-stone-800'>
      <Editor />
      <div className='flex-1 flex flex-col'>
        <Output />
        <Soruce />
      </div>
    </div>
  )
}

export default App
