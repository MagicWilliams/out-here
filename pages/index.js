import React from 'react';
import Head from 'next/head';

function Home(props) {
  console.log(props.entries);
  return (
    <div className='Home'>
      <Head>
        <title>Out Here - Kyana Gordon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='body'>
        <div className='left'>
          <img className='map' src='/img/map.png' alt='map'/>
          <div className='details'>
            <p> Long text about the project and or Kyana </p>
            <div className='logo-container'>
              <img src='/img/outhere-logo.png' />
            </div>
          </div>
        </div>
        <div className='right'>
          <a href='/about'> About </a>
        </div>
      </div>
      <style jsx>{`
        .Home {
          height: 100%;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .body {
          width: 90%;
          display: flex;
          padding-top: 50px;
          flex: 1;
        }

        .map {
          width: 100%;
        }

        .left {
          width: 90%;
          display: flex;
          flex-direction: column;
        }

        .left * {
          flex: 1;
        }

        .right {
          width: 10%;
          text-align: center;
        }

        .right a {
          padding-left: 20px;
          text-decoration: none;
        }

        .details {
          width: 100%;
          display: flex;
        }

        .details p {
          text-align: center;
          margin-top: 15px;
        }

        .logo-container {
          position: relative;
        }

        .logo-container img {
          width: 600px;
          position: absolute;
          top: -50px;
          right: -100px;
        }

      `}</style>
    </div>
  );
};

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

export default Home
