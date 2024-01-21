"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LoginForm({params}) {

//const loginAction  =  userActivation (params.action)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [doaction, setDoaction] = useState("");
  const router = useRouter();


  //const router = useRouter()
  //same name as name of your file, can be [slug].js; [specialId].js - any name you want
 
  const handleSubmit = async (e) => {

 e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
   console.log({res});


      if (res.error) {


        //setError("Invalid Credentials");

     
        setError(res.error);
        return;
      }

      if (res.message) {
       // console.log({res});

        //setError("Invalid Credentials");
        setMessage(res.message);
        return;
      }


      //if (params.slug) setError(params.slug);

      router.replace("/");



    } catch (error) {

  console.log("Error --",{error});
    }
  };


 // if (loginAction) setError(loginAction);
  return (
 
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-orange-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => {setEmail(e.target.value);setError("");setMessage("")}}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => {setPassword(e.target.value); setError(""); setMessage("")}}
            type="password"
            placeholder="Password"
          />
          <button className="bg-orange-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {message && (
            <div className="bg-blue-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

 {error && ( <Link className="text-sm mt-3 text-left" href={"/forgot"}>
            forgot password? <span className="underline">Reset it</span>
          </Link> )}
          <Link className="text-sm mt-6 " href={"/register"}>
           New account?<span className="underline">Register</span>
          </Link> <Link className="text-sm mt-6 " href={"/forgot"}><span className="underline">Reset</span></Link>
        </form>
      </div>
  
  );
}
