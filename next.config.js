/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/Ecommerce-Next-app" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
