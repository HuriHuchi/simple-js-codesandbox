import { useEditorStore } from '../store'
import Badge from './ui/Badge'

const Soruce = () => {
  const sourceCode = useEditorStore((s) => s.sourceCode)
  return (
    <div className='flex-1 p-4'>
      <Badge>Source</Badge>
      <pre>{sourceCode}</pre>
    </div>
  )
}

export default Soruce
