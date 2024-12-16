"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const CustomMotionImage = ({
  src,
  alt,
  left,
  duration,
}: {
  src: string;
  alt: string;
  left: boolean;
  duration: number;
}) => (
  <motion.div
    initial={{ x: `${left ? "-" : ""}100%`, opacity: 0 }}
    transition={{ duration: duration, ease: "anticipate" }}
    viewport={{ once: true }}
    whileInView={{ x: 0, opacity: 1 }}
  >
    <Image
      alt={alt}
      className="w-full h-auto rounded-md"
      src={src}
      style={{ boxShadow: "0px 5px 5px rgba(220, 210, 250, 250)" }}
      width={350}
      height={350}
      layout={"responsive"}
    />
  </motion.div>
);

export default CustomMotionImage;
