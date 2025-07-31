import { ArrowLeftIcon } from '@heroicons/react/24/solid'

const NotFound = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen font-merryweather pr-3 lg:pr-[250px] pl-3 bg-[#e5e7eb]">
      <img src="/not-found-404.svg" alt="Page not found" />
      <img
        src="/wave-registration.svg"
        alt="Decor wave"
        className="absolute bottom-0 right-0 h-screen hidden lg:block"
      />
      <h1 className="text-mainGreen text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
        Page not found
      </h1>
      <a
        href="/"
        className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl"
      >
        <ArrowLeftIcon className="w-6 sm:w-7 md:w-8 lg:w-9" />
        <p className="text-mainGray">Back to the site</p>
      </a>
    </div>
  )
}

export default NotFound
