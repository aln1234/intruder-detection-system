import Detection from '@/components/Detection'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex  min-h-screen flex-col items-center justify-between ">
      <div className='flex flex-col mt-6 gap-6'><Image src={"/images/banners.png"} width={500} height={500} className='rounded-lg object-contain' />
        <h1 className='text-2xl font-bold z-10 text-transparent duration-1000
         bg-white bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-center'>Real Time Intruder Detection System</h1>
        <Detection />
      </div>


    </main>
  )
}
