
"use client"
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/ui/login/login-button";


 
const Page  = () => {



  return (
    <main
      className='flex justify-center items-center h-70vh' 
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
      </div>
    </main>
  );
}

 
export default Page