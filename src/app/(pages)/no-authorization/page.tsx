export default function page () {
  return (
    <div className='flex flex-col bg-white  items-center justify-center max-h-screen  max-w-screen  py-2'>
      <div className='relative flex flex-row justify-center w-full items-center px-4 py-2'>
        <h1 className='text-2xl font-bold'>No Authorization</h1>
      </div>
      <div className='flex flex-col gap-4 w-full p-4'>
        <p className='text-center'>
          You are not authorized to access this page
        </p>
      </div>
    </div>
  )
}
