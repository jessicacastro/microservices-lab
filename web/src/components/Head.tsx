import Head from "next/head";

const HeadComponent = ({ title, children }) => (
  <Head>
    <title>{title}</title>
    {children}
  </Head>
)

export { HeadComponent }