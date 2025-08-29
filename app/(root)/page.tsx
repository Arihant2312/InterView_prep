import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import InterviewCard from '@/components/InterviewCard'
import { getLatestInterviews, getInterviewsByUserId } from '@/lib/actions/general.action'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { SparklesText } from "@/components/magicui/sparkles-text";
import HeroSection from '@/components/hero-section'

const Page = async () => {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! })
  ]);

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;

  return (
    <>
   
    
      {/* <section>
       
      </section> */}
      <section>
        <HeroSection />
        <section className='card-cta'>
        
        <div className='flex flex-col gap-6 max-w-lg'>
          <SparklesText className='text-2xl'>
            InterView-Ready with AI Powered Practice
          </SparklesText>
          {/* <TypingAnimation className='text-4xl font-bold' startOnView={true} duration={50} delay={500}>
              Practice on real Interview questions & get instant Feedback
            </TypingAnimation>
          */}
          <p className='text-lg'>
            Practice on real Interview questions & get instant Feedback
          </p>
          <Link href='/interview' className='btn-primary max-sm:w-full'>
            Start an Interview
          </Link>
        </div>
        <Image
          className='max-sm:hidden'
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
        />
      </section>
      <section className='flex flex-col gap-6 mt-7'>
        <h2>Your Interviews</h2>
        <div className='interviews-section'>
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven't taken any Interview Yet</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-6 mt-7'>
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no Interviews available</p>
          )}
        </div>
      </section>
      </section>
      
    </>
  )
}

export default Page