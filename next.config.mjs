import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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
			{
				protocol: "https",
				hostname: "youtu.be",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "youtube.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "b.jw-cdn.org",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.britannica.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "upload.wikimedia.org",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default withNextIntl(nextConfig);
