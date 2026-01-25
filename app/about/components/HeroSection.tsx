"use client";

import { motion } from "framer-motion";

import { title, subtitle } from "@/components/primitives";

interface HeroSectionProps {
  fadeIn: any;
  staggerContainer: any;
}

export default function HeroSection({
  fadeIn,
  staggerContainer,
}: HeroSectionProps) {
  return (
    <motion.div
      animate="visible"
      className="text-center py-16 md:py-24"
      initial="hidden"
      variants={staggerContainer}
    >
      <motion.h1
        className={title({ size: "lg", color: "blue", class: "mb-6" })}
        variants={fadeIn}
      >
        About Us
      </motion.h1>

      <motion.div
        className={subtitle({
          class: "mx-auto mb-10 mt-6 max-w-7xl text-justify",
        })}
        variants={fadeIn}
      >
        <p className="leading-relaxed pt-2">
          &nbsp;&nbsp;&nbsp;&nbsp; Listofont.com is a free demo font collection
          website featuring high-quality fonts shared by their creators for
          testing and preview purposes. These fonts can be used across platforms
          such as Adobe Photoshop, Illustrator, and Microsoft Word to help
          designers explore ideas before finalizing commercial projects.
        </p>
        <br />
        <p className="leading-relaxed">
          &nbsp;&nbsp;&nbsp;&nbsp; All demo fonts available on our site are
          intended for personal and trial use only, allowing designers to
          experiment and refine their concepts for themselves or their clients.
          Our mission is to help designers quickly discover great fonts without
          spending hours searching across countless websites. Our team carefully
          curates premium-quality fonts, handling all the hard work so our
          visitors can access them for free. Listofont.com is supported solely
          by advertising, which helps cover team operations and server costs to
          keep the site online. We are fully committed to helping designers find
          the fonts they need for their creative projects.
          <br />
          <br />— The Listofont Team
        </p>
      </motion.div>
    </motion.div>
  );
}
