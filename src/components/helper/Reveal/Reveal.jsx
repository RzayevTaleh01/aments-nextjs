"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import styles from "./Reveal.module.scss";

const variantsByEffect = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
};

export default function Reveal({
  children,
  className,
  effect = "fadeUp",
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.2,
}) {
  const variants = variantsByEffect[effect] || variantsByEffect.fadeUp;

  return (
    <motion.div
      className={cn(styles.root, className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

