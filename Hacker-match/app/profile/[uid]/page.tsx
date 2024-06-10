"use client";
import { Collections, db } from "@/app/firebase/client";
import { collection, query, where } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { SiDevpost } from "react-icons/si";

export default function Profile({ params }: { params: { uid: string } }) {
  const router = useRouter();
  const [userData, setUserData] = useState<null>(null);
  const [error, setError] = useState<string | null>(null);

  const q = query(
    collection(db, Collections.users),
    where("__name__", "==", params.uid)
  );

  const [users, loadingUsers] = useCollectionData(q);
  const user = users?.[0] as any;

  if (loadingUsers) {
    return (
      <div className="container mx-auto px-8 lg:px-20 py-10 animate-pulse">
        <div className="flex flex-wrap -mx-4">
          {/* Profile Column */}
          <div className="w-full lg:w-1/3 px-4 flex flex-col items-center">
            {/* Profile Picture Skeleton */}
            <div className="mb-6 rounded-full bg-gray-300 h-40 w-40"></div>

            {/* Biography Skeleton */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 w-full text-center">
              <div className="h-6 bg-gray-300 w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 w-full"></div>
            </div>

            {/* Links Skeleton */}
            <div className="bg-black p-4 rounded-lg shadow mb-6 w-full">
              <div className="h-4 bg-gray-700 mb-1 w-3/4"></div>
              <div className="h-4 bg-gray-700 mb-1 w-3/4"></div>
              <div className="h-4 bg-gray-700 mb-1 w-3/4"></div>
            </div>
          </div>

          {/* Information Column */}
          <div className="w-full lg:w-2/3 px-4">
            <div className="flex flex-col justify-start h-full">
              {/* Name and Location Skeleton */}
              <div className="mb-6 text-center lg:text-left lg:mb-10 lg:mt-8">
                <div className="h-16 bg-gray-300 w-3/4 mb-4 lg:mb-1"></div>
                <div className="h-4 bg-gray-200 w-full mt-10 lg:mt-6"></div>
              </div>

              {/* Relevant Information Skeleton */}
              <div className="bg-black p-4 rounded-lg shadow space-y-3 mt-0">
                <div className="h-6 bg-gray-700 w-3/4 mb-2"></div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="h-4 bg-gray-300 mb-2"></div>
                  <div className="h-4 bg-gray-200 w-5/6"></div>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="h-4 bg-gray-300 mb-2"></div>
                  <div className="h-4 bg-gray-200 w-5/6"></div>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="h-4 bg-gray-300 mb-2"></div>
                  <div className="h-4 bg-gray-200 w-5/6"></div>
                </div>
                {/* ... Repeat for additional information ... */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available.</div>;
  }

  const renderColoredName = (name: string) => {
    const words = name.split(" ");
    return (
      <>
        <span className="text-hacker-green">{words[0]}</span>
        {words.length > 1 && (
          <>
            <span className="text-hacker-green">{"_"}</span>
            <span className="text-match-pink">{words.slice(1).join("")}</span>
          </>
        )}
      </>
    );
  };

  return (
    <div className="container mx-auto px-8 lg:px-20 py-10">
      <div className="flex flex-wrap -mx-4">
        {/* Profile Column */}
        <div className="w-full lg:w-1/3 px-4 flex flex-col items-center">
          {/* Profile Picture */}
          <div className="mb-6">
            <Image
              src={
                user.photoUrl ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="Profile picture"
              width={160}
              height={160}
              className="rounded-full"
            />
          </div>
          {/* Biography */}
          <div className="bg-white p-4 rounded-lg shadow mb-6 w-full text-center">
            <h3 className="text-lg font-semibold mb-2">Biography</h3>
            {/* Insert user biography if available */}
            <p className="text-black">
              {user.biography || "This user has not provided a biography."}
            </p>
          </div>
          {/* Links */}
          <dl className="bg-black p-4 rounded-lg shadow mb-6 w-full">
            {user.linkedinUrl ? (
              <dd className="mb-1">
                <a
                  href={user.linkedinUrl}
                  className="flex items-center text-slate-200 hover:text-white"
                >
                  <span className="mr-2">LinkedIn </span>
                  <AiFillLinkedin />
                </a>
              </dd>
            ) : (
              <dd className="mb-1 text-slate-400">No LinkedIn included</dd>
            )}
            {user.githubProfileUrl ? (
              <dd className="mb-1">
                <a
                  href={user.githubProfileUrl}
                  className="flex items-center text-slate-200 hover:text-white"
                >
                  <span className="mr-2">GitHub</span>
                  <AiFillGithub />
                </a>
              </dd>
            ) : (
              <dd className="mb-1 text-slate-400">No GitHub included</dd>
            )}
            {user.devpostProfileUrl ? (
              <dd className="mb-1">
                <a
                  href={user.devpostProfileUrl}
                  className="flex items-center text-slate-200 hover:text-white"
                >
                  <span className="mr-2">Devpost </span>
                  <SiDevpost />
                </a>
              </dd>
            ) : (
              <dd className="mb-1 text-slate-400">No Devpost included</dd>
            )}
          </dl>
        </div>

        {/* Information Column */}
        <div className="w-full lg:w-2/3 px-4">
          {/* Ensure vertical alignment to the top */}
          <div className="flex flex-col justify-start h-full">
            {/* Name and Location, etc. */}
            <div className="mb-6 text-center lg:text-left lg:mb-10 lg:mt-8">
              <h1 className="text-6xl font-bold mb-4 lg:mb-1">
                {user.displayName
                  ? renderColoredName(user.displayName)
                  : "Name not provided"}
              </h1>
              {/* User location and other information could go here */}
              <p className="text-l text-black mt-10 lg:mt-6">
                {user.location || "Location not provided"} |{" "}
                {user.college || "College not provided."} |{" "}
                {user.major || "Major not provided"}
              </p>
            </div>
            {/* Relevant Information as List Group, adjusted to align with the Biography */}
            <div className="bg-black p-4 rounded-lg shadow space-y-3 mt-0">
              {" "}
              {/* Remove the top margin */}
              <h3 className="text-lg font-semibold text-white mb-2">
                Relevant Information
              </h3>
              <div className="bg-gray-100 p-4 rounded-md">
                <h4 className="font-semibold text-black">
                  Hackathons Attended
                </h4>
                <p className="text-black">{user.hackathons || "0"}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <h4 className="font-semibold text-black">Current Hackathon</h4>
                <p className="text-black">
                  {user.currentHackathon || "Not participating"}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <h4 className="font-semibold text-black">Skills</h4>
                <p className="text-black">
                  {user.skills || "No skills provided"}
                </p>
              </div>
              {/* ... Additional Information if present ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
