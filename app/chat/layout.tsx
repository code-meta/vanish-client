import type { Metadata } from "next";
import ProfileDialog from "./_components/ProfileDialog";
// import "./globals.css";

export const metadata: Metadata = {
  title: "Vanish",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{true ? <ProfileDialog /> : children}</body>
    </html>
  );
}