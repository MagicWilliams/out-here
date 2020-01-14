import React from 'react';
import { useRouter } from 'next/router';

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


export default function Story(props) {
  const { entry, state } = props;
  return (
      <DesktopStory entry={entry} state={state} />
  );
}

 class DesktopStory extends React.PureComponent {
   render () {
     const { entry, state } = this.props;
     const trueEntry = entry[0];
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

           .audio {
             width: 80%;
             background: gray;
             height: 500px;
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
