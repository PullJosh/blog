import React from "react";

import { Layout } from "../components/Layout";
import { SEO } from "../components/SEO";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>The page you're looking for seems to be missing.</p>
  </Layout>
);

export default NotFoundPage;
