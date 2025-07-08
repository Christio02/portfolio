export default function GodotEmbed() {
	return (
		<section
			style={{
				width: '100%',
				maxWidth: '480px',
				aspectRatio: '2 / 3',
				margin: '0 auto'
			}}
		>
			<iframe
				src="/godot-game/index.html"
				width="100%"
				height="80%"
				style={{ border: 'none' }}
				title="Godot Game"
			/>
		</section>
	);
}
