import React from "react";
import { Link } from "gatsby";

import { Layout } from "../components/Layout";
import { SEO } from "../components/seo";
import { StyledContent } from "../components/StyledContent";

import thirdgrademathgames from "../images/third-grade-math-games.webp";
import rocketspelling from "../images/rocket-spelling.webp";
import onlinemathleague from "../images/online-math-league.webp";

export default function Index() {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-indigo-700">
          Hello! I'm Josh Pullen! 👋
        </h3>
        <h2 className="text-3xl font-bold text-gray-900">
          I work on education and technology.
        </h2>
      </div>
      <StyledContent className="text-lg leading-7">
        <p>
          When I was 8 years old, I started programming with{" "}
          <a href="https://scratch.mit.edu/users/PullJosh/" target="_blank">
            Scratch
          </a>
          . Ever since that magical moment, I've been fascinated by the
          opportunity to learn using technology.
        </p>
        <p>After my time on Scratch, I created a few educational websites:</p>
        <div className="px-8 w-break-free">
          <div className="flex items-center max-w-3xl mx-auto my-8">
            <a
              href="http://thirdgrademathgames.com/"
              target="_blank"
              className="w-2/5 p-2 pb-0 transition duration-200 transform bg-white rounded-lg shadow-lg select-none hover:shadow-xl hover:-translate-y-1"
            >
              <img
                src={thirdgrademathgames}
                alt="Third Grade Math Games"
                className="w-full h-auto rounded-l-sm shadow"
              />
              <div className="my-2 text-base font-semibold text-center text-gray-900">
                Third Grade Math Games
              </div>
            </a>
            <a
              href="https://www.rocketspelling.com/"
              target="_blank"
              className="z-10 w-3/5 p-3 pb-0 -mx-2 transition duration-200 transform bg-white rounded-lg shadow-lg select-none hover:shadow-xl hover:-translate-y-1"
            >
              <img
                src={rocketspelling}
                alt="Rocket Spelling"
                className="w-full h-auto rounded shadow"
              />
              <div className="my-3 text-xl font-semibold text-center text-gray-900">
                Rocket Spelling
              </div>
            </a>
            <a
              href="https://onlinemathleague.com/"
              target="_blank"
              className="w-2/5 p-2 pb-0 transition duration-200 transform bg-white rounded-lg shadow-lg select-none hover:shadow-xl hover:-translate-y-1"
            >
              <img
                src={onlinemathleague}
                alt="Online Math League"
                className="w-full h-auto rounded-r-sm shadow"
              />
              <div className="my-2 text-base font-semibold text-center text-gray-900">
                Online Math League
              </div>
            </a>
          </div>
        </div>
        <p>
          I also started a summer technology camp and an after school coding
          club for local elementary students.
        </p>
      </StyledContent>
      <Link
        to="/blog/"
        className="block mt-16 overflow-hidden text-lg text-white bg-gray-800 rounded-lg shadow-xl"
      >
        <h5 className="p-4 font-bold bg-gray-900">Check out the blog! →</h5>
        <p className="p-4 text-left">
          Shoot me an email at <code>hello@joshuapullen.com</code> if you want
          to subscribe. I'll be writing lots of fun stuff!
        </p>
      </Link>
    </Layout>
  );
}
