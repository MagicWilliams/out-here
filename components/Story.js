import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { withUserAgent } from 'next-useragent';
import ReactPlayer from 'react-player';
import { stories } from '../utils';
import Layer from './Layer';

function Story(props) {
  const { entries, state } = props;
  const [fadeIn, setFadeIn] = useState(false);
  const { isMobile } = props.ua;
  const entry = props.entries.filter((event) => {
    return event.fields.state === props.state;
  })
  const layerRef = useRef(null);

  if (!entry[0]) {
    return null;
  }

  return isMobile ? (
    <div className='Story'>
      <Layer>
        <MobileStory entry={entry[0]} state={state} />
      </Layer>
      <style jsx> {`
        .Story {
          min-width: 100vw;
        }
      `}</style>
    </div>
  ) : (
    <div className='Story'>
      <Layer>
        <DesktopStory entry={entry[0]} state={state} />
      </Layer>
      <style jsx> {`
        .Story {
          min-width: 100vw;
        }
      `}</style>
    </div>
  )
}

function MobileStory(props) {
  const { entry, state } = props;
  const { audio, subtitles } = entry.fields;
  const storyImage = entry.fields.image.fields.file.url;
  const [playing, setPlaying] = useState(false);
  const currState = !playing ? '/img/play.svg' : '/img/pause.svg';
  const audioEl = useRef(null);


  const updatePlayStatus = () => {
    if (playing) {
      audioEl.current.pause();
    } else {
      audioEl.current.play();
    }
    setPlaying(!playing);
  }

  return (
    <div className='MobileStory'>
      <img className='state' src='/img/state.png' />
      <img onClick={() => window.location.href = '/'} className='x' src='/img/x.svg' alt='exit'/>
      <h1 className='state'></h1>
      <div className='img-container' onClick={updatePlayStatus}>
        <img className='main-img' src={storyImage} alt='Story photo' />
        <h3 className='title'> Kim Gordon of West Virginia </h3>
      </div>

      <div className='audio'>
        <audio id='audiofile' ref={audioEl} src={audio.fields.file.url} />
      </div>

      <img src={currState} className='playPause' onClick={updatePlayStatus} />

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
          width: 95%;
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

        .playPause {
          margin-top: 20px;
          height: 40px;
          width: 40px;
        }
      `}</style>
    </div>
  );
}

function DesktopStory(props) {
  const { entry, state } = props;
  const { audio, subtitles, image, name } = entry.fields;
  const [playing, setPlaying] = useState(false);
  const [donePlaying, setDonePlaying] = useState(false);
  const [currTime, setCurrTime] = useState(null);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [currSubtitle, setCurrSubtitle] = useState(stories[name][captionIndex].text);
  const audioEl = useRef(null);

  const updatePlayStatus = () => {
    if (playing) {
      audioEl.current.pause();
    } else {
      audioEl.current.play();
    }
    setPlaying(!playing);
  }

  const onPause = () => {
    clearInterval(currentTimeInterval);
  }

  const updateTime = () => {
    const { currentTime, duration } = audioEl.current;
    const timeToChange = stories[name][captionIndex].time;

    if (currentTime === duration) {
      setDonePlaying(true);
    }

    if (currentTime > timeToChange) {
      if (stories[name][captionIndex + 1]) {
        setCurrSubtitle(stories[name][captionIndex + 1].text);
        setCaptionIndex(captionIndex + 1);
      }
    }

    const currentAudioTime = Math.floor(currentTime);
    setCurrTime(currentAudioTime);

  }

  const storyImage = image.fields.file.url;
  const currState = !playing ? '/img/play.svg' : '/img/pause.svg';
  const transcript = stories[name];

  return (
    <div className='Story'>
    <img className='state' src='/img/state.png' />
      <img onClick={() => window.location.href = '/'} className='x' src='/img/x.svg' alt='exit'/>
       <div className='left'> </div>
       <div className='middle'>
         <img src={entry.fields.image.fields.file.url} alt='Story photo' />
       </div>
       <div className='right'>
         <div className='audio' onClick={updatePlayStatus}>
           { donePlaying && (
             <h2 className='caption'> Listen to the entire series on Spotify, iTunes, or Soundcloud </h2>
           )}
           { !donePlaying && (
             <h2 className='caption'> {playing ? currSubtitle : name + ' of ' + state} </h2>
           )}
           <img src={currState} className='playPause'/>
           <audio ref={audioEl} onTimeUpdate={updateTime} autoPlay controls src={audio.fields.file.url} />
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

        .caption {
          text-align: center;
          width: 75%;
          padding: 25px;
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

        .audio h2 {
          margin-bottom: 40px;
          font-weight: ${ playing ? 'normal' : 'bold'} ;
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
