import { ReviewReport } from './types/report-types';
import { RateLimiter, RateLimiterConfig } from './utils/rate-limiter.js';
/**
 * Orchestrator configuration options
 */
export interface OrchestratorOptions {
    /** Rate limiter to use for this orchestrator (defaults to the shared global instance) */
    rateLimiter?: RateLimiter;
    /** Convenience: build a dedicated rate limiter from a partial config instead of passing `rateLimiter` */
    rateLimitConfig?: Partial<RateLimiterConfig>;
    /** Override the model used (defaults to process.env.ANTHROPIC_MODEL) */
    model?: string;
    /** Override the max SDK turns allowed for a single review (default: 60) */
    maxTurns?: number;
}
/**
 * Main Code Review Orchestrator
 * Coordinates subagents to analyze pull requests and generate comprehensive reports
 */
export declare class CodeReviewOrchestrator {
    private readonly rateLimiter;
    private readonly model?;
    private readonly maxTurns;
    constructor(options?: OrchestratorOptions);
    /**
     * Review a pull request using parallel subagent analysis
     * @param owner - Repository owner
     * @param repo - Repository name
     * @param prNumber - Pull request number
     * @returns Complete review report
     */
    reviewPullRequest(owner: string, repo: string, prNumber: number): Promise<ReviewReport>;
    private runQuery;
}
//# sourceMappingURL=orchestrator.d.ts.map