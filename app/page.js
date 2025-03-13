"use client";
import React from "react";
import { MovieDataProvider } from "./context";
import Navbar from "./navbar";
import Slider from "./slider";
import HomePage from "./homepage";
import Footer from "./footer";

const Page = () => {
  return (
    <MovieDataProvider>
      <Navbar />
      <Slider />
      <HomePage />
      <Footer />
    </MovieDataProvider>
  );
};

export default Page;
