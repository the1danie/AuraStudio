"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-[#1A1A1A] group-[.toaster]:text-white group-[.toaster]:border-white/10",
          description: "group-[.toast]:text-gray-300",
          actionButton: "group-[.toast]:bg-[#00E5FF] group-[.toast]:text-[#0D0D0D]",
          cancelButton: "group-[.toast]:bg-gray-700 group-[.toast]:text-gray-300",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
