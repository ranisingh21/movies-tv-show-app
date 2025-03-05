"use client";
import React from "react";;
import { MovieProvider, MovieContext } from "./context";
import Navbar from "./navbar"
import Slider from "./slider";
import HomePage from "./homepage";


const Page = () => {
  return (
    <MovieProvider>
      <Navbar/>
      <Slider/>
      <HomePage /> 
    
    </MovieProvider>
  );
};

export default Page;