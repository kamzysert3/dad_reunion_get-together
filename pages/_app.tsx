import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AttendanceProvider } from "../components/AttendanceContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AttendanceProvider>
      <Component {...pageProps} />
    </AttendanceProvider>
  );
}
