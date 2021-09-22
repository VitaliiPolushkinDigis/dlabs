import { galleryService } from '../../services/gallery.service';
import Card from './Card';

const List = ({ data, setPage, page, setData }) => {
  const handleLoadNext = async () => {
    setPage(page + 1);
    await galleryService.loadImages(page).then((data) => {
      setData(data);
    });
  };
  const handleLoadPrev = async () => {
    if (page > 1) {
      setPage(page - 1);
      await galleryService.loadImages(page).then((data) => {
        setData(data);
      });
    }
  };
  const mapData = data.map((item) => <Card key={item.id} item={item} />);
  return (
    <div className='list'>
      {mapData}
      <div className='pages'>
        <button
          className={`btn btn-prev ${page < 2 && 'disabled'}`}
          onClick={handleLoadPrev}
        >
          Prev Page
        </button>
        <span className='page'>{page}</span>
        <button className='btn btn-next' onClick={handleLoadNext}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default List;
