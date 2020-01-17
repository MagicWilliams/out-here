import React from 'react';
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

class MobileStory extends React.PureComponent {
  render () {
    const { entry, state } = this.props;
    const { audio, subtitles } = this.props.entry[0].fields;
    const storyImage = entry[0].fields.image.fields.file.url;
    new audioSync({
      audioPlayer: 'audiofile', // the id of the audio tag
      subtitlesContainer: 'subtitles', // the id where subtitles should show
      subtitlesFile: subtitles.fields.file.url // the path to the vtt file
    });

    return (
      <div className='Story'>
        <h1 className='story-state'> {state} </h1>
        <img onClick={() => window.location.href = '/'} className='x' src='/img/x.svg' alt='exit'/>
        <h1 className='state'></h1>
        <img className='main-img' src={storyImage} alt='Story photo' />
        <div className='audio'>
          <audio id='audiofile' src={audio.fields.file.url} />
          <div id='subtitles'></div>

        </div>
        <p> Listen to the entire series on </p>
        <div className='links'>
          <a href='https://espn.com/nba'> Spotify, </a>
          <a href='https://espn.com/nba'> iTunes, </a>
          <p> or </p>
          <a className='fin' href='https://espn.com/nba' target='_blank'> Soundcloud </a>
          <p className='period'> . </p>
        </div>

        <style jsx> {`
          .Story {
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
          }

          .Story .main-img {
            width: 100%;
            margin: 15px 0px;
          }

          .Story .x {
            position: absolute;
            top: 25px;
            right: 25px;
            height: 40px;
            width: 40px;
            z-index: 2;
          }
        `}</style>
      </div>
    );
  }
}




 class DesktopStory extends React.PureComponent {
   render () {
     const { entry, state } = this.props;
     const trueEntry = entry[0];
     const { audio, subtitles, image } = trueEntry.fields;
     const storyImage = image.fields.file.url;

     return (
       <div className='Story'>
         <h1 className='story-state'> {state} </h1>
         <img onClick={() => window.location.href = '/'} className='x' src='/img/x.svg' alt='exit'/>
         <h1 className='state'></h1>
          <div className='left'> </div>
          <div className='middle'>
            <img src={trueEntry.fields.image.fields.file.url} alt='Story photo' />
          </div>
          <div className='right'>
            <div className='audio'>
              <ReactPlayer playing controls url={audio.fields.file.url}
                config={{ file: {
                  tracks: [{kind: 'subtitles', src: subtitles.fields.file.url, srcLang: 'en', default: true}]
                }}}
              />
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

           .story-state {
             position: absolute;
             top: 25px;
             left: 40px;
           }

           .state {
             position: absolute;
             top: 25px;
             left: 25px;
           }

           .left {
             width: 20%;
             height: 100vh;
           }

           .middle {
             width: 35%;
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
             bottom: 25px;
             width: 100%;
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

           .right {
             width: 45%;
             height: 100vh;
             position: relative;
             display: flex;
             justify-content: center;
             align-items: center;
           }
         `}</style>
       </div>
     );
   }
}

export default withUserAgent(Story);
