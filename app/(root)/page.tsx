import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'
const page = () => {
  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>InterView-Ready with AI Powered Practice</h2>
       
        <p className='text-lg'>Practice on real Interview questions & get instant Feedback</p>
      <button asChild className='btn-primary max-sm:w-full '>
        <Link
        href='/Interview'>Start an Interview</Link>
      </button>
      </div>
      <Image className='max-sm:hidden' src="/robot.png" alt="robot" width={400} height={400}></Image>
    </section>
    <section className='flex flex-col gap-6 mt-7'>
<h2>Your Interviews</h2>
<div className='interviews-section'> 
{dummyInterviews.map((interview) => (
  <InterviewCard {...interview} key={interview.id}/>
))}
</div>
</section>
<section className='flex flex-col gap-6 mt-7'>
  <h2>Take an Interview</h2>
  <div className='interviews-section'>
    {dummyInterviews.map((interview) => (
  <InterviewCard {...interview} key={interview.id}/>
))}
{/* <p>You Haven't taken any Interview Yet</p> */}
  </div>

    </section>
    </>
  )
}

export default page