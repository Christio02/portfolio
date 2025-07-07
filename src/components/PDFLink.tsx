import { motion } from 'framer-motion';
import React from 'react';
import { ExternalLink, FileText } from 'lucide-react';


interface PDFLinkProps {
	className: string;
	isMobile: boolean;
	pdfLink: string;
	pdfSize: string;
}




export default function PDFLink ({className, isMobile = false, pdfLink, pdfSize }: PDFLinkProps) {

	const handlePDFClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const confirmed = window.confirm( `This will open a PDF document (${pdfSize}) in a new tab. Continue?`);
		if (!confirmed) {
			e.preventDefault();
		}
	}
	return (
		<motion.a
			href={pdfLink}
			target="_blank"
			rel="noopener noreferrer"
			className={className}
			onClick={handlePDFClick}
			aria-label={`Download CV as PDF document, ${pdfSize}, opens in new tab`}
			aria-describedby="cv-description"
		>
      <span className="flex items-center gap-2">
        <FileText className="h-4 w-4" aria-hidden="true" />
        CV
        <span className="text-xs opacity-70">(PDF)</span>
        <ExternalLink className="h-3 w-3" aria-hidden="true" />
      </span>

			{/* Hidden description for screen readers */}
			<span id="cv-description" className="sr-only">
        PDF document, {pdfSize}. This link will open in a new tab.
      </span>

			{/* Visual underline animation */}
			<motion.div
				className="absolute bottom-0 left-0 h-0.5 w-0 bg-current"
				whileHover={{ width: '100%' }}
				transition={{ duration: 0.2 }}
			/>
		</motion.a>
	)


}
