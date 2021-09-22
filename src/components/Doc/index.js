import React from 'react';
import WebCam from '../WebCam';
import webcam from '../../icons/webcam.png';

export default function Dock({ setCurrentApp }) {
  const apps = [
    {
      title: 'WebCam',
      icon: 'webcam',
      content: () => <WebCam setCurrentApp={setCurrentApp} />,
    },
  ];

  const [availableApps] = React.useState(apps);

  return (
    <div className='doc'>
      <ul className=''>
        {availableApps.map((app) => (
          <li
            className='doc__item'
            key={app.title}
            onClick={() => setCurrentApp(app)}
          >
            {' '}
            <img
              className=''
              width='30px'
              height='30px'
              src={webcam}
              alt={app.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
