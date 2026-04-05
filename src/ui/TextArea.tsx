import { useFieldContext } from "@/lib/form";

const TextArea = ({ label }: { label: string }) => {
	const field = useFieldContext<string>();

	return (
		<div className="space-y-2">
			<label
				htmlFor={field.name}
				className="block font-mono text-xs text-text-muted uppercase tracking-widest"
			>
				{label}
			</label>

			<textarea
				id={field.name}
				name={field.name}
				rows={4}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				aria-invalid={
					field.state.meta.isTouched && field.state.meta.errors.length > 0
				}
				aria-describedby={`${field.name}-error`}
				className={`w-full resize-none bg-transparent border-b outline-none font-mono py-2 text-text-primary transition-colors duration-200 ${
					field.state.meta.isTouched && field.state.meta.errors.length > 0
						? "border-red-500 focus:border-red-400"
						: "border-border focus:border-accent"
				}`}
			/>

			{field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
				<ul
					id={`${field.name}-error`}
					className="mt-1 space-y-1 text-xs font-mono text-red-400"
				>
					{field.state.meta.errors.map((error) => (
						<li key={`${field.name}-${error?.message ?? "error"}`}>
							{error?.message}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TextArea;
