/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["mongoose"],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cms-imgp.jw-cdn.org",
				port: "",
				pathname: "/**",
			},
            {
                protocol: "https",
                hostname: "jw.org",
                port: "",
                pathname: "/**",
            },
			{
				protocol: "https",
				hostname: "wol.jw.org",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "assetsnffrgf-a.akamaihd.net",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
