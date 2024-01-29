import { ChangeEvent } from 'react'
import { useDebounce } from '@toss/react'
import { transplieCode } from '../utils/transpile'
import { useEditorStore } from '../store'

interface Props {
  iframeRef: React.RefObject<HTMLIFrameElement>
}

const Editor = ({ iframeRef }: Props) => {
  const { updateSourceCode, updateEditorState } = useEditorStore((store) => store.actions)

  const handleChange = (type: string) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    // refresh state
    updateEditorState('editing')

    if (iframeRef?.current) {
      let value = e.target.value

      if (type === 'javascript') {
        const { iframeCode, sourceCode } = transplieCode(value)
        value = iframeCode
        updateSourceCode(sourceCode)
      }

      const payload = { type, value }
      iframeRef.current.contentWindow?.postMessage(payload, '*')
    }
  }

  return (
    <div className='flex-1 border-r border-stone-600 p-4 flex flex-col gap-8'>
      <EditorItem type='html' handleChange={useDebounce(handleChange('html'), 500)} />
      <EditorItem type='css' handleChange={useDebounce(handleChange('css'), 500)} />
      <EditorItem type='javascript' handleChange={useDebounce(handleChange('javascript'), 500)} />
    </div>
  )
}

interface EditorItemProps {
  type: string
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const EditorItem = ({ type, handleChange }: EditorItemProps) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={`${type}-editor`} className='text-white text-xl'>
        {type}
      </label>
      <textarea
        name={`${type}-editor`}
        onChange={handleChange}
        className='bg-stone-700 text-white h-[200px]'
      />
    </div>
  )
}

export default Editor
