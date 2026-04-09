import React from 'react';

const Banner = ({ banner }) => {
  return (
    <div className="banner">
      <img src={banner.image} alt={banner.title} />
      <div className="banner-overlay">
        <h2>{banner.title}</h2>
      </div>
    </div>
  );
};

export default Banner;