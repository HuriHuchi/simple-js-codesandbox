import { forwardRef } from 'react'
import { useEditorStore } from '../store'
import Badge from './ui/Badge'

function updateIframe() {
  return /*html*/ `
  <html>
    <head>
      <link rel="stylesheet" href="/iframe.css">
      <script type='module'>
        window.addEventListener('message', (event) => {
          const {type, value} = event.data

          if (type === 'html') {
            document.body.innerHTML = value
          }

          if (type === 'css') {
            const styleElement = document.createElement('style')
            styleElement.textContent = value
            document.head.appendChild(styleElement)
          }

          if (type === 'javascript') {
            const scriptElement = document.createElement('script')
            scriptElement.textContent = value
            document.head.appendChild(scriptElement)
          }
        })
      </script>
    </head>
    <body>
      <div id='app'></div>
    </body>
  </html>
  `
}

interface Props {
  errorMessage: string
}

const Output = forwardRef<HTMLIFrameElement, Props>(({ errorMessage }, ref) => {
  const editorState = useEditorStore((s) => s.state)
  return (
    <div className='flex-1'>
      {editorState === 'error' ? (
        <div className='p-4'>
          <Badge>❗️ Error</Badge>
          <pre className='text-red-500'>{errorMessage}</pre>
        </div>
      ) : (
        <iframe ref={ref} className='w-full h-full' srcDoc={updateIframe()}></iframe>
      )}
    </div>
  )
})

export default Output
