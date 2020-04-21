import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { withUserAgent } from 'next-useragent';
import ReactPlayer from 'react-player';
import { stories, getDotAssets } from '../utils';
import Layer from './Layer';

function Story(props) {
  const { state, entries } = props;
  const [fadeIn, setFadeIn] = useState(false);
  const { isMobile } = props.ua;

  const getEntries = city => {
    const miLocations = ['Detroit, Michigan', 'Highland Park, Michigan'];
    const wvLocations = ['Omar, West Virginia', 'Huntington, West Virginia'];
    const nmLocations = ['Taos, New Mexico', 'Dulce, New Mexico'];

    if (miLocations.includes(city)) {
      return entries.filter((event) => {
        return miLocations.includes(event.fields.state);
      });
    } else if (wvLocations.includes(city)) {
      return entries.filter((event) => {
        return wvLocations.includes(event.fields.state);
      });
    } else {
      return entries.filter((event) => {
        return nmLocations.includes(event.fields.state);
      });
    }
  }

  const layerRef = useRef(null);

  return isMobile ? (
    <div className='Story'>
      <Layer>
        <MobileStory entries={getEntries(state)} state={state} />
      </Layer>
      <style jsx> {`
        .Story {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
        }
      `}</style>
    </div>
  ) : (
    <div className='Story'>
      <Layer>
        <DesktopStory entries={getEntries(state)} state={state} />
      </Layer>
      <style jsx> {`
        .Story {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow-y: scroll;
        }
      `}</style>
    </div>
  )
}

function MobileStory(props) {
  const { entry, state } = props;
  const { audio } = entry.fields;
  const storyImage = entry.fields.image.fields.file.url;
  const [playing, setPlaying] = useState(false);
  const currState = !playing ? '/img/play.svg' : '/img/pause.svg';
  const audioEl = useRef(null);
  const randomDotStyles = {
    background: getDotAssets(state).color,
  }

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
        <div style={randomDotStyles} className='randomDot'> </div>
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
          min-height: 90vh;
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

        .MobileStory .randomDot {
          border-radius: 100%;
          height: 50px;
          width: 50px;
          position: absolute;
          top: -13px;
          left: 275px;
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
  const [playing, setPlaying] = useState(null);
  const { entries } = props;
  const [currAudio, setCurrAudio] = useState(null);

  const initName = playing ? playing : entries[0].fields.name;
  const [name, setName] = useState(initName);
  const [donePlaying, setDonePlaying] = useState(false);
  const [currTime, setCurrTime] = useState(null);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [currSubtitle, setCurrSubtitle] = useState(stories[name][captionIndex].text);
  const audioEl1 = useRef(null);
  const audioEl2 = useRef(null);

  const updatePlayStatus = (name, currRef) => {
    const firstRowNames = ['Lorene', 'Baba', 'Shannon'];
    if (firstRowNames.includes(name)) {
      if (playing === name) {
        currRef.current.pause();
        setPlaying(null);
      } else if (playing !== name && playing !== null) {
        audioEl2.current.pause();
        audioEl2.current.currentTime = 0;
        currRef.current.play();
        setPlaying(name);
        setName(name);
        setCurrSubtitle(stories[name][captionIndex].text);
      } else {
        currRef.current.play();
        setName(name);
        setPlaying(name);
        setCurrSubtitle(stories[name][captionIndex].text);
      }
    } else {
      if (playing === name) {
        currRef.current.pause();
        setPlaying(null);
      } else if (playing !== name && playing !== null) {
        audioEl1.current.pause();
        audioEl1.current.currentTime = 0;
        currRef.current.play();
        setPlaying(name);
        setName(name);
        setCurrSubtitle(stories[name][captionIndex].text);
      } else {
        currRef.current.play();
        setName(name);
        setPlaying(name);
        setCurrSubtitle(stories[name][captionIndex].text);
      }
    }
  }

  const onPause = () => {
    clearInterval(currentTimeInterval);
  }

  const updateTime = () => {
    if (!playing) {
      return;
    }
    const firstRowNames = ['Lorene', 'Baba', 'Shannon'];
    if (firstRowNames.includes(playing)) {
      const { currentTime, duration } = audioEl1.current;
      const timeToChange = stories[playing][captionIndex].time;

      if (currentTime === duration) {
        setDonePlaying(true);
      }

      if (currentTime > timeToChange) {
        if (stories[name][captionIndex + 1]) {
          setCurrSubtitle(stories[playing][captionIndex + 1].text);
          setCaptionIndex(captionIndex + 1);
        }
      }

      const currentAudioTime = Math.floor(currentTime);
      setCurrTime(currentAudioTime);
      console.log(name, currSubtitle, currentAudioTime);
    } else {
      const { currentTime, duration } = audioEl2.current;
      const timeToChange = stories[playing][captionIndex].time;

      if (currentTime === duration) {
        setDonePlaying(true);
      }

      if (currentTime > timeToChange) {
        if (stories[name][captionIndex + 1]) {
          setCurrSubtitle(stories[playing][captionIndex + 1].text);
          setCaptionIndex(captionIndex + 1);
        }
      }

      const currentAudioTime = Math.floor(currentTime);
      setCurrTime(currentAudioTime);
      console.log(name, currSubtitle, currentAudioTime);
    }
  }

  const transcript = stories[playing];

  return (
    <div className='DesktopStory'>
    <img onClick={() => window.location.href = '/'} className='x' src='/img/x.svg' alt='exit'/>
      {entries.map((entry, i) => {
        const { image, name, state, audio } = entry.fields;
        const { url } = image.fields.file;
        const currRef = i === 0 ? audioEl1 : audioEl2;
        const currState = playing === null ? '/img/play.svg' : playing === name ? '/img/pause.svg' : '/img/play.svg';
        return (
          <div className='DesktopStory-body'>
            <div className='left'>
              <img src={url} alt={name} />
            </div>
            <div className='right'>
              { playing === name && (
                <h3> {currSubtitle} </h3>
              )}
              { playing !== name && (
                <h3> {name + ' of ' + state} </h3>
              )}
              <img onClick={() => updatePlayStatus(name, currRef)} className='playPause' src={currState} />
              <audio src={audio.fields.file.url} ref={currRef} onTimeUpdate={updateTime} />
            </div>
          </div>
        )
      })}
      <div className='links'>
        <p> Listen to the entire series on </p>
        <a href='https://espn.com/nba'> Spotify, </a>
        <a href='https://espn.com/nba'> iTunes, </a>
        <p> or </p>
        <a className='fin' href='https://espn.com/nba' target='_blank'> Soundcloud </a>
        <p className='period'> . </p>
      </div>


      <style jsx> {`
        .DesktopStory {
          padding: 25px;
          height: 100%;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow-y: scroll;
          position: relative;
          top: 0;
          left: 0;
          background: white;
          z-index: 2;
        }

        .DesktopStory-body {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .DesktopStory .x {
          position: absolute;
          top: 25px;
          right: 25px;
          height: 40px;
          width: 40px;
          z-index: 2;
        }

        .playPause {
          margin-top: 20px;
          height: 30px;
          width: 30px;
        }

        .left, .right {
          width: 50%;
          min-height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .right {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .right h3 {
          font-size: 22px;
          width: 75%;
          text-align: center;
        }

        .links {
          position: absolute;
          bottom: 25px;
          left: 75%;
          transform: translateX(-50%);
        }

        .links * {
          white-space: nowrap;
        }

        .left {
          flex-direction: column;
        }

        .left img {
          width: 100%;
          padding: 15px;
        }
      `}</style>
    </div>
  )
}


export default withUserAgent(Story);
