import React from "react";
import TopBanner from "../components/layout/TopBanner";
import Navbar from "../components/layout/Navbar";
import Home from "../components/pages/Home";
import Footer from "../components/layout/Footer";

export default function Page() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <main >
       <Home/>
      </main>
      <Footer/>
    </>
  );
}