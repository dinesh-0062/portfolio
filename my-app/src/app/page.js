import SceneLoader from "@/components/three/SceneLoader";
import StageWatcher from "@/components/StageWatcher";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/services";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/work";
import Journey from "@/components/sections/journey";
import Posts from "@/components/sections/posts";
import Contact from "@/components/sections/Contact";
import LeetCode from "@/components/sections/LeetCode";

export default function Home() {
  return (
    <>
      <SceneLoader />
      <StageWatcher />
      <Navbar />
      <main className="content">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Work />
        <LeetCode/>
        <Journey />
        <Posts />
        <Contact />
      </main>
    </>
  );
}