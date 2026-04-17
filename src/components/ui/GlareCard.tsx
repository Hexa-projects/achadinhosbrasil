import { useRef, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

interface GlareCardProps {
  children?: ReactNode;
  imageUrl: string;
  alt?: string;
}

export const GlareCard = ({ children, imageUrl, alt = "Produto" }: GlareCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useMotionTemplate`${mouseYSpring.get() * -10}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring.get() * 10}deg`;

  // Use template strings dynamically off motion values
  const transform = useMotionTemplate`perspective(1000px) rotateX(${useMotionTemplate`${mouseYSpring}`}) rotateY(${useMotionTemplate`${mouseXSpring}`})`;

  const glareX = useMotionTemplate`${useMotionTemplate`${mouseXSpring}`}`;
  const glareBg = useMotionTemplate`radial-gradient(circle at ${useMotionTemplate`calc(50% + ${mouseXSpring} * 50%)`} ${useMotionTemplate`calc(50% + ${mouseYSpring} * 50%)`}, hsl(258 90% 66% / 0.35), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
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
        rotateY: useMotionTemplate`${mouseXSpring}` as unknown as string,
        rotateX: useMotionTemplate`${mouseYSpring}` as unknown as string,
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-10">{children}</div>
    </motion.div>
  );
};
