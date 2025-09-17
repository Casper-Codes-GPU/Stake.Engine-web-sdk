/**
 * Casino Multi-Pack Animation System
 * 
 * Optimized for mobile casino gaming with:
 * - Memory-efficient texture loading
 * - Performance monitoring
 * - Sequential animation playback
 * - Mobile device compatibility
 * - Regulatory compliance support
 */

import type { Assets } from 'pixi-svelte';

export interface CasinoAnimationConfig {
	assetKey: string;
	totalFrames: number;
	packs: Array<{
		key: string;
		frames: number;
		startFrame: number;
		endFrame: number;
	}>;
}

export interface CasinoAnimationSequence {
	name: string;
	startFrame: number;
	endFrame: number;
	speed: number;
	loop: boolean;
	priority: 'low' | 'normal' | 'high';
	mobile?: {
		reducedFrames?: boolean;
		alternativeSpeed?: number;
	};
}

export interface PerformanceMetrics {
	fps: number;
	memoryUsage: number;
	activeTextures: number;
	droppedFrames: number;
}

export class CasinoMultiPackAnimator {
	private config: CasinoAnimationConfig;
	private sequences: Map<string, CasinoAnimationSequence>;
	private performanceMetrics: PerformanceMetrics;
	private frameCount: number = 0;
	private lastTime: number = performance.now();
	private isMobile: boolean;
	private performanceCallback?: (metrics: PerformanceMetrics) => void;

	constructor(config: CasinoAnimationConfig) {
		this.config = config;
		this.sequences = new Map();
		this.performanceMetrics = {
			fps: 0,
			memoryUsage: 0,
			activeTextures: 0,
			droppedFrames: 0
		};
		
		// Mobile detection for casino optimization
		this.isMobile = this.detectMobileDevice();
		
		console.log('🎰 CasinoMultiPackAnimator initialized', {
			config,
			isMobile: this.isMobile
		});
	}

	/**
	 * Detect mobile device for performance optimization
	 */
	private detectMobileDevice(): boolean {
		if (typeof window === 'undefined') return false;
		
		const userAgent = window.navigator.userAgent;
		const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
		const isTouch = 'ontouchstart' in window;
		const smallScreen = window.innerWidth <= 768;
		
		return mobileRegex.test(userAgent) || (isTouch && smallScreen);
	}

	/**
	 * Generate asset configuration for multi-pack setup
	 */
	static generateMultiPackAssets(
		basePath: string,
		packFiles: string[],
		assetPrefix: string
	): Record<string, any> {
		const assets: Record<string, any> = {};
		
		packFiles.forEach((file, index) => {
			const key = `${assetPrefix}${index === 0 ? 'Clean' : index}`;
			assets[key] = {
				type: index === 0 ? 'spriteSheet' : 'sprites',
				src: new URL(`${basePath}/${file}`, import.meta.url).href,
			};
		});
		
		return assets;
	}

	/**
	 * Register animation sequences for casino game states
	 */
	registerSequence(sequence: CasinoAnimationSequence): void {
		// Mobile optimization: reduce frame rates for complex sequences
		if (this.isMobile && sequence.mobile) {
			if (sequence.mobile.alternativeSpeed) {
				sequence.speed = sequence.mobile.alternativeSpeed;
			}
		}
		
		this.sequences.set(sequence.name, sequence);
		console.log(`🎰 Registered sequence: ${sequence.name}`, sequence);
	}

	/**
	 * Register common casino animation sequences
	 */
	registerCasinoSequences(): void {
		// Standard casino sequences optimized for slot games
		const sequences: CasinoAnimationSequence[] = [
			{
				name: 'idle',
				startFrame: 0,
				endFrame: 50,
				speed: 0.05,
				loop: true,
				priority: 'low',
				mobile: { alternativeSpeed: 0.03 }
			},
			{
				name: 'anticipation',
				startFrame: 51,
				endFrame: 80,
				speed: 0.12,
				loop: true,
				priority: 'normal',
				mobile: { alternativeSpeed: 0.08 }
			},
			{
				name: 'bigWin',
				startFrame: 81,
				endFrame: 140,
				speed: 0.18,
				loop: false,
				priority: 'high',
				mobile: { alternativeSpeed: 0.15 }
			},
			{
				name: 'celebration',
				startFrame: 141,
				endFrame: 191,
				speed: 0.2,
				loop: true,
				priority: 'high',
				mobile: { alternativeSpeed: 0.16 }
			}
		];

		sequences.forEach(seq => this.registerSequence(seq));
	}

