import '../App.css'
import { LoginForm } from '../components/login/LoginForm.tsx'

const Login = () => {
  return (
    <div className="flex flex-row h-screen text-white">
      <div className="hidden lg:w-[35vw] h-full bg-mainGreen relative lg:flex justify-center items-center">
        <img
          src="/wave-login.svg"
          alt="wave"
          className="h-full absolute right-px translate-x-full"
        />
        <img src="/undraw-map-dark-re-36sy.svg" alt="Map" className="w-[80%]" />
      </div>

      <div className="lg:w-[65vw] w-[100vw] p-10 flex flex-col lg:justify-center h-full font-merryweather bg-mainGray">
        <div className="flex justify-center items-center">
          <LoginForm />
          <img src="/wave.svg" alt="Wave" className="w-screen absolute bottom-0 lg:hidden" />
        </div>
      </div>
    </div>
  )
}

export default Login
