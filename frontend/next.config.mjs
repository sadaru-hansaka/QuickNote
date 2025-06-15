/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        nextScriptWorkers: false,
    },
    devIndicators: {
        feedback: false, 
    },
};

export default nextConfig;
