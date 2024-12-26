import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "div",
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: any;
}) => {
  return (
    <Component
      className={cn(
        "relative rounded-lg p-[1px] bg-slate-800/20",
        containerClassName
      )}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: duration / 1000, repeat: Infinity, ease: "linear" }}
        className={cn(
          "absolute inset-[-1px] rounded-lg",
          borderClassName
        )}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0 340deg, white 360deg)",
        }}
      />
      <div className={cn("relative", className)}>{children}</div>
    </Component>
  );
};