import Header from "@/components/default-layout/header/Header";
import "../../style.css";
import AppCheckToken from "@/components/shared/AppCheckToken";
export const metadata = {
  title: "PM | APP",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body>
        <Header />
        <AppCheckToken> {children}</AppCheckToken>
      </body>
    </html>
  );
}
