import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Mesh } from "three"
import { useCursor, Html } from "@react-three/drei"

type Props = {
  position: [number, number, number]
  onClick?: () => void
  label?: string
  hasData?: boolean // Whether node has real data/project
  active?: boolean // Whether node is in active timeline year
}

export default function NeuronNode({
  position,
  onClick,
  label,
  hasData = false,
  active = false,
}: Props) {
  const ref = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useCursor(hovered)

  useFrame(({ clock }) => {
    // Pulse only active nodes
    const baseScale = hasData ? 0.65 : 0.5
    const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.1
    const scale = baseScale + (active ? pulse : 0)
    ref.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        if (onClick) onClick()
      }}
    >
      {/* Glowing node sphere */}
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial
        color={hasData ? '#00ffff' : '#3b82f6'} // tailwind blue-500
        emissive={hasData ? "#00ffff" : "#1e293b"} // Glow only if real data
        emissiveIntensity={active ? (hasData ? 2.5 : 1.2) : 0.4}
      />

      {/* Show tag label only if hovered AND node is active */}
      {hovered && label && (
        <Html distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div className="text-xs bg-cyan-900/80 text-cyan-300 px-2 py-0.5 rounded shadow">
            {label}
          </div>
        </Html>
      )}
    </mesh>
  )
}
