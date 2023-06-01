"use client";
import { FC } from "react";
import { Button } from "./Button";
import Icons from "./Icons";
import Link from "next/link";

interface HeroProps {}

const Hero: FC<HeroProps> = ({}) => {
  return (
    <>
      <main className="flex bg-neutral-200 dark:bg-slate-900 relative min-h-screen max-w-screen overflow-hidden flex-col items-center justify-center py-8 px-5 xl:p-24 ">
        <div className="lg:mx-[20vw] text-center flex flex-col items-center">
          <h1 className="mt-5 pb-3 lg:mt-10 font-satoshiBlack text-4xl md:text-5xl lg:text-6xl dark:bg-gradient-to-tl dark:from-indigo-900 dark:to-purple-500 bg-clip-text text-transparent bg-gradient-to-bl from-slate-900 to-gray-500">
            Effortlessly manage your day to day task with Task Manager.
          </h1>
          <h2 className="mx-[10vw] mt-5 text-base md:text-xl font-ranadeRegular text-gray-600 dark:text-gray-400">
            This is my submission for the appwrite X hashnode hackathon
          </h2>
          <div className="flex flex-col md:flex-row justify-evenly items-center mt-7 mx-[10vw] w-full">
            <Link href="/docs">
              <Button className="max-md:mb-5">
                Task Master<Icons.ArrowRight className="h-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button className="max-md:mb-5">
                Hashnode Article <Icons.ArrowRight className="h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Hero;
