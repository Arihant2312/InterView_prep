import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import InterviewCard from '@/components/InterviewCard'
import { getLatestInterviews, getInterviewsByUserId } from '@/lib/actions/general.action'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { SparklesText } from "@/components/magicui/sparkles-text"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import HeroSection from '@/components/Hero/hero'

const Page = async () => {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! })
  ]);

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="flex-1">
        {/* Features Section */}
        <section className="w-full py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex flex-col gap-6 max-w-lg">
                <SparklesText className="text-3xl font-bold">
                  InterView-Ready with AI Powered Practice
                </SparklesText>
                <TypingAnimation 
                  className="text-lg text-gray-300"
                  duration={50}
                  delay={500}
                >
                  Practice on real Interview questions & get instant Feedback
                </TypingAnimation>
                <Link 
                  href="/interview" 
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 max-sm:w-full"
                >
                  Start an Interview
                </Link>
              </div>
              <Image
                className="max-sm:hidden hover:scale-105 transition-transform duration-300"
                src="/robot.png"
                alt="AI Interview Assistant"
                width={400}
                height={400}
                priority
              />
            </div>
          </div>
        </section>

        {/* Interviews Grid */}
        <section className="w-full py-16 px-4 bg-black">
          <div className="max-w-7xl mx-auto space-y-16">
            {/* Past Interviews */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-white">Your Interviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hasPastInterviews ? (
                  userInterviews?.map((interview) => (
                    <InterviewCard 
                      key={interview.id} 
                      {...interview} 
                    />
                  ))
                ) : (
                  <p className="text-gray-400 col-span-full text-center py-8">
                    You haven't taken any Interview Yet
                  </p>
                )}
              </div>
            </div>

            {/* Available Interviews */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-white">Take an Interview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hasUpcomingInterviews ? (
                  latestInterviews?.map((interview) => (
                    <InterviewCard 
                      key={interview.id} 
                      {...interview}
                    />
                  ))
                ) : (
                  <p className="text-gray-400 col-span-full text-center py-8">
                    There are no Interviews available
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Page