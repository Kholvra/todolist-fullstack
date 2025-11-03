"use client";

import { useEffect, useState, type FormEvent } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []); //prevent component render before router push to verify after submit form.

  const loginSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      setIsLoading(true);
      const result = await signIn("nodemailer", {
        email,
        redirect: false,
        redirectTo: "/",
      });
      const encodedEmail = encodeURIComponent(email);
      if (result?.ok) {
        router.push(`/verify?email=${encodedEmail}`);
      } else {
        alert("failed sending magic link");
      }
    } else {
      await signOut();
    }
  };

  if (status === "loading") {
    return <span>loading</span>;
  }

  if (isLoading) {
    return <span>loading</span>;
  }

  return (
    <div className="flex size-full flex-col items-center md:justify-center text-center">
      <h1 className="mb-2 text-2xl md:text-4xl font-bold">Sign In</h1>
      <span className="text-sm md:text-base text-neutral mb-7">Use your email to continue</span>
      <form
        action=""
        className="flex w-full max-w-100 flex-col justify-center gap-3"
        onSubmit={(e) => loginSubmitHandler(e)}
      >
        {!session ? (
          <input
            type="text"
            className="border-neutral rounded-lg border p-1 py-2 shadow-xl transition duration-500 ease-in-out focus:ring-3 focus:ring-neutral-400/50 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <span>You already Sign In</span>
        )}
        <button
          type="submit"
          className={`rounded-lg bg-black p-2 py-2 ${email.length > 0 ? "opacity-100" : "opacity-50"} text-base md:text-lg text-white transition duration-300`}
        >
          {!session ? "Sign In" : "Sign Out"}
        </button>
      </form>
      <span className="text-sm md:text-base text-neutral mt-7">
        We&apos;ll send a login link to your email
      </span>
    </div>
  );
}
