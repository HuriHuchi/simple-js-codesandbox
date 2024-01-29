import { ChangeEvent } from 'react'
import { useDebounce } from '@toss/react'

interface Props {
  iframeRef: React.RefObject<HTMLIFrameElement>
}

const Editor = ({ iframeRef }: Props) => {
  const handleChange = useDebounce((e: ChangeEvent<HTMLTextAreaElement>) => {
    if (iframeRef?.current) {
      const value = e.target.value
      const html = { type: 'html', value }
      iframeRef.current.contentWindow?.postMessage(html, '*')
    }
  }, 500)

  return (
    <div className='flex-1 border-r border-stone-600 p-4'>
      <textarea
        name='editor'
        onChange={handleChange}
        className='bg-stone-800 w-full h-full text-white outline-none'
      />
    </div>
  )
}

export default Editor
