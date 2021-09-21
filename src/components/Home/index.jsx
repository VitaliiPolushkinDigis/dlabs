import React, { useEffect, useState } from 'react';
import { Window, TitleBar, Text } from 'react-desktop/macOs';

const Home = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <Window chrome height='100vh' padding='10px'>
      <TitleBar title='Mord OS' controls />
      <Text>Hello World</Text>
    </Window>
  );
};

export default Home;
