import { useFieldContext } from "@/lib/form";

const TextArea = ({ label }: { label: string }) => {
	const field = useFieldContext<string>();

	return (
		<div className="space-y-2">
			<label
				htmlFor={field.name}
				className="block font-body text-sm font-medium text-text-primary"
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
				aria-describedby={
					field.state.meta.isTouched && field.state.meta.errors.length > 0
						? `${field.name}-error`
						: undefined
				}
				className={`w-full resize-none bg-surface border rounded-xl px-4 py-3 text-text-primary font-body text-sm outline-none transition-all ${
					field.state.meta.isTouched && field.state.meta.errors.length > 0
						? "border-red-500 focus:ring-2 focus:ring-red-500/20"
						: "border-border focus:border-accent focus:ring-2 focus:ring-accent/20"
				}`}
			/>

			{field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
				<ul
					id={`${field.name}-error`}
					className="mt-1 space-y-1 text-xs font-mono text-red-500"
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
