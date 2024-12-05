import InitialPropmts from "./_components/InitialPropmts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <InitialPropmts />

      {children}
    </section>
  );
}
