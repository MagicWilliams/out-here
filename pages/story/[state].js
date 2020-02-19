import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { withUserAgent } from 'next-useragent';
import ReactPlayer from 'react-player';

Story.getInitialProps = async function(context) {
  const client = require('contentful').createClient({
    space: process.env.OUT_HERE_CONTENTFUL_SPACE_ID,
    accessToken: process.env.OUT_HERE_CONTENTFUL_ACCESS_TOKEN
  });

  let matchingStories;

  await client.getEntries({
    content_type: 'entry',
  }).then((res) => {
    const state = context.query.state.replace(/\s/g, '').toLowerCase();
    matchingStories = [...res.items].filter((event) => {
      return event.fields.state.toLowerCase() === state;
    });
  });

  return {
    entry: matchingStories,
    state: context.query.state,
  }
}


function Story(props) {
  const { entry, state } = props;
  const { isMobile } = props.ua;
  console.log(isMobile);
  return isMobile ? <MobileStory entry={entry} state={state} /> : <DesktopStory entry={entry} state={state} />;
}

function MobileStory(props) {
  const { entry, state } = props;
  const { audio, subtitles } = props.entry[0].fields;
  const storyImage = entry[0].fields.image.fields.file.url;
  const [playing, setPlaying] = useState(true);
  const currState = playing ? '/img/play.svg' : '/img/pause.svg';

  return (
    <div className='MobileStory'>
      <img className='state' src='/img/state.png' />
      <img onClick={() => window.location.href = '/'} className='x' src='/img/x.svg' alt='exit'/>
      <h1 className='state'></h1>
      <div className='img-container' onClick={() => setPlaying(!playing)}>
        <img className='main-img' src={storyImage} alt='Story photo' />
        <h3 className='title'> Kim Gordon of West Virginia </h3>
      </div>
      <div className='audio'>
        <audio id='audiofile' src={audio.fields.file.url} />
        <div id='subtitles'></div>
      </div>
      <p className='pre-links'> Listen to the entire series on </p>
      <div className='links'>
        <a href='https://espn.com/nba'> Spotify, </a>
        <a href='https://espn.com/nba'> iTunes, </a>
        <p> or </p>
        <a className='fin' href='https://espn.com/nba' target='_blank'> Soundcloud </a>
        <p className='period'> . </p>
      </div>

      <style jsx> {`
        .MobileStory {
          height: 100%;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
          padding: 15px;
          padding-top: 50px;
        }

        .MobileStory .main-img {
          width: 100%;
          margin-top: 10px
        }

        .MobileStory .x {
          position: absolute;
          top: 25px;
          right: 25px;
          height: 40px;
          width: 40px;
          z-index: 2;
        }

        .MobileStory .state {
          width: 100%;
        }

        .img-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .title {
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          color: white;
          transform: translate(-50%, -50%);
        }

        .pre-links {
          margin-top: 15px;
        }

        .links {
          display: flex;
          justify-content: center;
          width: 70%;
        }

        .links * {
          margin: 0px 2px;
          font-size: 14px;
          white-space: nowrap;
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
}

function DesktopStory(props) {
  const [playing, setPlaying] = useState(true);
  const [currTime, setCurrTime] = useState(null);
  const audioEl = useRef(null);

  const updatePlayStatus = () => {
    console.log(playing);
    if (playing) {
      audioEl.current.pause();
    } else {
      audioEl.current.play();
    }
    setPlaying(!playing);
  }

  const onPlay = () => {

  }

  const onPause = () => {
    clearInterval(currentTimeInterval);
  }

  const updateTime = () => {
    const currentAudioTime = Math.floor(audioEl.current.currentTime);
    setCurrTime(currentAudioTime);
  }

  const { entry, state } = props;
  const trueEntry = entry[0];
  const { audio, subtitles, image } = trueEntry.fields;
  const storyImage = image.fields.file.url;
  const currState = !playing ? '/img/play.svg' : '/img/pause.svg';

  return (
    <div className='Story'>
    <img className='state' src='/img/state.png' />
      <img onClick={() => window.location.href = '/'} className='x' src='/img/x.svg' alt='exit'/>
       <div className='left'> </div>
       <div className='middle'>
         <img src={trueEntry.fields.image.fields.file.url} alt='Story photo' />
       </div>
       <div className='right'>
         <div className='audio' onClick={updatePlayStatus}>
           <h3> Subtitles for the audio clip </h3>
           <img src={currState} className='playPause'/>
           <audio onPlay={onPlay} ref={audioEl} onTimeUpdate={updateTime} autoPlay controls src={audio.fields.file.url} />
         </div>
         <div className='links'>
           <p> Listen to the entire series on </p>
           <a href='https://espn.com/nba'> Spotify, </a>
           <a href='https://espn.com/nba'> iTunes, </a>
           <p> or </p>
           <a className='fin' href='https://espn.com/nba' target='_blank'> Soundcloud </a>
           <p className='period'> . </p>
         </div>
       </div>

      <style jsx> {`
        .Story {
          height: 100%;
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        .Story .x {
          position: absolute;
          top: 25px;
          right: 25px;
          height: 40px;
          width: 40px;
          z-index: 2;
        }

        .Story .state {
          position: absolute;
        }

        .state {
          position: absolute;
          top: 5px;
          left: -25px;
          z-index: -1;
        }

        .left {
          width: 20%;
          height: 100vh;
        }

        .middle {
          width: 35%;
          min-width: 350px;
          height: 100vh;
        }

        .middle img {
          margin-top: 100px;
          width: 100%;
        }

        .links {
          display: flex;
          justify-content: center;
          position: absolute;
          bottom: 75px;
          width: 70%;
        }

        .links * {
          margin: 0px 2px;
          font-size: 14px;
          white-space: nowrap;
        }

        .links .fin {
          margin-right: 0px;
        }

        .links .period {
          margin: 0;
        }

        .audio {
          width: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          padding: 25px;
          height: 400px;
        }

        .audio h3 {
          margin-bottom: 40px;
          font-weight: bold;
        }

        .audio audio {
          width: 75%;
          visibility: hidden;
        }

        .right {
          width: 45%;
          height: 100vh;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .right .playPause {
          height: 25px;
          width: 25px;
        }
      `}</style>
    </div>
  )
}


export default withUserAgent(Story);
