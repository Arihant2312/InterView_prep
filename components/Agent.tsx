import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

import { cn } from "@/lib/utils";


enum CallStatus{
  INACTIVE='INACTIVE',
  ACTIVE='ACTIVE',
  
  CONNECTING='CONNECTING',
  FINISHED='FINISHED',
}


const Agent = ( {userName } :AgentProps) => {
  const callStatus=CallStatus.ACTIVE  ;
  const isspeaking=true;
  const messages= [
    'Whats your name?',
    'My name is Arihant,nice to mee you!',

  ];
  const lastMessage=messages[messages.length - 1];
  return (
    <>
     <div className='call-view'><div className="card-interviewer">
      <div className="avatar">
        <Image src="/ai-avatar.png" alt="vapi" width={55} height={55} className='object-cover'/>
        {isspeaking && <span className="animate-speak"></span>}
        </div>
        <h3>AI Interviewer</h3>
      </div>
      <div className="card-border"><div className="card-content">
        <Image src="/user-avatar.png" alt="userimage" width={650} height={540} className='rounded-full object-cover size-[155px]'/>
        <h3>{userName}</h3>
        </div>
      </div>
    </div> 
    {messages.length > 0 && (
      <div className="transcript-border">
        <div className="transcript">
          <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
            {lastMessage}
          </p>
        </div>
      </div>

    )}
       <div className="w-full flex justify-center">
  {callStatus === CallStatus.ACTIVE ? (
    <button className="btn-disconnect">Disconnect</button>
  ) : (
    <button className='relative btn-call'>
      <span className={cn(
        "absolute animate-ping rounded-full opacity-75",
        callStatus !== CallStatus.CONNECTING && "hidden"
      )}>
      
      </span>
        {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
          ? 'Call'
          : '...'}
      <span>

      </span>
     </button>
  )}
</div>
    </>
   
  )
}

export default Agent