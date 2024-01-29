import { forwardRef } from 'react'

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
    </body>
  </html>
  `
}

const Output = forwardRef<HTMLIFrameElement>((_, ref) => {
  return (
    <div className='flex-1'>
      <iframe ref={ref} className='w-full h-full' srcDoc={updateIframe()}></iframe>
    </div>
  )
})

export default Output
