import Link from "next/link";
import React from "react";

export default function notFoundPage() {
  return (
    <div>
      <h1>404 not found</h1>
      <p>the page you are looking for is not found</p>
      <Link href={"/"}>go Home </Link>
    </div>
  );
}
