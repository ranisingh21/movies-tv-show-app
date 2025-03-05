import React from 'react';

function Slider() {
return (
    
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
        <div className="carousel-item active">
            <img src="https://m.media-amazon.com/images/I/717RUPA1bDL._SX3000_.jpg" className="d-block w-100" alt="First Slide" />
        </div>
        <div className="carousel-item">
            <img src="https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg" className="d-block w-100" alt="Second Slide" />
        </div>
        <div className="carousel-item">
            <img src="https://m.media-amazon.com/images/I/71j8damPo5L._SX3000_.jpg" className="d-block w-100" alt="Third Slide" />
        </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
        </button>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </div>
            
);
}

export default Slider;
