import { type FC, type ReactElement, useEffect, useRef } from "react";

interface TrunkSpec {
	angle: number;
	len: number;
	curv: number;
}

interface MeshBranch {
	startX: number;
	startY: number;
	cpX: number;
	cpY: number;
	endX: number;
	endY: number;
	width: number;
	alpha: number;
}

interface MeshNode {
	x: number;
	y: number;
	r: number;
	alpha: number;
	phase: number;
}

interface BranchPulse {
	branchIndex: number;
	progress: number;
	speed: number;
	size: number;
}

export const ScraperMeshVisual: FC = (): ReactElement => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			return;
		}

		let animationFrameId: number;
		canvas.width = canvas.offsetWidth * 2;
		let width = canvas.width;
		canvas.height = canvas.offsetHeight * 2;
		let height = canvas.height;

		const handleResize = (): void => {
			if (!canvas) {
				return;
			}
			canvas.width = canvas.offsetWidth * 2;
			width = canvas.width;
			canvas.height = canvas.offsetHeight * 2;
			height = canvas.height;
		};

		window.addEventListener("resize", handleResize);

		let currentCenterX = width * 0.65;
		let currentCenterY = height * 0.48;

		const getTrunkSpecs = (w: number, h: number): TrunkSpec[] => {
			return [
				{ angle: -2.95, len: w * 0.35, curv: 0.15 },
				{ angle: -2.6, len: Math.hypot(w * 0.32, h * 0.35), curv: -0.18 },
				{ angle: -2.25, len: Math.hypot(w * 0.28, h * 0.42), curv: 0.22 },
				{ angle: -1.85, len: h * 0.46, curv: -0.16 },
				{ angle: -1.52, len: h * 0.48, curv: 0.14 },
				{ angle: -1.18, len: Math.hypot(w * 0.25, h * 0.44), curv: -0.22 },
				{ angle: -0.8, len: Math.hypot(w * 0.32, h * 0.38), curv: 0.25 },
				{ angle: -0.42, len: w * 0.34, curv: -0.18 },
				{ angle: -0.05, len: w * 0.34, curv: 0.2 },
				{ angle: 0.32, len: w * 0.33, curv: -0.16 },
				{ angle: 0.7, len: Math.hypot(w * 0.32, h * 0.38), curv: 0.24 },
				{ angle: 1.1, len: Math.hypot(w * 0.25, h * 0.45), curv: -0.2 },
				{ angle: 1.48, len: h * 0.48, curv: 0.18 },
				{ angle: 1.82, len: h * 0.46, curv: -0.15 },
				{ angle: 2.18, len: Math.hypot(w * 0.26, h * 0.4), curv: 0.2 },
				{ angle: 2.55, len: Math.hypot(w * 0.3, h * 0.34), curv: -0.18 },
			];
		};

		const buildNetwork = (
			cx: number,
			cy: number,
			w: number,
			h: number,
			timeVal: number,
		): { branches: MeshBranch[]; nodes: MeshNode[] } => {
			const branchesList: MeshBranch[] = [];
			const nodesList: MeshNode[] = [];
			const specs = getTrunkSpecs(w, h);

			for (let i = 0; i < specs.length; i++) {
				const t = specs[i];
				const wave1 = Math.sin(timeVal * 1.6 + i * 0.9) * 0.08;
				const currentAngle = t.angle + wave1;
				const waveCurv = Math.cos(timeVal * 1.4 + i * 0.7) * 0.09;
				const currentCurv = t.curv + waveCurv;

				const cpDist = t.len * 0.45;
				const cpAngle = currentAngle + currentCurv;
				const cpX = cx + Math.cos(cpAngle) * cpDist;
				const cpY = cy + Math.sin(cpAngle) * cpDist;
				const endX = cx + Math.cos(currentAngle) * t.len;
				const endY = cy + Math.sin(currentAngle) * t.len;

				branchesList.push({
					startX: cx,
					startY: cy,
					cpX,
					cpY,
					endX,
					endY,
					width: 1.6,
					alpha: 0.42,
				});
				nodesList.push({ x: endX, y: endY, r: 3.2, alpha: 0.85, phase: i });

				const forkWave = Math.sin(timeVal * 1.8 + i) * 0.09;
				const forkAngle =
					currentAngle + (i % 2 === 0 ? 0.32 : -0.32) + forkWave;
				const forkLen = t.len * 0.55;
				const forkEndX = endX + Math.cos(forkAngle) * forkLen;
				const forkEndY = endY + Math.sin(forkAngle) * forkLen;
				const forkCpX = endX + Math.cos(forkAngle + 0.1) * (forkLen * 0.5);
				const forkCpY = endY + Math.sin(forkAngle + 0.1) * (forkLen * 0.5);

				branchesList.push({
					startX: endX,
					startY: endY,
					cpX: forkCpX,
					cpY: forkCpY,
					endX: forkEndX,
					endY: forkEndY,
					width: 1.1,
					alpha: 0.28,
				});
				nodesList.push({
					x: forkEndX,
					y: forkEndY,
					r: 2.2,
					alpha: 0.7,
					phase: i + 10,
				});
			}

			return { branches: branchesList, nodes: nodesList };
		};

		const branchPulses: BranchPulse[] = [];
		for (let p = 0; p < 22; p++) {
			const progress = Math.random();
			const speed = 0.004 + Math.random() * 0.007;
			branchPulses.push({ branchIndex: p % 32, progress, speed, size: 2.5 });
		}

		let time = 0;

		const render = (): void => {
			time += 0.016;
			ctx.clearRect(0, 0, width, height);

			currentCenterX = width * 0.65;
			currentCenterY = height * 0.48;

			const network = buildNetwork(
				currentCenterX,
				currentCenterY,
				width,
				height,
				time,
			);

			const nebulaRadius = width * 0.5;
			const nebulaGrad = ctx.createRadialGradient(
				currentCenterX,
				currentCenterY,
				0,
				currentCenterX,
				currentCenterY,
				nebulaRadius,
			);
			nebulaGrad.addColorStop(0, "rgba(88, 28, 135, 0.25)");
			nebulaGrad.addColorStop(0.3, "rgba(59, 7, 100, 0.12)");
			nebulaGrad.addColorStop(0.7, "rgba(18, 10, 35, 0.03)");
			nebulaGrad.addColorStop(1, "transparent");
			ctx.fillStyle = nebulaGrad;
			ctx.fillRect(0, 0, width, height);

			for (let b = 0; b < network.branches.length; b++) {
				const br = network.branches[b];
				ctx.beginPath();
				ctx.moveTo(br.startX, br.startY);
				ctx.quadraticCurveTo(br.cpX, br.cpY, br.endX, br.endY);
				ctx.strokeStyle = `rgba(192, 132, 252, ${br.alpha})`;
				ctx.lineWidth = br.width;
				ctx.stroke();
			}

			for (let i = 0; i < network.nodes.length; i++) {
				for (let j = i + 1; j < network.nodes.length; j++) {
					const dx = network.nodes[i].x - network.nodes[j].x;
					const dy = network.nodes[i].y - network.nodes[j].y;
					const dist = Math.hypot(dx, dy);
					if (dist < 160) {
						const meshAlpha = (1 - dist / 160) * 0.22;
						ctx.beginPath();
						ctx.moveTo(network.nodes[i].x, network.nodes[i].y);
						ctx.lineTo(network.nodes[j].x, network.nodes[j].y);
						ctx.strokeStyle = `rgba(168, 85, 247, ${meshAlpha})`;
						ctx.lineWidth = 0.8;
						ctx.stroke();
					}
				}
			}

			for (let p = 0; p < branchPulses.length; p++) {
				const bp = branchPulses[p];
				bp.progress += bp.speed;
				if (bp.progress > 1) {
					bp.progress = 0;
					bp.branchIndex = Math.floor(Math.random() * network.branches.length);
				}
				const br = network.branches[bp.branchIndex];
				if (br) {
					const t = bp.progress;
					const oneMinusT = 1 - t;
					const px =
						oneMinusT * oneMinusT * br.startX +
						2 * oneMinusT * t * br.cpX +
						t * t * br.endX;
					const py =
						oneMinusT * oneMinusT * br.startY +
						2 * oneMinusT * t * br.cpY +
						t * t * br.endY;
					const pAlpha = (1 - Math.abs(t - 0.5) * 1.6) * 0.95;

					ctx.beginPath();
					ctx.arc(px, py, bp.size, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(243, 232, 255, ${pAlpha})`;
					ctx.shadowColor = "#c084fc";
					ctx.shadowBlur = 10;
					ctx.fill();
					ctx.shadowBlur = 0;
				}
			}

			for (let i = 0; i < network.nodes.length; i++) {
				const n = network.nodes[i];
				const pulse = Math.sin(time * 1.5 + n.phase);
				const alpha = Math.max(0.3, n.alpha + pulse * 0.3);

				ctx.beginPath();
				ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(168, 85, 247, ${alpha * 0.32})`;
				ctx.fill();

				ctx.beginPath();
				ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(243, 232, 255, ${alpha})`;
				ctx.fill();
			}

			const outerGlowRadius = 220 + Math.sin(time * 1.5) * 20;
			const outerGlow = ctx.createRadialGradient(
				currentCenterX,
				currentCenterY,
				0,
				currentCenterX,
				currentCenterY,
				outerGlowRadius,
			);
			outerGlow.addColorStop(0, "rgba(168, 85, 247, 0.45)");
			outerGlow.addColorStop(0.35, "rgba(147, 51, 234, 0.22)");
			outerGlow.addColorStop(0.75, "rgba(88, 28, 135, 0.05)");
			outerGlow.addColorStop(1, "transparent");
			ctx.beginPath();
			ctx.arc(currentCenterX, currentCenterY, outerGlowRadius, 0, Math.PI * 2);
			ctx.fillStyle = outerGlow;
			ctx.fill();

			const innerGlowRadius = 90 + Math.sin(time * 1.8) * 10;
			const innerGlow = ctx.createRadialGradient(
				currentCenterX,
				currentCenterY,
				0,
				currentCenterX,
				currentCenterY,
				innerGlowRadius,
			);
			innerGlow.addColorStop(0, "rgba(255, 255, 255, 0.98)");
			innerGlow.addColorStop(0.25, "rgba(233, 213, 255, 0.8)");
			innerGlow.addColorStop(0.65, "rgba(168, 85, 247, 0.45)");
			innerGlow.addColorStop(1, "transparent");
			ctx.beginPath();
			ctx.arc(currentCenterX, currentCenterY, innerGlowRadius, 0, Math.PI * 2);
			ctx.fillStyle = innerGlow;
			ctx.fill();

			const coreRadius = 8 + Math.sin(time * 2.2) * 1.5;
			ctx.beginPath();
			ctx.arc(currentCenterX, currentCenterY, coreRadius, 0, Math.PI * 2);
			ctx.fillStyle = "#ffffff";
			ctx.shadowColor = "#e9d5ff";
			ctx.shadowBlur = 24;
			ctx.fill();
			ctx.shadowBlur = 0;

			animationFrameId = requestAnimationFrame(render);
		};

		render();

		return () => {
			window.removeEventListener("resize", handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<div className="relative h-full w-full pointer-events-none">
			<canvas
				ref={canvasRef}
				className="h-full w-full opacity-95 transition-opacity duration-700"
			/>
		</div>
	);
};
