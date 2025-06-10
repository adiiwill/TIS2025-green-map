import LoginForm from '../components/login/LoginForm.tsx'

import '../App.css'

const Login = () => {
  return (
    <div className="flex flex-row min-h-screen xl:h-screen text-white bg-mainGray relative sm:p-10 md:p-0">
      <div className="hidden xl:w-[35vw] h-full bg-mainGreen relative xl:flex justify-center items-center">
        <img
          src="/wave-login.svg"
          alt="wave"
          className="absolute right-px top-0 h-full w-auto translate-x-full"
        />
        <img src="/undraw-map-dark-re-36sy.svg" alt="Map" className="w-[80%]" />
      </div>

      <LoginForm />

      <img
        src="/wave.svg"
        alt="Wave"
        className="w-screen absolute bottom-0 left-0 xl:hidden"
      />
    </div>
  )
}

export default Login
