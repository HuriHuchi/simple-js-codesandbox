import { ChangeEvent } from 'react'

interface Props {
  iframeRef: React.RefObject<HTMLIFrameElement>
}

const Editor = ({ iframeRef }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (iframeRef?.current) {
      const value = e.target.value
      const html = { type: 'html', value }
      iframeRef.current.contentWindow?.postMessage(html, '*')
    }
  }
  return (
    <div className='flex-1 border-r border-stone-600'>
      <textarea
        name='editor'
        onChange={handleChange}
        className='bg-stone-800 w-full h-full text-white outline-none'
      />
    </div>
  )
}

export default Editor