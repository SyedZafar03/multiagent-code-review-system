import { describe, it, expect } from 'vitest';
import {
  CodeQualityResultSchema,
  TestCoverageResultSchema,
  RefactoringSuggestionSchema,
} from '../src/types/analysis-results.js';
import { ReviewReportSchema } from '../src/types/report-types.js';

describe('Schema Validation Tests', () => {
  const mockQuality = {
    file: 'src/main.ts',
    issues: [
      {
        line: 12,
        severity: 'medium' as const,
        category: 'best-practice' as const,
        description: 'Missing error boundary',
        suggestion: 'Wrap call in try-catch block',
      },
    ],
    overallScore: 85,
    summary: 'Good code quality overall with minor issues.',
  };

  const mockCoverage = {
    file: 'src/main.ts',
    hasTests: true,
    testFiles: ['tests/main.test.ts'],
    untestedPaths: [
      {
        type: 'branch' as const,
        location: 'line 42',
        priority: 'high' as const,
        reasoning: 'Missing fallback error branch coverage',
        suggestedTest: 'it should handle empty input',
      },
    ],
    coverageEstimate: 80,
    summary: 'Moderate test coverage with key edge cases missing.',
  };

  const mockRefactoring = {
    file: 'src/main.ts',
    suggestions: [
      {
        type: 'simplify' as const,
        location: 'line 50-60',
        impact: 'medium' as const,
        description: 'Simplify nested conditional',
        before: 'if (a) { if (b) { return c; } }',
        after: 'if (a && b) return c;',
        benefits: 'Improves readability',
      },
    ],
    summary: 'Code can be simplified in conditional blocks.',
  };

  it('validates a valid CodeQualityResultSchema object', () => {
    const result = CodeQualityResultSchema.safeParse(mockQuality);
    expect(result.success).toBe(true);
  });

  it('rejects an invalid CodeQualityResultSchema missing required fields', () => {
    const invalidData = {
      score: 'eighty-five',
    };
    const result = CodeQualityResultSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('validates a valid TestCoverageResultSchema object', () => {
    const result = TestCoverageResultSchema.safeParse(mockCoverage);
    expect(result.success).toBe(true);
  });

  it('validates a valid RefactoringSuggestionSchema object', () => {
    const result = RefactoringSuggestionSchema.safeParse(mockRefactoring);
    expect(result.success).toBe(true);
  });

  it('validates a comprehensive ReviewReport structure', () => {
    const mockReport = {
      pullRequest: {
        owner: 'airaamane',
        repo: 'simple-todo-app',
        number: 1,
      },
      fileReviews: [
        {
          file: 'src/main.ts',
          codeQuality: mockQuality,
          testCoverage: mockCoverage,
          refactorings: mockRefactoring,
        },
      ],
      summary: {
        totalFiles: 1,
        overallScore: 85,
        criticalIssues: 0,
        highPriorityTests: 1,
        refactoringOpportunities: 1,
      },
      recommendations: [
        {
          priority: 'medium' as const,
          category: 'testing',
          description: 'Add tests for uncovered branch',
          files: ['src/main.ts'],
        },
      ],
      metadata: {
        analyzedAt: new Date().toISOString(),
        duration: 1250,
        agentVersions: {
          orchestrator: '1.0.0',
          quality: '1.0.0',
        },
      },
    };

    const result = ReviewReportSchema.safeParse(mockReport);
    expect(result.success).toBe(true);
  });
});
