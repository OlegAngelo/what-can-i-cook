import "@/styles/globals.css";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>What Can I Cook?</title>
        <meta name="description" content="Find your next meal"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App;
