import React, { useState } from 'react';
import { getDotAssets } from '../utils';
import Story from './story';

function MobileHome(props) {
  const [story, setStory] = useState(null);
  const { entries } = props;
  return (
    <div>
      { story !== null && (
        <Story entries={entries} state={story} />
      )}

      { story === null && (
        <div className='MobileHome'>

          <img className='main' src='/img/main-img.png' alt='out-here' />
          { entries.map((entry, i) => {
            const { state } = entry.fields;
            const { stateImg, color, mobileTop, mobileLeft } = getDotAssets(state);
            const colorStyles = {
              background: color
            }
            const positionStyles = {
              top: mobileTop +'%',
              left: mobileLeft +'%',
            }
            return (
              <div style={positionStyles} onClick={() => setStory(state)} className='dot-container'>
                <div style={colorStyles} className='dot' key={i}></div>
                <img src={stateImg} className='state-img' alt={state} />
              </div>
            )
          })}
          <h3> About </h3>

          <style jsx>{`
            .MobileHome {
              height: 100%;
              min-height: 100vh;
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              padding: 15px;
              padding-top: 45px;
              position: relative;
            }

            .main {
              width: 100%;
              position: relative;
              top: -50px;
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

            h3 {
              position: absolute;
              bottom: 10px;
              right: 50px;
              align-self: flex-end;
              margin: 15px 25px;
            }

            .state-img {
              max-width: 100px;
            }

          `}</style>
        </div>
      )}
    </div>
  );
}

export default MobileHome;
