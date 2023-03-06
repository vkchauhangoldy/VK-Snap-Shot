import React, { useState, useEffect } from 'react';
import axios from 'axios';
const FLICKR_API_KEY = '7e8db8566447076dbaea637efda962a4';

const Api = (props) => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await axios.get('https://api.flickr.com/services/rest', {
        params: {
          method: 'flickr.photos.search',
          api_key: FLICKR_API_KEY,
          text: props.pro, // replace with your search query or category
          format: 'json',
          nojsoncallback: 1,
          per_page: 20,
        },
      });
      console.log(response);
      setPhotos(response.data.photos.photo)
    };

    fetchPhotos();
  }, [props.pro]);

  return (
    <div className='img'>
      {photos.map(item => (
        <img key={item.id} src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`} alt={item.title} />
      ))}
    </div>
  );
};

export default Api;