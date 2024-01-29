import { useEditorStore } from '../store'

const Soruce = () => {
  const sourceCode = useEditorStore((s) => s.sourceCode)
  return (
    <div className='flex-1 p-4'>
      <span className='absolute right-[20px] bg-orange-200 text-stone-900 px-4 py-2 rounded-lg font-bold'>
        Source
      </span>
      <pre>{sourceCode}</pre>
    </div>
  )
}

export default Soruce
