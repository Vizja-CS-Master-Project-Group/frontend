/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        domains: ['backend.test'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.backend.test',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
