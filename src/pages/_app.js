import "@/styles/globals.css";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>What Can I Cook?</title>
        <meta name="description" content="Free Web tutorials"></meta>
      </Head>
      <Component {...pageProps} />;
    </>
  )
}

export default App;
