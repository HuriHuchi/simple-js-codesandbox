import { HTMLAttributes } from 'react'

interface Props {
  onMouseDown: HTMLAttributes<HTMLDivElement>['onMouseDown']
}

const Resizer = ({ onMouseDown }: Props) => {
  return (
    <div
      className='cursor-col-resize h-screen w-2 bg-stone-700 hover:bg-stone-600 transition'
      onMouseDown={onMouseDown}
    />
  )
}

export default Resizer
