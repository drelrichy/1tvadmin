"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const Nav = () => {


    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showSignInDropdown, setShowSignInDropdown] = useState(false);
  
  
  
    useEffect(() => {
      (async () => {
        const res = await getProviders();
        setProviders(res);
       // console.log({res});
      })();
    }, []);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

 
  const handleLogin = () => {
    setIsLoggedIn(isLoggedIn);
    setProfilePicture(profilePicture);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfilePicture(null);
  };

  return (
    <div className=" w-screen  sticky top-0 z-50 rounded-lg bg-gray-800 p-0 flex  ">
      <nav className=" w-full sticky top-0 z-50 rounded-lg bg-gray-800 p-4 flex  ">
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/1tvadmin.png'
          alt='logo'
          width={100}
          height={50}
          className='object-contain'
        />
        <p className='logo_text' width='300px'>::</p>
      </Link>
        <ul className="flex space-x-4 text-white"> 
        <div className='flex gap-3 md:gap-5'>
          <li className="cursor-pointer"> <Link href='/about'> <button
              className='black_btn'
                  type='button'> About </button> </Link></li></div>
          {session?.user ? (
            <>
             <div className='flex gap-3 md:gap-5'>
             <li className="cursor-pointer"> 
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link> </li>
            <li className="cursor-pointer"> 
            <button type='button' onClick={signOut} className='black_btn'>
              Sign Out
            </button> </li>

            <Link href='/dashboard'>
              <Image
                src={session?.user.image}
                width={40}
                height={40}
                className='rounded-full'
                alt='profile'
              />
            </Link> 
            <li className="cursor-pointer"> 
            <Link href='/dashboard' className='black_btn'>
            <p className="text-1xl align-bottom items-center" >{session?.user.name}</p> </Link> </li>
          </div>
           
              <li>
                {profilePicture && (
                  <Image
                  height={40}
                  width={40}
                    src={profilePicture}
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                  />
                )}
              </li>
            </>
          ) : (
            <>


          <>  <Link href='/login'>   
           <button
              className='black_btn cursor-pointer'
                  type='button' 
          
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  
                  >Login with </button></Link>
           <div className='flex'>
            {providers && showProfileDropdown && 
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                <Image  
                //src = {"https://authjs.dev/img/providers/"+provider.id+".svg"}
                src = {"/assets/images/"+provider.id+".svg"}
                  width={15}
                  height={15}
                  margin={0}
                  padding={0}
                //  className='' className='flex gap-3 md:gap-5'
                  alt={provider.id+" Login"}
                
                /> {provider.name}</button> 
              
          
               
              ))}
            
             </div>
          </>
        
            
              <li className="cursor-pointer">   <Link href='/register'>  <button
              className='black_btn cursor-pointer'
                  type='button' >Register</button> </Link> </li>
              <li className="cursor-pointer">   <Link href='/forgot'>   <button
              className='black_btn cursor-pointer'
                  type='button' >Reset Password</button></Link> </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
