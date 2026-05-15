import React, { useEffect, useState } from "react";
import RecentProducts from "./components/RecentProducts/RecentProducts";
import PopluarCategories from "./components/PopluarCategories/PopluarCategories";
import StaticSliders from "./components/staticSliders/staticSliders";




export default function Home() {
  return(<>
      <StaticSliders />
      <PopluarCategories />
      <RecentProducts />
  </>
  ) 
}
