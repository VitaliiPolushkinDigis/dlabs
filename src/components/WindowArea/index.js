import React from 'react';
import Draggable from 'react-draggable';

export default function WindowArea({ currentApp }) {
  if (currentApp == null) {
    return <div />;
  }
  return (
    <Draggable>
      <div className='controll__wrapper'>
        <div className='controll'>
          {currentApp.content?.() ?? `I'm ${currentApp.title} app`}
        </div>
      </div>
    </Draggable>
  );
}
