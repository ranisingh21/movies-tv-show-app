import React from 'react';

function Slider() {
return (
    <> 
       <div className="sliderCotainer">
       <div className="imageContainer1">
    <img 
        src="https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/400x600/2024/abhishek-kapoor-s-next/abhishek-kapoor-s-next-1737014981.jpg" 
        className="imageContainer" 
        alt="Second Slide" 
    />
</div>
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
        <div className="carousel-item active">
            <img src="https://v3img.voot.com/v3Storage/assets/16x9-1728316195515.jpg" className="d-block w-100" alt="First Slide" />
        </div>
        <div className="carousel-item">
            <img src="https://wallpapercave.com/wp/wp1934740.jpg" className="d-block w-100" alt="Second Slide" />
        </div>
        <div className="carousel-item">
            <img src="https://m.media-amazon.com/images/M/MV5BOThkYjg5ZjctNmIyNS00MzY2LTg1MDgtYjcxZDVjNjdhYjE1XkEyXkFqcGc@._V1_.jpg" className="d-block w-100" alt="Third Slide" />
        </div>
        <div className="carousel-item">
            <img src="https://wallpapercave.com/wp/wp4102519.jpg" className="d-block w-100" alt="Third Slide" />
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
        <div className="imageContainer2">
    <img 
        src="https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/400x600/2025/bhooth-bangla/bhooth-bangla-1737454169.jpg" 
        className="imageContainer" 
        alt="Second Slide" 
    />
   </div>
        </div>
    </>        
);
}

export default Slider;
