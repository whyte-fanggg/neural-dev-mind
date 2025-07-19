type Props = {
  activeYear: number
  years: number[]
}

export default function TimelineIndicator({ activeYear, years }: Props) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 space-y-2">
      {years.map((year) => (
        <div
          key={year}
          className={`text-xs md:text-sm font-medium px-2 py-1 rounded transition-all
            ${
              year === activeYear
                ? "bg-cyan-500 text-white"
                : "bg-slate-700 text-slate-300"
            }`}
        >
          {year}
        </div>
      ))}
    </div>
  )
}
