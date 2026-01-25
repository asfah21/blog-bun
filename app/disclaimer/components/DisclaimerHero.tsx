"use client";

import { motion } from "framer-motion";

import { title, subtitle } from "@/components/primitives";

interface DisclaimerHeroProps {
  fadeIn: any;
  staggerContainer: any;
}

export default function DisclaimerHero({
  fadeIn,
  staggerContainer,
}: DisclaimerHeroProps) {
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
        Disclaimer
      </motion.h1>

      <motion.div
        className={subtitle({
          class: "mx-auto mb-10 mt-6 max-w-7xl text-justify",
        })}
        variants={fadeIn}
      >
        <div className="space-y-6 text-sm md:text-lg leading-relaxed">
          <p>
            The information provided on <strong>Listofont.com</strong> is for
            general informational purposes only. While we strive to keep our
            font collection accurate and up-to-date, we make no representations
            or warranties of any kind, express or implied, about the
            completeness, accuracy, reliability, or availability of the content
            hosted on this platform.
          </p>

          <p>
            <strong>Usage & Licensing:</strong> Most fonts shared on
            Listofont.com are demo versions provided by their respective authors
            for testing and personal use only. Users are responsible for
            checking the specific license included with each font. Commercial
            use usually requires purchasing a full license from the original
            creator. Listofont.com is not responsible for any legal issues
            arising from the unauthorized or improper use of these fonts.
          </p>

          <p>
            <strong>External Links:</strong> Through this website, you may be
            able to link to other websites which are not under the control of
            Listofont.com. We have no control over the nature, content, and
            availability of those sites. The inclusion of any links does not
            necessarily imply a recommendation or endorse the views expressed
            within them.
          </p>

          <p>
            <strong>Affiliate Disclosure:</strong> To remain transparent with
            our users and comply with FTC guidelines, please assume that some
            links on this website are &quot;affiliate links.&quot; If you click
            on these links and make a purchase, <strong>Listofont.com</strong>{" "}
            may receive a commission at no additional cost to you. This is a
            common way for us to fund the operation of our service while
            continuing to provide free resources. We only partner with and
            recommend services we trust, such as{" "}
            <strong>Creative Fabrica</strong>, <strong>Creative Market</strong>,
            and <strong>Envato Elements</strong>, ensuring they provide real
            value to our visitors.
          </p>

          <p>
            <strong>Limitation of Liability:</strong> In no event will we be
            liable for any loss or damage including without limitation, indirect
            or consequential loss or damage, or any loss or damage whatsoever
            arising from loss of data or profits arising out of, or in
            connection with, the use of this website.
          </p>

          <p>
            <strong>Intellectual Property:</strong> If you are a copyright owner
            and believe your work has been uploaded to Listofont.com without
            authorization, please contact us immediately. We respect
            intellectual property rights and will take prompt action to address
            valid copyright concerns.
          </p>

          <p>
            <strong>Service Availability:</strong> Every effort is made to keep
            the website up and running smoothly. However, Listofont.com takes no
            responsibility for, and will not be liable for, the website being
            temporarily unavailable due to technical issues beyond our control.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
