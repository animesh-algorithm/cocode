/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_SUPABASE_URL.split("https://")[1]],
  },
};

export default nextConfig;
