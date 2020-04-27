import React, { useState } from 'react';
import { getDotAssets } from '../utils';
import Story from './Story';
import About from './About';
import Layer from './Layer';
function MobileHome(props) {
  const [story, setStory] = useState(null);
  const { entries } = props;

  return (
    <Layer>
      { story === null && (
        <div className='MobileHome'>
          <img className='main' src='/img/main-img.png' alt='out-here' />
          <img className='byline' src='/img/byline.png' alt='by Kyana Gordon' />
          <div className='nav-container'>
            <div onClick={() => setStory('Omar, West Virginia')} className='state-link'>
              <div className='nm-dot'></div>
              <img src='/img/west-virginia-01.png' alt='West Virginia' />
            </div>
            <div onClick={() => setStory('Detroit, Michigan')} className='state-link'>
              <div className='mi-dot'></div>
              <img src='/img/michigan-01.png' alt='Michigan' />
            </div>
            <div onClick={() => setStory('Taos, New Mexico')} className='state-link'>
              <div className='wv-dot'></div>
              <img src='/img/new-mexico-01.png' alt='New Mexico' />
            </div>
          </div>
          <img className='about' src='/img/about-01.png' onClick={() => setStory('About')}/>
          <style jsx>{`
            .MobileHome {
              width: 100%;
              min-height: 90vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              padding: 15px;
              position: relative;
            }

            .MobileHome .nav-container {
              width: 100%;
              padding: 25px;
              align-items: flex-start;
              justify-content: center;
              flex-direction: column;
              margin: 10px 0px;
            }

            .state-link {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: flex-start;
            }

            .nav-container img {
              height: 75px;
            }

            .nm-dot, .wv-dot, .mi-dot {
              height: 30px;
              width: 30px;
              border-radius: 100%;
              background: red;
              margin-right: 12px;
            }

            .mi-dot {
              background: #00ff00;
            }

            .wv-dot {
              background: #00fcfc;
            }

            .nm-dot {
              background: #ff00ff;
            }

            .main {
              width: 90%;
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

            .about {
              width: 90px;
            }

            h3 {
              position: absolute;
              bottom: 30px;
              right: 40px;
              align-self: flex-end;
              margin: 15px 25px;
            }

            .state-img {
              max-width: 100px;
            }

          `}</style>
        </div>
      )}
      { story === 'About' && (
        <About />
      )}
      { story !== null && story !== 'About' && (
        <Story entries={entries} state={story} />
      )}
    </Layer>
  );
}

export default MobileHome;
