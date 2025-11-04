"use client";

import { useEffect, useState, type FormEvent } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import LoadingScreen from "@/components/loading";
import { toast } from "sonner";
import Verify from "@/components/verify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmittd] = useState(false);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setIsSubmittd(false);
  }, []); //prevent component render before router push to verify after submit form.

  const loginSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      if (!email) {
        toast.error("Please fill the email input");
        return;
      }
      setIsLoading(true);
      const result = await signIn("nodemailer", {
        email,
        redirect: false,
        redirectTo: "/",
      });
      if (result?.ok) {
        setIsSubmittd(true);
        setIsLoading(false)
      } else {
        toast.error(
          "Failed to send login link. Please ensure the email is valid and try again.",
        );
      }
    } else {
      await signOut();
    }
  };

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isSubmitted) {
    return <Verify email={email} />;
  } else if (!isSubmitted) {
    return (
      <div className="mt-20 flex size-full flex-col items-center text-center md:mt-0 md:justify-center">
        <h1 className="mb-2 text-2xl font-bold md:text-4xl">
          {!session ? "Sign In" : "Sign Out"}
        </h1>
        <span className="text-neutral mb-7 text-sm md:text-base">
          {!session ? "Use your email to continue" : "You already Sign In"}
        </span>
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
            ""
            // <button
            // onClick={()=>router.push(`/`)}
            //   className={`rounded-lg bg-black p-2 py-2 ${email.length > 0 ? "opacity-100" : "opacity-50"} cursor-pointer text-base text-white transition duration-300 md:text-lg`}
            // >
            //   Go Back
            // </button>
          )}
          <button
            type="submit"
            className={`rounded-lg bg-black p-2 py-2 ${email.length > 0 ? "opacity-100" : "opacity-50"} cursor-pointer text-base text-white transition duration-300 md:text-lg`}
          >
            {!session ? "Sign In" : "Sign Out"}
          </button>
        </form>
        {!session ? (
          <span className="text-neutral mt-7 text-sm md:text-base">
            We&apos;ll send a login link to your email
          </span>
        ) : (
          ""
        )}
      </div>
    );
  }

  return <LoadingScreen />;
}
