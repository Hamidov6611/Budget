import React, { FC, useState } from "react";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const InputChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const data = await AuthService.login(authData)
      
      if(data){
        setTokenToLocalStorage('token', data.token)
        dispatch(login(data))
        toast.success('You logged id.')
        navigate('/')
      }
      
    } catch (error: any) {
      const err: string = error.response?.data.message
      toast.error(err.toString())
    }
  }

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const data = await AuthService.registration(authData)
      if(data){
        toast.success("Account has been created.")
        setIsLogin(!isLogin)
      }
    } catch (error: any) {
      const err: string = error.response?.data.message
      toast.error(err.toString())
    }
  }
  return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="mb-10 text-center text-xl">
        {isLogin ? "Login" : "Registration"}
      </h1>

      <form 
      onSubmit={isLogin ? loginHandler : registrationHandler}
      className="mx-auto flex w-[95%] lg:w-1/3 flex-col gap-5">
        <input
          name="email"
          value={authData.email}
          onChange={InputChange}
          type="text"
          className="input"
          placeholder="Email"
        />
        <input
          name="password"
          value={authData.password}
          onChange={InputChange}
          type="password"
          className="input"
          placeholder="Password"
        />

        <button className="btn btn-green mx-auto">Submit</button>
      </form>

      <div className="flex justify-center mt-5">
        {isLogin ? (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            You don't have an account?
          </button>
        ) : (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            Already have an account?
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
