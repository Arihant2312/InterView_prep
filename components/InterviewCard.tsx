//"use client";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

// Extend dayjs
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const InterviewCard = async ({
  id: interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({ interviewId, userId })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-light-400",
      Mixed: "bg-light-600",
      Technical: "bg-light-800",
    }[normalizedType] || "bg-light-600";

  // ✅ Handle both ISO and "18 Jul 2025, 12:42:49 am IST" style formats
const rawDate = feedback?.createdAt || createdAt || new Date().toISOString();

let formattedDate = "Date unavailable";
try {
  const dateObj = new Date(rawDate);

  if (!isNaN(dateObj.getTime())) {
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = dateObj.getFullYear();
    formattedDate = `${day}/${month}/${year}`;
  } else {
    // fallback: just show raw date string
    formattedDate = rawDate;
  }
} catch (err) {
  console.error("Date parsing failed:", rawDate, err);
}

  return (
    <div className="card-border w-[400px] max-sm:w-full min-h-110">
      <div className="card-interview">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
              badgeColor
            )}
          >
            <p className="badge-text">{normalizedType}</p>
          </div>

          {/* Cover Image */}
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          {/* Interview Role */}
          <h3 className="mt-5 capitalize">{role} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2 items-center">
              <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
              <p className="text-sm ">{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p>{feedback?.totalScore ?? "---"}/100</p>
            </div>
          </div>

          {/* Feedback Summary */}
          <p className="line-clamp-2 mt-7">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>

        {/* Tech Stack & CTA */}
        <div className="flex flex-row justify-between items-center mt-6">
          <DisplayTechIcons techStack={techstack} />

          <Button asChild className="btn-primary">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "Take the Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
