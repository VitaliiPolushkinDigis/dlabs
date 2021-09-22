const Card = ({ item }) => {
  return (
    <div className='item'>
      <div className='item__img'>
        <img src={item.thumbnailUrl} alt='img' />
      </div>
      <div className='item__title'>{item.title}</div>
    </div>
  );
};

export default Card;
