import React from "react";
import Slider from "react-slick";
import { cards } from "../../Data";
import CatCard from "../catCards/CatCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Categories() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of slides visible
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {cards.map((item, index) => (
        <div key={index} style={{ display: "flex" }}>
          <CatCard item={item} />
        </div>
      ))}
    </Slider>
  );
}
