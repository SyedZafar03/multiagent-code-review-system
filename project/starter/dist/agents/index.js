import { codeQualityAnalyzer } from './code-quality-analyzer.js';
import { testCoverageAnalyzer } from './test-coverage-analyzer.js';
import { refactoringSuggester } from './refactoring-suggester.js';
export { codeQualityAnalyzer } from './code-quality-analyzer.js';
export { testCoverageAnalyzer } from './test-coverage-analyzer.js';
export { refactoringSuggester } from './refactoring-suggester.js';
/**
 * Full agent registry passed into the orchestrator's `agents` option.
 * Keys must match the names used in the orchestrator prompt's explicit
 * invocation language.
 */
export const agents = {
    'code-quality-analyzer': codeQualityAnalyzer,
    'test-coverage-analyzer': testCoverageAnalyzer,
    'refactoring-suggester': refactoringSuggester,
};
//# sourceMappingURL=index.js.map