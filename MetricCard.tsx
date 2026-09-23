import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MetricCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  sublabel?: string;
  color: string;         // accent color (border, icon bg, value text)
  bgColor?: string;      // card background color
  textColor?: string;    // label/sublabel text color
  index?: number;
}

/**
 * MetricCard - layout horizontal estilo dashboard
 * ┌─────────────────────────────────────────────┐
 * │  [ícone]   VALOR GRANDE                     │
 * │            Label principal                  │
 * │            sublabel (opcional)              │
 * └─────────────────────────────────────────────┘
 */
export function MetricCard({
  icon,
  value,
  label,
  sublabel,
  color,
  bgColor = "#111111",
  textColor = "#9CA3AF",
  index = 0,
}: MetricCardProps) {
  return (
    <motion.div
      className="group relative flex items-center gap-4 rounded-2xl border p-5 overflow-hidden transition-all duration-500"
      style={{
        background: bgColor,
        borderColor: `${color}30`,
        boxShadow: `0 0 0 0 ${color}00`,
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{
        borderColor: `${color}70`,
        boxShadow: `0 0 28px ${color}22`,
        y: -2,
      }}
    >
      {/* Subtle glow strip on left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-500 group-hover:w-[4px]"
        style={{ background: color }}
      />

      {/* Icon container */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}18` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>

      {/* Text block */}
      <div className="flex flex-col min-w-0">
        <span
          className="text-[28px] md:text-[32px] font-black leading-none tracking-tight"
          style={{ color, fontFamily: "'Open Sans', sans-serif" }}
        >
          {value}
        </span>
        <span
          className="text-[15px] font-semibold mt-1 leading-snug"
          style={{ color: textColor }}
        >
          {label}
        </span>
        {sublabel && (
          <span
            className="text-[13px] mt-1 leading-snug opacity-90"
            style={{ color: textColor }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </motion.div>
  );
}
