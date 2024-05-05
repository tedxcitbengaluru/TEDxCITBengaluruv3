/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // loader: 'akamai',
        // path: '/',
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_SUPABASE_URL?.split('https://')[1]
            }
        ],
        unoptimized: true,
        domains: [
            's3.us-west-2.amazonaws.com',
            'pbs.twimg.com',
            'firebasestorage.googleapis.com',
            'prod-files-secure.s3.us-west-2.amazonaws.com'
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    },
    async redirects() {
        return [
            {
                source: '/aether',
                destination: process.env.REGISTRATION_FORM,
                permanent: true
            },
            {
                source: '/aether-qr',
                destination: process.env.QR_LINK,
                permanent: true
            },
            {
                source: '/ticketing',
                destination: process.env.TICKET_SHEET,
                permanent: true
            }
        ];
    }
};

module.exports = nextConfig;
