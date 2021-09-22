import React, { useState } from 'react';
import { TitleBar } from 'react-desktop/macOs';
import Webcam from 'react-webcam';

const videoConstraints = {
  facingMode: 'user',
};

export default function WebCam({ setCurrentApp }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div id='container' className='webcam__wrapper'>
      <TitleBar
        className='title__bar'
        controls
        isFullscreen={isFullscreen}
        onCloseClick={() => setCurrentApp(null)}
        onMinimizeClick={() => console.log('Minimize window')}
        onMaximizeClick={() => setIsFullscreen(!isFullscreen)}
        onResizeClick={() => setIsFullscreen(!isFullscreen)}
      />
      <Webcam
        className='webcam__wrapper'
        audio={false}
        screenshotFormat='image/jpeg'
        videoConstraints={videoConstraints}
      />
    </div>
  );
}
