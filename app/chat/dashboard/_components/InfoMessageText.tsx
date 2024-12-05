import React from "react";

const InfoMessageText = ({ text }: { text: string }) => {
  return <p className="text-muted-foreground font-roboto text-sm">{text}</p>;
};

export default InfoMessageText;
