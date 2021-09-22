import React, { useEffect, useState } from 'react';
import { Window, TitleBar, Text } from 'react-desktop/macOs';
import { useHistory } from 'react-router';
import { userService } from '../../services/user.service';
import Dock from '../Doc';
import WindowArea from '../WindowArea';

const Home = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  console.log(user);
  const [currentApp, setCurrentApp] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const getName = () => {
    const name = user.email.split('@')[0];
    return name;
  };
  const handleClose = () => {
    userService.logout();
    history.push('/login');
  };
  return (
    <Window className='window' chrome height='100vh' padding='10px'>
      <TitleBar className='title__bar' controls onCloseClick={handleClose} />
      <Text size='28px' className='text'>
        Welcome {user.email && getName()}
      </Text>
      <div className='window__area'>
        <WindowArea currentApp={currentApp} setCurrentApp={setCurrentApp} />
      </div>

      <section className='doc__wrapper'>
        <Dock setCurrentApp={setCurrentApp} />
      </section>
    </Window>
  );
};

export default Home;
