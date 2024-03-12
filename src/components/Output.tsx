import { forwardRef } from 'react'
import { useEditorActions, useEditorState } from '../store/editor'
import Badge from './ui/Badge'

const iframeSrc = /*html*/ `
  <html>
    <head>
      <link rel="stylesheet" href="/iframe.css">
      <script type='module'>
        window.addEventListener('message', (event) => {
          const {value} = event.data
          const scriptElement = document.createElement('script')
          scriptElement.type = 'module'
          scriptElement.textContent = value
          document.body.appendChild(scriptElement)
        })
      </script>
    </head>
    <body>
      <div id='app'></div>
    </body>
  </html>
  `

interface Props {
  errorMessage: string
}

const Output = forwardRef<HTMLIFrameElement, Props>(({ errorMessage }, ref) => {
  const editorState = useEditorState()
  const { onIframeLoad } = useEditorActions()

  return (
    <div className='flex-1'>
      {editorState === 'error' ? (
        <div className='p-4'>
          <Badge>❗️ Error</Badge>
          <pre className='text-red-500'>{errorMessage}</pre>
        </div>
      ) : (
        <iframe
          onLoad={onIframeLoad}
          ref={ref}
          className='w-full h-full'
          srcDoc={iframeSrc}></iframe>
      )}
    </div>
  )
})

export default Output
