export const metadata = {
  title: "PM | Login",
};
import LoginClientCheckToken from "@/components/shared/LoginClientCheckToken";
import "../../style.css";

// import Image from "next/image";
// import logo from "../../publick/assets/logo.png";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="fixed h-screen w-screen bg-emerald-500 rotate-45 top-[-34%] z-[0] right-[-27%]"></div>
        <div className="h-screen w-screen bg-emerald-50 flex items-center justify-center sm:p-[40px] sm:justify-start">
          <LoginClientCheckToken> {children}</LoginClientCheckToken>
          {/* <div className=" z-[1]">
            <Image src={logo} width={100} height={100} alt="Logo" />
          </div> */}
        </div>
      </body>
    </html>
  );
}
