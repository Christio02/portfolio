import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SubmitButtonProps {
	isSubmitting: boolean;
	canSubmit: boolean;
	onClick?: () => void;
}

export default function SubmitButton({ isSubmitting, canSubmit, onClick }: SubmitButtonProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className="perspective-1000 mt-6 flex justify-center">
			<Button
				type="submit"
				disabled={!canSubmit}
				onClick={onClick}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={`bg-primary text-primary-foreground relative w-full max-w-xs overflow-hidden rounded-md py-2.5 font-medium transition-all duration-500 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 ${isHovered && canSubmit ? 'translate-y-[-2px] shadow-lg' : ''} `}
			>
				<span
					className={`from-primary via-primary/80 to-primary absolute inset-0 z-0 bg-gradient-to-r transition-transform duration-700 ease-in-out ${isHovered && canSubmit ? 'translate-x-[10%]' : 'translate-x-[-100%]'} `}
				/>

				<span className="relative z-10 flex items-center justify-center">
					{isSubmitting ? (
						<div className="flex items-center justify-center">
							<svg
								className="mr-2 h-4 w-4 animate-spin"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Sending...
						</div>
					) : (
						'Send Message'
					)}
				</span>

				<span
					className={`bg-primary-foreground/20 absolute bottom-0 left-0 h-[2px] w-full transition-transform duration-500 ease-out ${isHovered && canSubmit ? 'translate-x-0' : 'translate-x-[-100%]'} `}
				/>
			</Button>
		</div>
	);
}
