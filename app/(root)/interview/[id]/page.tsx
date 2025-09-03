import { getInterviewsById } from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import { getCurrentUser } from '@/lib/actions/auth.action';
import DisplayTechIcons from '@/components/DisplayTechIcons';
import Agent from '@/components/Agent';

const Page = async ({ params }: RouteParams) => {
  const { id } = params;
  const interview = await getInterviewsById(id);
  const user = await getCurrentUser();

  if (!interview) redirect('/');

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-6 flex flex-col gap-6">
      
      {/* Interview Info Card */}
      <div className=" w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-2 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold capitalize gap-1">{interview.role} Interview</h2>
            <p className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full w-fit capitalize gap-1">{interview.type}</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-4">
          <h3 className="font-medium text-gray-600 dark:text-gray-300 mb-2">Tech Stack:</h3>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>
      </div>

      {/* Interview Panel */}
      <div className="w-full max-w-4xl mx-auto">
        <Agent
          userName={user?.name || ""}
          userId={user?.id}
          interviewId={id}
          type="interview"
          questions={interview.questions}
        />
      </div>
    </div>
  );
};

export default Page;
