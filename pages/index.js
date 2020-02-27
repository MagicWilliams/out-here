import React, { useEffect, useState} from 'react';
import Head from 'next/head';
import { withUserAgent } from 'next-useragent';
import DesktopHome from '../components/DesktopHome';
import MobileHome from '../components/MobileHome';
import { useCurrentWidth } from '../utils';

function Home(props) {
  const { isMobile } = props.ua;

  return !isMobile ? (
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
