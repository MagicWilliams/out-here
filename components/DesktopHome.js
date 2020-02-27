import React, { useState } from 'react';
import Story from './story';
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
  const [entry, setEntry] = useState(null);
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
                    <div style={positionStyles} onClick={() => setStory(state)} className='dot-container'>
                      <div style={colorStyles} className='dot' key={i}></div>
                      <img src={stateImg} className='state-img' alt={state} />
                    </div>
                  )
                })}
              </div>
              <h3 className='about' onClick={() => setStory('About')}> About </h3>
          </div>
        )}
        { story === 'About' && (
          <About />
        )}
        { story !== null && story !== 'About' && (
          <Story entries={entries} state={story} />
        )}

        <style jsx>{`
          .Home {
            height: 100%;
            max-height: 100vh;
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

          .dot-container .dot {
            border-radius: 100%;
            background: #00fcfc;
            height: 40px;
            width: 40px;
            flex: none;
          }

          .dot-container img {
            width: 150px;
          }

          .about {
            position: absolute;
            top: 30px;
            right: 40px;
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

        `}</style>
      </div>
    </Layer>
  );
};

export default DesktopHome;
