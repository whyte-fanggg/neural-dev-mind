import { useEffect, useState } from "react"
import NeuralScene from "./canvas/NeuralScene"
import { AnimatePresence, motion } from "framer-motion"
import type { NodeData } from "./data/nodes"
import NodePopup from "./components/NodePopup"
import TimelineIndicator from "./components/TimelineIndicator"

export default function App() {
  // State to track the clicked node's data
  const [selected, setSelected] = useState<NodeData | null>(null)

  const [timelineYear, setTimelineYear] = useState<number>(2015)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY < window.innerHeight * 1) setTimelineYear(2015)
      else if (scrollY < window.innerHeight * 2) setTimelineYear(2018)
      else if (scrollY < window.innerHeight * 3) setTimelineYear(2021)
      else setTimelineYear(2024)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* 3D Canvas in the background */}
      <NeuralScene
        onNodeClick={(data) => setSelected(data)}
        timelineYear={timelineYear}
      />

      {/* Foreground UI content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          {/* Main heading with glow */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_0_10px_#00ffff]">
            Neural Dev Mind
          </h1>

          {/* Subheading */}
          <p className="text-xl text-cyan-300">Web Developer · 10+ Years</p>

          {/* Tagline */}
          <p className="text-md md:text-lg text-slate-400 max-w-xl mx-auto">
            Let’s build the future — one line of code at a time.
          </p>

          {/* Call-to-action button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold shadow-md transition-all pointer-events-auto"
          >
            View Projects
          </motion.button>
        </motion.div>
      </main>

      <section
        className="h-[100vh] bg-transparent"
        id="timeline-2015"
      ></section>
      <section
        className="h-[100vh] bg-transparent"
        id="timeline-2018"
      ></section>
      <section
        className="h-[100vh] bg-transparent"
        id="timeline-2021"
      ></section>
      <section
        className="h-[100vh] bg-transparent"
        id="timeline-2024"
      ></section>

      {/* Timeline indicator */}
      <TimelineIndicator
        activeYear={timelineYear}
        years={[2015, 2018, 2021, 2024]}
      />

      {/* Popup: appears when a node is selected */}
      <AnimatePresence mode="wait">
        {selected && (
          <NodePopup
            key="popup"
            data={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
