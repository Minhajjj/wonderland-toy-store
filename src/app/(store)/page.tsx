import React from "react";
import TopBanner from "../../components/layout/TopBanner";
import Navbar from "../../components/layout/Navbar";
import Home from "../../components/pages/Home";
import Footer from "../../components/layout/Footer";
import AiChatBot from "@/src/components/ui/AiChatBot";

export default function Page() {
  return (
    <>
      <main>
        <Home />
        <AiChatBot />
      </main>
    </>
  );
}
