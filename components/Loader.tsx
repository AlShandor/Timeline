import Image from "next/image";

const Loader = () => (
	<div className="flex-center w-full">
		<Image
			src="/icons/loader.svg"
			alt="loader"
			width={64}
			height={64}
			className="animate-spin"
		/>
	</div>
);

export default Loader;
