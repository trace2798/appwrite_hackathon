import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <>
      <header>
        <div className="flex flex-col md:flex-row items-center justify-center p-5 bg-gray-500/10 rounded-b-2xl">
          <h1 className=" pb-10 md:pb-0 object-contain font-bold text-4xl">
            Task Master
          </h1>
          <ThemeToggle/>
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-blue-500 filter blur-3xl opacity-50 -z-50" />
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
