import { type ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}
export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="mx-auto p-5 lg:w-1/3">
      {children}
    </div>
  );
}
