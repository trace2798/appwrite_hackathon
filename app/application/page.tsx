import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
     <main className="flex bg-neutral-200 dark:bg-slate-900 relative min-h-screen max-w-screen overflow-hidden flex-col items-center justify-center py-8 px-5 xl:p-24 ">
        Main Page
     </main>
    </>
  );
};

export default page;
