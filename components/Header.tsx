import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <>
      <header>
        <div className="flex flex-col md:flex-row items-center justify-between p-5 bg-gray-500/10 rounded-b-2xl">
          <h1 className="text-4xl lg:text-8xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-yellow-500 via-pink-500 to-orange-500 dark:from-yellow-500 dark:via-purple-500 dark:to-red-500 animate-text">
            Task Master
          </h1>
          <ThemeToggle />
          {/* <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-blue-500 filter blur-3xl opacity-50 -z-50" /> */}
        </div>
        <div className="flex items-center justify-center px-5 md:py-5">
          <p className="flex items-center text-xl font-semibold  w-fit  max-w-3xl text-[#005501]">
            Goals to Achieve
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
