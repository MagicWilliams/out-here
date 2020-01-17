import React, { useEffect } from 'react';
import Head from 'next/head';
import { withUserAgent } from 'next-useragent';

function Home(props) {
  const { isMobile } = props.ua;

  return !isMobile ? (
    <DesktopHome entries={props.entries} />
  ) : (
    <MobileHome entries={props.entries} />
  );
}

class DesktopHome extends React.PureComponent {
  render() {
    const { entries } = this.props;
    return (
      <div className='Home'>
        <Head>
          <title>Out Here - Kyana Gordon</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='body'>
          <div className='left'>
            <div className='map'>
              <img src='/img/new-map.png' alt='map'/>
              { entries.map((entry, i) => {
                const { state } = entry.fields;
                return (
                  <div onClick={() => window.location.href = '/story/' + state.toLowerCase()} className='dot-container'>
                    <div className='dot' key={i}></div>
                    <p> {state} </p>
                  </div>
                )
              })}
            </div>
            <div className='details'>
              <img className='home-text' src='/img/home-text.png' />
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
            position: relative;
          }

          .map img {
            width: 100%;
          }

          .map .dot-container {
            display: flex;
            flex-direction: column;
            position: absolute;
            left: 50px;
            top: 75px;
            color: white;
            flex: none;
            align-items: center;
          }

          .dot-container .dot {
            border-radius: 100%;
            background: #ffb9a3;
            height: 40px;
            width: 40px;
            flex: none;
          }

          .left {
            width: 90%;
            display: flex;
            flex-direction: column;
            min-width: 600px;
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
            width: 50%;
            display: flex;
            align-items: flex-start;
            position: relative;
            top: -90px;
          }

          .details img {
            width: 100%;
            object-fit: contain;
          }

          .logo-container {
            width: 70%;
            position: absolute;
            bottom: -25px;
            right: -50px;
          }

          .logo-container img {
            width: 100%;
          }

        `}</style>
      </div>
    );
  }
};

function MobileHome(props) {
  const { entries } = props;
  return (
    <div className='MobileHome'>
      <img className='logo' src='/img/outhere-logo.png' alt='out-here' />
      <img className='map' src='/img/map.png' alt='out-here' />
      <img className='home-text' src='/img/home-text.png' alt='out-here' />
      <div className='navigation'>
        { entries.map((entry, i) => {
          const { state } = entry.fields;
          return (
            <div onClick={() => window.location.href = '/story/' + state.toLowerCase()} className='dot-container'>
              <div className='dot' key={i}></div>
              <p> {state} </p>
            </div>
          )
        })}
      </div>
      <a href='/about'> About </a>
      <Head>
        <title>Out Here - Kyana Gordon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx>{`
        .MobileHome {
          height: 100%;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          overflow: hidden;
          padding: 15px;
          padding-top: 45px;
        }

        .logo, .map, .home-text, .navigation {
          width: 95%;
        }

        .logo {
          z-index: 2;
        }

        .map {
          position: relative;
          top: -35px;
        }

        .navigation {
          flex: 1;
          position: relative;
        }

        .dot-container {
          display: flex;
          flex-direction: column;
          position: absolute;
          left: 50px;
          top: 75px;
          color: black;
          flex: none;
          align-items: center;
        }

        .dot-container .dot {
          border-radius: 100%;
          background: #ffb9a3;
          height: 40px;
          width: 40px;
          flex: none;
        }

        a {
          align-self: flex-end;
          margin: 15px 25px;
        }

      `}</style>

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
