
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AttendanceProvider } from "../components/AttendanceContext";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CAS-FORUM (85/87 set) Reunion</title>
      </Head>
      <AttendanceProvider>
        <Component {...pageProps} />
      </AttendanceProvider>
    </>
  );
}
