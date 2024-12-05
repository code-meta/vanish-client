import React from "react";

const SectionHeading = ({ text }: { text: string }) => {
  return (
    <span className="font-roboto font-bold text-sm text-primary underline decoration-primary/50 hover:decoration-primary underline-offset-4 transition-all select-none">
      {text}
    </span>
  );
};

export default SectionHeading;
