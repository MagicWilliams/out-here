import React, { useState } from 'react';
import Story from './Story';
import About from './About';
import Layer from './Layer';
import { getDotAssets } from '../utils';
const client = require('contentful').createClient({
  space: process.env.OUT_HERE_CONTENTFUL_SPACE_ID,
  accessToken: process.env.OUT_HERE_CONTENTFUL_ACCESS_TOKEN
});

DesktopHome.getInitialProps = async function(context) {
  let entries;
  await client.getEntries({
    content_type: 'entry',
  }).then((res) => {
    entries = [...res.items];
  });
  return entries;
}

function DesktopHome(props) {
  const [story, setStory] = useState(null);
  const [showState, setShowState] = useState(null);
  const { entries, state } = props;

  return (
    <Layer>
      <div className='Home'>
        { story === null && (
          <div className='body'>
            <div className='map'>
              <img src='/img/main-img.png' alt='map'/>
              { entries.map((entry, i) => {
                const { state } = entry.fields;
                const { stateImg, color, top, left } = getDotAssets(state);
                const colorStyles = {
                  background: color
                }
                const positionStyles = {
                  top: top +'%',
                  left: left +'%',
                }
                return (
                  <div style={positionStyles} onClick={() => setShowState(state)} className='dot-container'>
                    <div style={colorStyles} className='dot' key={i}></div>
                  </div>
                )
              })}
            </div>
            <img className='about' onClick={() => setStory('About')} src='/img/about-01.png' alt='about' />
            <div className='legend'>
              <div className='legend-entry' onClick={() => setShowState('Detroit, Michigan')}>
                <div className='mi-dot'></div>
                <img className='state-img' src='img/michigan-01.png' />
              </div>
              <div className='legend-entry' onClick={() => setShowState('Omar, West Virginia')}>
                <div className='wv-dot'></div>
                <img className='state-img' src='img/west-virginia-01.png' />
              </div>
              <div className='legend-entry' onClick={() => setShowState('Taos, New Mexico')}>
                <div className='nm-dot'></div>
                <img className='state-img' src='img/new-mexico-01.png' />
              </div>
            </div>
          </div>
        )}
        { story === 'About' && (
          <About />
        )}
        { showState !== null && story !== 'About' && (
          <Story entries={entries} state={showState} />
        )}

        <style jsx>{`
          .Home {
            height: 100vh;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
          }

          .body {
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 40px;
            flex: 1;
          }

          .map {
            width: 80%;
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

          .dot, .mi-dot, .nm-dot, .wv-dot {
            border-radius: 100%;
            background: #00fcfc;
            height: 30px;
            width: 30px;
            flex: none;
          }

          .wv-dot {
            background: rgba(255, 0, 255, 1);
          }

          .mi-dot {
            background: rgba(0, 255, 0, 1);
          }

          .dot-container img {
            width: 150px;
          }

          .about {
            position: absolute;
            width: 80px;
            top: 30px;
            right: 30px;
          }

          .about img {
            width: 100%;
          }

          .details {
            width: 50%;
            display: flex;
            align-items: flex-start;
            position: relative;
            top: -90px;
          }

          .details img {
            width: 50%;
            margin-top: 2.5%;
            max-width: 500px;
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

          .legend {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            position: absolute;
            right: 2vw;
            bottom: 25px;
          }

          .legend .dot, .mi-dot, .nm-dot, .wv-dot {
            margin-right: 7px;
          }

          .legend-entry {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 10px;
          }

          .legend .state-img {
            height: 40px;
          }
        `}</style>
      </div>
    </Layer>
  );
};

export default DesktopHome;
