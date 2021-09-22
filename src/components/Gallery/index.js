import { useEffect, useState } from 'react';
import { TitleBar } from 'react-desktop/macOs';
import { galleryService } from '../../services/gallery.service';
import List from './List';

const Gallery = ({ setCurrentApp }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    galleryService.loadImages(10).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className='gallery'>
      <TitleBar
        className='title__bar'
        controls
        isFullscreen={false}
        onCloseClick={() => setCurrentApp(null)}
        title='Gallery'
      />
      <List data={data} setPage={setPage} page={page} setData={setData} />
    </div>
  );
};

export default Gallery;
