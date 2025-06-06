import RegisterForm from '../components/registration/RegisterForm'

const Registration = () => {
  return (
    <div className="flex flex-col relative bg-mainGray min-h-screen xl:pl-16 items-center justify-center xl:items-baseline">
      <div className="flex flex-col max-w-[470px] xl:max-w-full w-screen gap-8 p-5">
        <img src="/street-map.png" alt="Street map" className="w-[125px]" />
        <h1 className="font-merryweather text-white text-3xl xl:text-[48px] font-bold">
          Create your account
        </h1>
        <RegisterForm />
        <img
          src="/wave-registration.svg"
          alt="Wave"
          className="absolute right-0 top-0 h-full xl:block hidden"
        />
        <img
          src="/wave.svg"
          alt="Wave"
          className="absolute bottom-0 left-0 w-screen block xl:hidden"
        />
      </div>
    </div>
  )
}

export default Registration
