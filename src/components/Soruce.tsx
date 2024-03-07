import { useEditorStore } from '../store'
import Badge from './ui/Badge'

const Soruce = () => {
  const sourceCode = useEditorStore((s) => s.sourceCode)
  return (
    <section className='flex-1 p-4'>
      <Badge>Source</Badge>
      <pre className='whitespace-pre-wrap'>{sourceCode}</pre>
    </section>
  )
}

export default Soruce
