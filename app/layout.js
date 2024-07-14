import styles from "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationContextProvider } from "./_contexts/ReservationContext";

const Josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wild Oasis", // "%s is here a title of children route"
    default: "Welcome / The Wild Oasis",
  },
  description: "Welcome to the paradise of wild oasis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationContextProvider>{children}</ReservationContextProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
