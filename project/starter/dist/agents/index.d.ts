/**
 * Subagent exports
 */
import type { AgentDefinition } from '@anthropic-ai/claude-agent-sdk';
export { codeQualityAnalyzer } from './code-quality-analyzer.js';
export { testCoverageAnalyzer } from './test-coverage-analyzer.js';
export { refactoringSuggester } from './refactoring-suggester.js';
/**
 * Full agent registry passed into the orchestrator's `agents` option.
 * Keys must match the names used in the orchestrator prompt's explicit
 * invocation language.
 */
export declare const agents: Record<string, AgentDefinition>;
//# sourceMappingURL=index.d.ts.map