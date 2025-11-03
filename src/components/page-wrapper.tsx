import { type ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}
export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className=" h-screen overflow-hidden">
      <div className="mx-auto md:h-full mt-10 md:mt-0 p-5 lg:w-1/3">
        {children}
      </div>
    </div>
  );
}