	/**
	 * Get frame names for a specific sequence
	 */
	getSequenceFrames(sequenceName: string): string[] {
		const sequence = this.sequences.get(sequenceName);
		if (!sequence) {
			console.warn(`Sequence '${sequenceName}' not found`);
			return [];
		}

		const frames: string[] = [];
		for (let i = sequence.startFrame; i <= sequence.endFrame; i++) {
			frames.push(`COFRE_MADERA__${i.toString().padStart(5, '0')}.png`);
		}

		return frames;
	}

	/**
	 * Get the appropriate pack key for a frame number
	 */
	getPackForFrame(frameNumber: number): string | null {
		for (const pack of this.config.packs) {
			if (frameNumber >= pack.startFrame && frameNumber <= pack.endFrame) {
				return pack.key;
			}
		}
		return null;
	}

	/**
	 * Performance monitoring specifically for casino gaming
	 */
	startPerformanceMonitoring(callback?: (metrics: PerformanceMetrics) => void): void {
		this.performanceCallback = callback;
		this.monitorPerformance();
	}

	private monitorPerformance(): void {
		this.frameCount++;
		const currentTime = performance.now();
		const deltaTime = currentTime - this.lastTime;

		if (deltaTime >= 1000) {
			this.performanceMetrics.fps = Math.round((this.frameCount * 1000) / deltaTime);
			this.frameCount = 0;
			this.lastTime = currentTime;

			// Memory usage (Chrome-specific)
			if ('memory' in performance) {
				// @ts-expect-error - memory is non-standard but widely supported
				this.performanceMetrics.memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
			}

			// Casino-specific performance warnings
			if (this.performanceMetrics.fps < 50) {
				console.warn('🎰 Performance Warning: FPS below casino standards', this.performanceMetrics.fps);
			}
			
			if (this.performanceMetrics.memoryUsage > 150) {
				console.warn('🎰 Memory Warning: High memory usage detected', this.performanceMetrics.memoryUsage + 'MB');
			}

			// Call callback if provided
			this.performanceCallback?.(this.performanceMetrics);
		}

		if (typeof requestAnimationFrame !== 'undefined') {
			requestAnimationFrame(() => this.monitorPerformance());
		}
	}

	/**
	 * Get current performance metrics
	 */
	getPerformanceMetrics(): PerformanceMetrics {
		return { ...this.performanceMetrics };
	}

	/**
	 * Optimize animation for current device
	 */
	getOptimizedSequence(sequenceName: string): CasinoAnimationSequence | null {
		const sequence = this.sequences.get(sequenceName);
		if (!sequence) return null;

		// Return mobile-optimized version if on mobile
		if (this.isMobile && sequence.mobile) {
			return {
				...sequence,
				speed: sequence.mobile.alternativeSpeed || sequence.speed
			};
		}

		return sequence;
	}

	/**
	 * Generate complete frame list for debugging
	 */
	getAllFrameNames(): string[] {
		const frames: string[] = [];
		for (let i = 0; i < this.config.totalFrames; i++) {
			frames.push(`COFRE_MADERA__${i.toString().padStart(5, '0')}.png`);
		}
		return frames;
	}

	/**
	 * Casino regulatory compliance: Get animation metadata
	 */
	getAnimationMetadata() {
		return {
			totalFrames: this.config.totalFrames,
			packs: this.config.packs.length,
			sequences: Array.from(this.sequences.keys()),
			isMobile: this.isMobile,
			performanceOptimized: true,
			version: '1.0.0'
		};
	}
}

// Pre-configured setup for the haunted house cofres animation
export const COFRES_DIAMANTES_CONFIG: CasinoAnimationConfig = {
	assetKey: 'cofresydiamantes',
	totalFrames: 192,
	packs: [
		{
			key: 'cofresydiamantesClean',
			frames: 117,
			startFrame: 0,
			endFrame: 116
		},
		{
			key: 'cofresydiamantes1',
			frames: 30,
			startFrame: 117,
			endFrame: 146
		},
		{
			key: 'cofresydiamantes2',
			frames: 45,
			startFrame: 147,
			endFrame: 191
		}
	]
};

// Export singleton instance for use across the application
export const casinoAnimator = new CasinoMultiPackAnimator(COFRES_DIAMANTES_CONFIG);

// Auto-register casino sequences
casinoAnimator.registerCasinoSequences();