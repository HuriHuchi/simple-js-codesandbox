const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='absolute right-[20px] bg-orange-200 text-stone-900 px-4 py-2 rounded-lg font-bold'>
      {children}
    </div>
  )
}

export default Badge
