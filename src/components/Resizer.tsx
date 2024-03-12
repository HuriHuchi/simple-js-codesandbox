import { RefObject } from 'react'
import { usePaneResize } from '../hooks/usePaneResize'

interface Props {
  resizeElementRef: RefObject<HTMLDivElement>
}

const Resizer = ({ resizeElementRef }: Props) => {
  const { activateResizeMode } = usePaneResize({ elementRef: resizeElementRef })
  return (
    <div
      className='cursor-col-resize h-screen w-2 bg-stone-700 hover:bg-stone-600 transition'
      onMouseDown={(e) => {
        e.preventDefault()
        activateResizeMode()
      }}
    />
  )
}

export default Resizer
