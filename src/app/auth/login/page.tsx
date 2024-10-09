"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { motion } from "framer-motion";
import LoginPage from "../../components/auth/login";
import { AuthRepository } from "@/repository/auth/authRepository";

// Styled components
const PageWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('/background.png') no-repeat center center/cover;
  padding: 1rem;
`;

const BoxContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  margin: 1rem;
`;

const LoginBox = styled(BoxContainer)`
  padding: 2rem;
  margin-bottom: 1rem;
`;

const Page: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      router.push("/home");
    }
  }, []);

  const authRepos = new AuthRepository();

  const handleLogin = async (userData: { email: string; password: string }) => {
    try {
      console.log("🚀 ~ handleLogin ~ userData:", userData);
      const respon = await authRepos.loginApi(userData.email, userData.password);
      console.log("🚀 ~ handleLogin ~ token:", respon);
      if (respon) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("data", JSON.stringify(respon.data));
        router.push("/home");
      }
    } catch (err: any) {
      console.error(err.message);
      throw new Error(err.message);
    }
  };

  return (
    <PageWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <LoginBox initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <LoginPage onSubmit={handleLogin} />
      </LoginBox>
    </PageWrapper>
  );
};

export default Page;
