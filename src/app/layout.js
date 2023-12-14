import Header from "../components/Header/header";
import "./global.css";
import { GlobalContextProvider } from "@/context/store";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <GlobalContextProvider>
          <Header />
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
