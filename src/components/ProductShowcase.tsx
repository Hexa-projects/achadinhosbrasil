import { motion } from "framer-motion";

const CDN = "https://cdn.shopify.com/s/files/1/0577/3076/0913/files";
const SHOP = "https://cheerdots.com/cdn/shop/files";

const showcaseImages = [
  {
    src: `${CDN}/World_s_First_ChatGPT-Enabled_Al_Voice_Mouse_500x.png?v=1716625980`,
    alt: "Primeiro Mouse com IA e ChatGPT do mundo",
  },
  {
    src: `${CDN}/1_1_1_1_1_Cheerdots_2_500x.png?v=1716636105`,
    alt: "5 dispositivos em 1 — Mouse, Touchpad, Air Mouse, Apresentador, Gravador",
  },
];

const galleryImages = [
  {
    src: `${SHOP}/2_f141782a-299b-406b-8e29-d59cd5d47a3f.png?v=1733238878&width=800`,
    alt: "CheerDots 2 — Vista frontal aberto",
  },
  {
    src: `${SHOP}/4_2ee393ee-536e-42cb-9837-e7c4db97a9d0.png?v=1733238883&width=800`,
    alt: "CheerDots 2 — Vista lateral",
  },
  {
    src: `${SHOP}/6_890b9618-079a-48ed-8f4c-d926a9b1e135.png?v=1733238891&width=800`,
    alt: "CheerDots 2 — Modo Air Mouse",
  },
  {
    src: `${SHOP}/7_9bbae14c-f01c-4e8f-84e6-d75332e70ff8.png?v=1733238895&width=800`,
    alt: "CheerDots 2 — Design magnético",
  },
];

const ProductShowcase = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-14 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
          Conheça o dispositivo
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          5 dispositivos.{" "}
          <span className="text-gradient-blue">Um só gadget.</span>
        </h2>
      </motion.div>

      {/* Main infographic images */}
      <div className="max-w-4xl mx-auto space-y-6 mb-16">
        {showcaseImages.map((img, i) => (
          <motion.div
            key={i}
            className="rounded-2xl overflow-hidden border border-border/50 shadow-sm bg-secondary/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* Product gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            className="rounded-xl overflow-hidden border border-border/50 bg-secondary/20 aspect-square flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductShowcase;
