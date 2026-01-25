"use client";

import { motion } from "framer-motion";

import { title, subtitle } from "@/components/primitives";

interface PrivacyHeroProps {
  fadeIn: any;
  staggerContainer: any;
}

export default function PrivacyHero({
  fadeIn,
  staggerContainer,
}: PrivacyHeroProps) {
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
        Privacy Policy
      </motion.h1>

      <motion.div
        className={subtitle({
          class: "mx-auto mb-10 mt-6 max-w-7xl text-justify",
        })}
        variants={fadeIn}
      >
        <div className="space-y-6 text-sm md:text-lg leading-relaxed">
          <p>
            At <strong>Listofont.com</strong>, the privacy of our visitors is of
            extreme importance to us. This Privacy Policy document outlines the
            types of personal information that is received and collected by
            Listofont.com and how it is used.
          </p>

          <p>
            <strong>Log Files:</strong> Like many other websites, Listofont.com
            makes use of log files. The information inside the log files
            includes internet protocol (IP) addresses, type of browser, Internet
            Service Provider (ISP), date/time stamp, referring/exit pages, and
            number of clicks to analyze trends, administer the site, track
            user&apos;s movement around the site, and gather demographic
            information. IP addresses and other such information are not linked
            to any information that is personally identifiable.
          </p>

          <p>
            <strong>Cookies and Web Beacons:</strong> Listofont.com uses cookies
            to store information about visitors&apos; preferences, record
            user-specific information on which pages the user accesses or
            visits, and customize web page content based on visitors&apos;
            browser type or other information that the visitor sends via their
            browser.
          </p>

          <div>
            <strong>Google Advertising (DART Cookie):</strong>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                Google, as a third-party vendor, uses cookies to serve ads on
                Listofont.com.
              </li>
              <li>
                Google&apos;s use of the DART cookie enables it to serve ads to
                users based on their visit to Listofont.com and other sites on
                the Internet.
              </li>
              <li>
                Users may opt out of the use of the DART cookie by visiting the
                Google ad and content network privacy policy at the following
                URL:{" "}
                <a
                  className="text-primary hover:underline"
                  href="https://policies.google.com/technologies/ads"
                >
                  https://policies.google.com/technologies/ads
                </a>
              </li>
            </ul>
          </div>

          <p>
            <strong>Third-Party Ad Networks:</strong> These third-party ad
            servers or ad networks use technology to send the advertisements and
            links that appear on Listofont.com directly to your browsers. They
            automatically receive your IP address when this occurs. Other
            technologies (such as cookies, JavaScript, or Web Beacons) may also
            be used by the third-party ad networks to measure the effectiveness
            of their advertisements and/or to personalize the advertising
            content that you see.
          </p>

          <p>
            <strong>Children&apos;s Information:</strong> We believe it is
            important to provide added protection for children online. We
            encourage parents and guardians to spend time online with their
            children to observe, participate in and/or monitor and guide their
            online activity. Listofont.com does not knowingly collect any
            personally identifiable information from children under the age of
            13.
          </p>

          <p>
            <strong>Consent:</strong> By using our website, you hereby consent
            to our privacy policy and agree to its terms.
          </p>

          <p>
            <strong>Update:</strong> This Privacy Policy was last updated on:
            January 25, 2026. Should we update, amend or make any changes to our
            privacy policy, those changes will be posted here.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
