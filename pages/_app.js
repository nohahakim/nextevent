import "../styles/globals.css";
import Layout from "../components/layout/layout";
import Notification from "@/components/ui/notification";
import Head from "next/head";
import { NotificationContextProvider } from "@/store/notification-context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NotificationContextProvider>
        <Head>
          <title>NextJS Events App</title>
          <meta name="description" content="Explore events with NextJS" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </>
  );
}

export default MyApp;
