"use client";

import ArrowButton from "@/components/client/Pagination/components/ArrowButton/ArrowButton";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <ArrowButton className={className} direction="left" onClick={handleBack} />
  );
};

export default BackButton;
