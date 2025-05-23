'use client';
import LoginForm from "@/components/Login/LoginForm";
import Image from "next/image";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-row gap-12">
        <div className="flex items-center justify-center">
          <Image
            src="/Icon.svg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
export default Login;
