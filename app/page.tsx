import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Landing = () => {
  return (
    <div>
      <h1>Welcome to Vanish</h1>
      <Link href={"/chat/dashboard"}>Dashboard</Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil vel
        dolorum sed omnis sapiente repudiandae aspernatur exercitationem tempore
        aliquid soluta!
      </p>
    </div>
  );
};

export default Landing;
