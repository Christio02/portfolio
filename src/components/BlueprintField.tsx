import { useEffect, useRef } from "react";

interface BlueprintFieldProps {
	pointerRef: React.RefObject<{ x: number; y: number; active: boolean }>;
}

const GRID_SPACING = 44;
const NEEDLE_LENGTH = 9;
const INFLUENCE_RADIUS = 240;

export default function BlueprintField({ pointerRef }: BlueprintFieldProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		let rafId = 0;
		let isVisible = true;
		let width = 0;
		let height = 0;
		let dpr = Math.min(window.devicePixelRatio || 1, 2);

		let smoothX = -9999;
		let smoothY = -9999;
		let smoothStrength = 0;

		const readPalette = () => {
			const styles = getComputedStyle(document.documentElement);
			const isDark =
				document.documentElement.getAttribute("data-theme") === "dark";
			return {
				accent: styles.getPropertyValue("--accent").trim() || "#0284c7",
				accentWarm:
					styles.getPropertyValue("--accent-warm").trim() || "#f59e0b",
				baseAlpha: isDark ? 0.2 : 0.18,
				lineColor: isDark ? "rgba(243, 240, 255, 0.16)" : "rgba(15, 23, 42, 0.14)",
				dotColor: isDark ? "rgba(243, 240, 255, 0.24)" : "rgba(15, 23, 42, 0.2)",
			};
		};

		let palette = readPalette();

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			width = rect.width;
			height = rect.height;
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.max(1, Math.floor(width * dpr));
			canvas.height = Math.max(1, Math.floor(height * dpr));
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const draw = () => {
			ctx.clearRect(0, 0, width, height);

			const target = pointerRef.current;
			if (target?.active) {
				if (smoothX < -5000) {
					smoothX = target.x;
					smoothY = target.y;
				} else {
					smoothX += (target.x - smoothX) * 0.12;
					smoothY += (target.y - smoothY) * 0.12;
				}
				smoothStrength += (1 - smoothStrength) * 0.1;
			} else {
				smoothStrength += (0 - smoothStrength) * 0.08;
			}

			const cols = Math.ceil(width / GRID_SPACING) + 1;
			const rows = Math.ceil(height / GRID_SPACING) + 1;
			const offsetX = (width - (cols - 1) * GRID_SPACING) / 2;
			const offsetY = (height - (rows - 1) * GRID_SPACING) / 2;

			for (let r = 0; r < rows; r++) {
				for (let c = 0; c < cols; c++) {
					const x = offsetX + c * GRID_SPACING;
					const y = offsetY + r * GRID_SPACING;

					let influence = 0;
					let angle = -Math.PI / 4; // subtle 45° default architectural hatch

					if (!reducedMotion && smoothStrength > 0.01) {
						const dx = smoothX - x;
						const dy = smoothY - y;
						const dist = Math.hypot(dx, dy);

						if (dist < INFLUENCE_RADIUS) {
							const t = 1 - dist / INFLUENCE_RADIUS;
							influence = t * t * smoothStrength;
							angle = Math.atan2(dy, dx);
						}
					}

					const len = NEEDLE_LENGTH * (0.55 + influence * 0.85);
					const half = len * 0.5;
					const cos = Math.cos(angle);
					const sin = Math.sin(angle);

					ctx.beginPath();
					ctx.moveTo(x - cos * half, y - sin * half);
					ctx.lineTo(x + cos * half, y + sin * half);

					if (influence > 0.06) {
						ctx.strokeStyle = palette.accent;
						ctx.globalAlpha = Math.min(0.85, palette.baseAlpha + influence * 0.65);
						ctx.lineWidth = 1 + influence * 0.65;
					} else {
						ctx.strokeStyle = palette.lineColor;
						ctx.globalAlpha = 1;
						ctx.lineWidth = 1;
					}
					ctx.stroke();

					// Tiny anchor dot at major grid intersections (every 4 cells)
					if (r % 4 === 0 && c % 4 === 0) {
						ctx.globalAlpha = influence > 0.15 ? 0.9 : 0.7;
						ctx.fillStyle =
							influence > 0.15 ? palette.accentWarm : palette.dotColor;
						ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
					}
				}
			}

			// Subtle reticle crosshair around cursor when active
			if (!reducedMotion && smoothStrength > 0.05) {
				ctx.globalAlpha = 0.25 * smoothStrength;
				ctx.strokeStyle = palette.accent;
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.arc(smoothX, smoothY, 18, 0, Math.PI * 2);
				ctx.stroke();
			}

			ctx.globalAlpha = 1;
		};

		const loop = () => {
			if (isVisible) {
				draw();
			}
			rafId = window.requestAnimationFrame(loop);
		};

		resize();
		draw();

		if (!reducedMotion) {
			rafId = window.requestAnimationFrame(loop);
		}

		const resizeObserver = new ResizeObserver(() => {
			resize();
			if (reducedMotion) draw();
		});
		resizeObserver.observe(canvas);

		const themeObserver = new MutationObserver(() => {
			palette = readPalette();
			if (reducedMotion) draw();
		});
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme", "class"],
		});

		const visibilityObserver = new IntersectionObserver(
			(entries) => {
				isVisible = entries[0]?.isIntersecting ?? true;
			},
			{ threshold: 0 },
		);
		visibilityObserver.observe(canvas);

		return () => {
			window.cancelAnimationFrame(rafId);
			resizeObserver.disconnect();
			themeObserver.disconnect();
			visibilityObserver.disconnect();
		};
	}, [pointerRef]);

	return (
		<canvas
			ref={canvasRef}
			className="absolute inset-0 w-full h-full pointer-events-none"
		/>
	);
}
