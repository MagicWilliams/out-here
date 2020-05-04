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
  const [playing, setPlaying] = useState(null);
  const { entries } = props;
  const [currAudio, setCurrAudio] = useState(null);
  const firstRow = ['Lorene', 'Baba', 'Shannon'];
  const initName = playing ? playing : entries[0].fields.name;
  const [name, setName] = useState(initName);
  const [donePlaying, setDonePlaying] = useState(null);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [currSubtitle, setCurrSubtitle] = useState(stories[name][captionIndex].text);
  const audioEl1 = useRef(null);
  const audioEl2 = useRef(null);
  const audioEl = playing === entries[0].fields.name ? audioEl1 : audioEl2;
  const updatePlayStatus = (name) => {
    const audioEl = firstRow.includes(name) ? audioEl1 : audioEl2;
    const otherAudioEl = firstRow.includes(name) ? audioEl2 : audioEl1;
    if (donePlaying === name) {
      setDonePlaying(null);
    }

    if (playing === name) {
      audioEl.current.pause();
      setPlaying(null);
    } else if (playing !== null && playing !== name) {
      otherAudioEl.current.pause();
      setCaptionIndex(0);
      audioEl.current.currentTime = 0;
      otherAudioEl.current.currentTime = 0;
      audioEl.current.play();
      setName(name);
      setCurrSubtitle(stories[name][0].text);
      setPlaying(name);
    } else {
      setName(name);
      setCurrSubtitle(stories[name][0].text);
      setPlaying(name);
      audioEl.current.play();
    }
  }

  const getCaption = (playing, time) => {
    const whichStory = stories[playing];
    const allFittingCaptions = whichStory.filter((cap, i) => {
      return cap.time > time;
    });
    const cap = allFittingCaptions[0];
    const i = whichStory.indexOf(cap);
    const capData = {
      time: cap ? cap.time : 0,
      caption: cap ? cap.text : null,
      index: cap ? i : 0,
    };

    return capData
  }

  const finishListening = name => {
    setDonePlaying(name);
    setPlaying(null);
    setCaptionIndex(0);
  }

  const updateTime = () => {
    if (!playing) {
      return;
    }

    const audioEl = firstRow.includes(name) ? audioEl1 : audioEl2;
    const otherAudioEl = firstRow.includes(name) ? audioEl2 : audioEl1;
    const { currentTime, duration } = audioEl.current;
    const cap = getCaption(playing, currentTime);
    const i = cap.index;

    if (currentTime === duration) {
      finishListening(name)
    }

    if (currentTime > cap.time - .25) {
      if (stories[playing][i + 1]) {
        setCurrSubtitle(stories[playing][i + 1].text);
        setCaptionIndex(i + 1);
      }
    }
  }


  return (
    <div className='MobileStory'>
      <img className='state' src='/img/state.png' />
      <img onClick={() => window.location.href = '/'} className='x' src='/img/x.svg' alt='exit'/>
      <h1 className='state'></h1>
      { entries.map((entry, i) => {
        const { image, name, state, audio } = entry.fields;
        const { url } = image.fields.file;
        const audioElement = i % 2 === 0 ? audioEl1 : audioEl2;
        const currState = donePlaying === name ? '/img/replay.svg' : playing === null ? '/img/play.svg' : playing === name ? '/img/pause.svg' : '/img/play.svg';
        return (
          <div className='entry'>
            <div className='img-container' onClick={() => updatePlayStatus(name)}>
              <img className='main-img' src={url} alt='Story photo' />
            </div>

            <div className='audio'>
              <audio id='audiofile' ref={audioElement} src={audio.fields.file.url} onTimeUpdate={updateTime}/>
              { playing === name && (
                <h3> {currSubtitle} </h3>
              )}
              { playing !== name && donePlaying !== name && (
                <h3> {name + ' of ' + state} </h3>
              )}
              { donePlaying === name && (
                <div className="replay-container">
                  <p> Listen to the entire series on </p>
                  <div className='replay-links'>
                    <a href='https://espn.com/nba'> Spotify, </a>
                    <a href='https://espn.com/nba'> iTunes, </a>
                    <p> or </p>
                    <a className='last-link' href='https://espn.com/nba' target='_blank'> Soundcloud </a>
                    <p className='period'> . </p>
                  </div>
                </div>
              )}
              <img src={currState} className='playPause' onClick={() => updatePlayStatus(name)} />
            </div>
          </div>
        )
      })}

      { !donePlaying && (
        <div className='mobile-links'>
          <p> Listen to the entire series on </p>
          <div>
            <a href='https://espn.com/nba'> Spotify, </a>
            <a href='https://espn.com/nba'> iTunes, </a>
            <p> or </p>
            <a className='fin' href='https://espn.com/nba' target='_blank'> Soundcloud </a>
            <p className='period'> . </p>
          </div>
        </div>
      )}

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

        .MobileStory .audio h3 {
          width: 75%;
          text-align: center;
          margin: 10px 0px;
          margin-top: 25px;
        }

        .MobileStory .x {
          position: fixed;
          top: 25px;
          right: 25px;
          height: 40px;
          width: 40px;
          z-index: 2;
        }

        .MobileStory .entry {
          margin: 10px 0px;
        }

        .MobileStory .audio {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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

        .MobileStory .replay-links, .mobile-links {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .MobileStory .replay-links *, .mobile-links * {
          margin: 0px 2px;
          font-size: 14px;
          white-space: nowrap;
          width: 100%;
        }

        .mobile-links * {
          margin-left: 0px;
        }

        .last-link {
          margin-right: 0px;
        }

        .mobile-links {
          flex-direction: column;
          width: 50%;
          text-align: center;
          margin: 25px 0px;
        }

        .mobile-links div {
          display: flex;
        }

        .mobile-links .period {
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
  const firstRow = ['Lorene', 'Baba', 'Shannon'];
  const initName = playing ? playing : entries[0].fields.name;
  const [name, setName] = useState(initName);
  const [donePlaying, setDonePlaying] = useState(null);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [currSubtitle, setCurrSubtitle] = useState(stories[name][captionIndex].text);
  const audioEl1 = useRef(null);
  const audioEl2 = useRef(null);

  const updatePlayStatus = (name) => {
    const audioEl = firstRow.includes(name) ? audioEl1 : audioEl2;
    const otherAudioEl = firstRow.includes(name) ? audioEl2 : audioEl1;

    if (donePlaying === name) {
      setDonePlaying(null);
    }

    if (playing === name) {
      audioEl.current.pause();
      setPlaying(null);
    } else if (playing !== null && playing !== name) {
      otherAudioEl.current.pause();
      setCaptionIndex(0);
      audioEl.current.currentTime = 0;
      otherAudioEl.current.currentTime = 0;
      audioEl.current.play();
      setName(name);
      setCurrSubtitle(stories[name][0].text);
      setPlaying(name);
    } else {
      setName(name);
      setCurrSubtitle(stories[name][0].text);
      setPlaying(name);
      audioEl.current.play();
    }
  }

  const onPause = () => {
    clearInterval(currentTimeInterval);
  }

  const getCaption = (playing, time) => {
    const whichStory = stories[playing];
    const allFittingCaptions = whichStory.filter((cap, i) => {
      return cap.time > time;
    });
    const cap = allFittingCaptions[0];
    const i = whichStory.indexOf(cap);
    const capData = {
      time: cap ? cap.time : 0,
      caption: cap ? cap.text : null,
      index: cap ? i : 0,
    };

    return capData
  }

  const finishListening = name => {
    setDonePlaying(name);
    setPlaying(null);
    setCaptionIndex(0);
  }

  const updateTime = () => {
    if (!playing) {
      return;
    }

    const audioEl = firstRow.includes(name) ? audioEl1 : audioEl2;
    const otherAudioEl = firstRow.includes(name) ? audioEl2 : audioEl1;
    const { currentTime, duration } = audioEl.current;
    const cap = getCaption(playing, currentTime);
    const i = cap.index;

    if (currentTime === duration) {
      finishListening(name)
    }

    if (currentTime > cap.time - .25) {
      if (stories[playing][i + 1]) {
        setCurrSubtitle(stories[playing][i + 1].text);
        setCaptionIndex(i + 1);
      }
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
        const currState = donePlaying === name ? '/img/replay.svg' : playing === null ? '/img/play.svg' : playing === name ? '/img/pause.svg' : '/img/play.svg';
        return (
          <div className='DesktopStory-body'>
            <div className='left'>
              <img src={url} alt={name} />
            </div>
            <div className='right'>
              { playing === name && (
                <h3> {currSubtitle} </h3>
              )}
              { playing !== name && donePlaying !== name && (
                <h3> {name + ' of ' + state} </h3>
              )}
              { donePlaying === name && (
                <div className="replay-container">
                  <p> Listen to the entire series on </p>
                  <div className='replay-links'>
                    <a href='https://espn.com/nba'> Spotify, </a>
                    <a href='https://espn.com/nba'> iTunes, </a>
                    <p> or </p>
                    <a className='last-link' href='https://espn.com/nba' target='_blank'> Soundcloud </a>
                    <p className='period'> . </p>
                  </div>
                </div>
              )}
              <img onClick={() => updatePlayStatus(name)} className='playPause' src={currState} />
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
          position: fixed;
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

        .last-link {
          margin-right: 0px;
        }

        .replay-container p {
          font-size: 20px;
          text-align: center;
        }

        .replay-container .period {
          margin: 0px;
        }

        .replay-links, .links * {
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
