import React from 'react';
import Head from 'next/head';
import { withUserAgent } from 'next-useragent';

function About(props) {
  const { isMobile } = props.ua;
  return isMobile ? <DesktopAbout /> : <MobileAbout />;
}


function DesktopAbout() {
  return (
    <div className='About'>
      <img onClick={() => window.location.href = '/'} className='x' src='/img/x.svg' alt='exit'/>
      <div className='body'>
        <h1> About </h1>
        <p className='main-text'> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feu </p>
        <p> Listen to the entire series on </p>
        <div className='links'>
          <a href='https://espn.com/nba'> Spotify, </a>
          <a href='https://espn.com/nba'> iTunes, </a>
          <p> or </p>
          <a className='fin' href='https://espn.com/nba' target='_blank'> Soundcloud </a>
          <p className='period'> . </p>
        </div>
      </div>
      <style jsx>{`
        .About {
          height: 100%;
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .About p {
          font-size: 20px;
        }

        .About .x {
          position: absolute;
          top: 25px;
          right: 25px;
          height: 40px;
          width: 40px;
        }

        .About h1 {
          font-size: 50px;
        }

        .body {
          width: 40%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .main-text {
          margin: 50px 0px;
          text-align: center;
        }

        .links {
          display: flex;
        }

        .links * {
          margin: 0px 4px;
          font-size: 20px;
        }

        .links .fin {
          margin-right: 0px;
        }

        .links .period {
          margin: 0;
        }

      `}</style>
    </div>
  );
};

export default withUserAgent(About);
