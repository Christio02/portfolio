
export interface TextProps {
	name: string;
	text: string;
}

const TextContent = ({name, text}:TextProps ) => {



	return (
		<>
			<section
				className="flex flex-col gap-y-8 w-6/12 text-center border-4 rounded-2xl shadow-xl shadow-black-400 "
			>
				<h4 className="text-2xl font-extrabold">{name}</h4>
				<p className="text-lg">{text}</p>
			</section>
		</>
	)
}
export default TextContent;

