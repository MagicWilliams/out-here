import React, { useEffect, useState} from 'react';
import Head from 'next/head';
import { withUserAgent } from 'next-useragent';
import DesktopHome from '../components/DesktopHome';
import MobileHome from '../components/MobileHome';

function Home(props) {
  const { isMobile } = props.ua;
  const [width, setWidth] = useState(null);
  const getWidth = () => window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      console.log(getWidth());
      setWidth(getWidth())
    };
    resizeListener();
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  const renderMobile = isMobile || (width !== null && width < 450);

  return !renderMobile ? (
    <div>
      <Head>
        <title>Out Here - Kyana Gordon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DesktopHome entries={props.entries} />
    </div>
  ) : (
    <div>
      <Head>
        <title>Out Here - Kyana Gordon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileHome entries={props.entries} />
    </div>
  );
}

Home.getInitialProps = async function() {
  const client = require('contentful').createClient({
    space: process.env.OUT_HERE_CONTENTFUL_SPACE_ID,
    accessToken: process.env.OUT_HERE_CONTENTFUL_ACCESS_TOKEN
  });

  const entries = await client.getEntries({
    content_type: 'entry',
  });

  return {
    entries: entries.items,
  }
}

export default withUserAgent(Home);
