/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            's3.us-west-2.amazonaws.com',
            'pbs.twimg.com',
            'firebasestorage.googleapis.com',
            'prod-files-secure.s3.us-west-2.amazonaws.com'
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    }
};

module.exports = nextConfig;
