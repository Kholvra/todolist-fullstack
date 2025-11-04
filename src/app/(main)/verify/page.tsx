import { MdMarkEmailRead } from "react-icons/md";

interface VerifyProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

export default async function Verify({ searchParams }: VerifyProps) {
  const params = await searchParams;
  const email = params.email;

  if (!email) {
    return (
      <div className="flex size-full flex-col items-center justify-center">
        <h1 className="text-4xl"> no email found</h1>
      </div>
    );
  }

  const decodedEmail =  decodeURIComponent(email)


  return (
    <div className="flex size-full flex-col items-center justify-center text-center">
      <MdMarkEmailRead className="size-30" />
      <h1 className="my-5 text-4xl font-bold"> Check Your Email</h1>
      <span className="text-neutral">We&apos;ve sent a sign in link to:</span>
      <span className="text-lg font-bold">{decodedEmail}</span>

      <div className="text-center">
        <p className="text-neutral mt-5">
          Please open your email and click the link to continue
        </p>
        <p className="text-neutral mt-2">
          The link will be valid for 24 hours. If you don&apos;t receive an
          email, check your spam folder.
        </p>
      </div>
    </div>
  );
}
