import { motion } from "framer-motion"
import type { NodeData } from "../data/nodes"

type Props = {
  data: NodeData
  onClose: () => void
}

export default function NodePopup({ data, onClose }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-gray-900 text-white p-6 rounded-xl shadow-xl w-[90%] max-w-md relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-sm text-white hover:text-red-400"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-2 text-cyan-400">{data.title}</h2>
        <p className="text-sm text-slate-300 mb-4">{data.description}</p>
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-cyan-800/30 text-cyan-300 text-xs rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
