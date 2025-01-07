"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function error() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      An error has occured
      <Button>
        <a className="font-bold" href="/builder">
          Go Back
        </a>
      </Button>
    </div>
  );
}
