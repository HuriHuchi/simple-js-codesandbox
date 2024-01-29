import { ChangeEvent } from 'react'
import { useDebounce } from '@toss/react'

interface Props {
  iframeRef: React.RefObject<HTMLIFrameElement>
}

const Editor = ({ iframeRef }: Props) => {
  const handleChange = (type: string) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (iframeRef?.current) {
      const value = e.target.value
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
        className='bg-stone-700 text-white h-[360px]'
      />
    </div>
  )
}

export default Editor
