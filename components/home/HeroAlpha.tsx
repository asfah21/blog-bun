"use client";

import {
  RiAdminFill,
  RiAedFill,
  RiBlueskyFill,
  RiFocus2Fill,
  RiGlobalFill,
  RiTimerFlashFill,
} from "react-icons/ri";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function HeroAlpha() {
  const features = [
    { title: "Managed focus", icon: <RiFocus2Fill size={22} /> },
    { title: "Real-time data", icon: <RiTimerFlashFill size={22} /> },
    { title: "Optimize Performance", icon: <RiAedFill size={22} /> },
    { title: "Role-based access", icon: <RiAdminFill size={22} /> },
    { title: "Consistent UI patterns", icon: <RiBlueskyFill size={22} /> },
    { title: "Accessible from everywhere", icon: <RiGlobalFill size={22} /> },
  ];

  return (
    <motion.section
      className="px-6 md:px-20 relative flex flex-col gap-10 w-full z-20 mt-16 mb-32"
      initial="hidden"
      variants={staggerContainer}
      viewport={{ once: true, amount: 0.3 }}
      whileInView="visible"
    >
      <motion.div className="flex flex-col gap-6 " variants={fadeIn}>
        <div className="flex gap-2 items-start justify-center">
          <h2 className="tracking-tight font-semibold text-2xl lg:text-4xl">
            Services
          </h2>
        </div>
        <p className="w-full text-small lg:text-medium text-default-500 text-justify">
          A variety of services are available on our platform to satisfy the
          various demands of people, companies, and creative professionals.
          Whether you want to manage your transactions, buy mobile credit, or
          view comprehensive reports, our services are designed to be as
          dependable, secure, and user-friendly as possible.
        </p>
        <p className="w-full text-small lg:text-medium text-default-500 text-justify">
          Every service has been meticulously crafted to uphold superior
          performance and adhere to industry norms. To give users a flawless
          experience, we constantly assess and improve our systems. Users are
          urged to review the precise terms and conditions linked to each
          service offering, even though we strive to provide consistently high
          quality.
        </p>
        <p className="w-full text-small lg:text-medium text-default-500 text-justify">
          Third-party integrations may apply to some features, which could have
          an impact on policy or service availability. It is the duty of users
          to make sure that the services are used appropriately and in
          accordance with all relevant rules and laws. We are dedicated to
          promoting user pleasure by openness, moral business practices, and
          ongoing innovation.
        </p>
      </motion.div>

      <motion.div className="flex flex-col gap-6 " variants={fadeIn}>
        <div className="flex gap-2 items-start justify-center">
          <h2 className="tracking-tight font-semibold text-2xl lg:text-4xl">
            Licences
          </h2>
        </div>
        <p className="w-full text-small lg:text-medium text-default-500 text-justify">
          The fonts on this platform can be downloaded for either personal or
          commercial use, depending on the license that goes with each one.
          Users who want to use any typeface in a project should carefully read
          the license details. Certain fonts might come from other sources, and
          as a result, the licensing conditions might change. The user has
          ultimate responsibility for appropriate use, even though we make every
          effort to guarantee that all fonts are appropriately categorized and
          ethically sourced.
        </p>
        <p className="w-full text-small lg:text-medium text-default-500 text-justify">
          "Free for personal use" fonts are prohibited from being used
          commercially without the required permission, whereas "free for
          commercial use" fonts can be used for more extensive purposes. It
          might be necessary to obtain additional licensing for premium
          typefaces from the original author. Through transparent communication,
          we are dedicated to supporting designers' rights and encouraging
          ethical font usage.
        </p>
      </motion.div>

      <motion.div className="flex flex-col gap-6 " variants={fadeIn}>
        <div className="flex gap-2 items-start justify-center">
          <h2 className="tracking-tight font-semibold text-2xl lg:text-4xl">
            About
          </h2>
        </div>
        <p className="w-full text-small lg:text-medium text-default-500 text-justify">
          Our website provides an expanding selection of both free and premium
          typefaces that are directly sourced from reliable third-party partners
          and creative designers. Our goal is to facilitate and inspire your
          creative process by offering easily downloadable files and
          customisable previews. Real people who are concerned about quality,
          design integrity, and licensing meticulously arrange and add each
          typeface. In order to safeguard designers' rights and guarantee that
          you can download and use fonts with confidence, we take font licensing
          very seriously. To give you even more choices and support the
          platform, we also offer affiliate links to carefully chosen
          third-party suppliers as part of our service.
        </p>
        <p className="w-full text-small lg:text-medium text-default-500 text-justify">
          We are dedicated to providing a secure and moral resource for
          everyone, whether you're a student, teacher, hobbyist, graphic
          designer, or craftsman. This is because there are a lot of font
          websites that provide dubious or illegal content. Because creativity
          flourishes in a trustworthy environment, we think we can help you
          create worry-free by emphasizing legitimacy and transparency. We
          appreciate you entrusting us with your artistic endeavors.
        </p>
      </motion.div>
    </motion.section>
  );
}
