import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Honors } from "@/components/Honors";
import { ScrollAnimations } from "@/components/ScrollAnimations";

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Honors />
    </>
  );
}

