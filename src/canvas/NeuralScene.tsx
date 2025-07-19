import { Canvas } from "@react-three/fiber"
import { Suspense, useMemo } from "react"
import NeuronNode from "./NeuronNode"
import NeuralLink from "./NeuralLink"
import { nodeData } from "../data/nodes"
import type { NodeData } from "../data/nodes"

type Props = {
  onNodeClick?: (data: NodeData) => void
  timelineYear: number
}

export default function NeuralScene({ onNodeClick, timelineYear }: Props) {
  // Freeze positions at first render
  const nodes = useMemo(
    () =>
      Array.from({ length: 25 }, () => [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ]) as [number, number, number][],
    []
  )

  const links = useMemo(
    () =>
      Array.from({ length: 40 }, () => {
        const i = Math.floor(Math.random() * nodes.length)
        let j = Math.floor(Math.random() * nodes.length)
        while (j === i) j = Math.floor(Math.random() * nodes.length)
        return [nodes[i], nodes[j]]
      }) as [[number, number, number], [number, number, number]][],
    [nodes]
  )

  return (
    <Canvas
      eventPrefix="client"
      camera={{ position: [0, 0, 15], fov: 60 }}
      style={{ position: "fixed", inset: 0, zIndex: 10 }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Render neuron nodes */}
        {nodes.map((pos, i) => {
          const data = nodeData[i]
          const isActive = data?.year === timelineYear

          return (
            <NeuronNode
              key={i}
              position={pos}
              hasData={!!data}
              active={isActive}
              label={isActive ? data?.title : undefined}
              onClick={() => data && onNodeClick?.(data)}
            />
          )
        })}

        {/* Connect nodes with lines */}
        {links.map(([start, end], i) => (
          <NeuralLink key={i} start={start} end={end} />
        ))}
      </Suspense>
    </Canvas>
  )
}
