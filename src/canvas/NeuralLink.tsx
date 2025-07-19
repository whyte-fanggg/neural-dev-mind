import { Line } from '@react-three/drei'

type Props = {
  start: [number, number, number]
  end: [number, number, number]
}

export default function NeuralLink({ start, end }: Props) {
  return (
    <Line
      points={[start, end]}
      color="#00ffff"
      lineWidth={1}
      dashed={false}
      transparent
      opacity={0.3}
    />
  )
}
