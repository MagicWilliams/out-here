import React, { useState, useRef } from 'react';
import useTimeout from 'use-timeout'

export default function Layer(props) {
  const layerRef = useRef(null);
  useTimeout(() => layerRef.current.classList.toggle('hiding'), 300)

  return (
    <div>
      <div ref={layerRef} className='layer'>
      </div>
      {props.children }
      <style jsx> {`
        .layer {
          width: 100%;
          height: 100vh;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 3;
          opacity: 1;
          background: #fff;
          transition: opacity .5s ease-in-out,  z-index .5s ease-in-out;
        }

        .hiding {
          opacity: 0;
          z-index: -3;
        }
      `} </style>
    </div>
  );
}
