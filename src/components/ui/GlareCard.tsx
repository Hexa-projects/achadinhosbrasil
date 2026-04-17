import { useRef, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

interface GlareCardProps {
  children?: ReactNode;
  imageUrl: string;
  alt?: string;
}

export const GlareCard = ({ children, imageUrl, alt = "Produto" }: GlareCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateY = useTransform(xSpring, (v) => `${v * 12}deg`);
  const rotateX = useTransform(ySpring, (v) => `${v * -12}deg`);

  const glareX = useTransform(xSpring, (v) => `${50 + v * 50}%`);
  const glareY = useTransform(ySpring, (v) => `${50 + v * 50}%`);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, hsl(258 90% 66% / 0.45), transparent 55%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full aspect-video md:aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_hsl(258_90%_66%/0.4)]"
    >
      <img
        src={imageUrl}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        loading="lazy"
      />
      <motion.div
        className="absolute inset-0 mix-blend-overlay pointer-events-none"
        style={{ background: glareBg }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-10">{children}</div>
    </motion.div>
  );
};
