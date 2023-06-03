"use client";

import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <main className="flex bg-neutral-200 dark:bg-slate-900 relative min-h-screen max-w-screen overflow-hidden flex-col items-center justify-center py-8 px-5 lg:p-24 ">
      <BounceLoader color="#22c55e" size={40} />
    </main>
  );
};

export default Loading;
