import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import InterviewCard from '@/components/InterviewCard'
import { get } from 'http'
import { getLatestInterviews, getInterviewsByUserId} from '@/lib/actions/general.action'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { SparklesText } from "@/components/magicui/sparkles-text";
//import { TypingAnimation } from "@/components/magicui/typing-animation";
//import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { ShineBorder } from "@/components/magicui/shine-border";
const page = async() => {
  const user=await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! })
  ]);
 
  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcpomingInterviews = latestInterviews?.length > 0;
  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
      <SparklesText className='text-2xl'>InterView-Ready with AI Powered Practice</SparklesText>
      {/* <TypingAnimation className='text-4xl font-bold' startOnView={true} duration={50} delay={500}> */}
        {/* Practice on real Interview questions & get instant Feedback
        </TypingAnimation>
        */}
        <p className='text-lg'>Practice on real Interview questions & get instant Feedback</p>
      <button asChild className='btn-primary max-sm:w-full '>
        <Link
        href='/interview'>Start an Interview</Link>
      </button>

      </div>
      <Image className='max-sm:hidden' src="/robot.png" alt="robot" width={400} height={400}></Image>
    </section>
    <section className='flex flex-col gap-6 mt-7'>
<h2>Your Interviews</h2>
<div className='interviews-section'> 
  
{hasPastInterviews?(userInterviews?.map((interview) => (
   <InterviewCard {...interview} key={interview.id}/>
))):(
<p>You haven't taken any Interview Yet</p>

)
}
</div>
</section>
<section className='flex flex-col gap-6 mt-7'>
  <h2>Take an Interview</h2>
  <div className='interviews-section'>
   {hasUpcpomingInterviews?(latestInterviews?.map((interview) => (
   <InterviewCard {...interview} key={interview.id}/>
))):(
<p>There are no Interviews available</p>

)
}
{/* <p>You Haven't taken any Interview Yet</p> */}
  </div>

    </section>
    </>
  )
}

export default page