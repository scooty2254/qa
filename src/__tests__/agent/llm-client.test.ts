import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { GeminiLLMClient } from '../../agent/llm-client.js';
import { sentinelConfigSchema } from '../../types/config.js';

describe('GeminiLLMClient', () => {
  it('should initialize with config and track token usage', () => {
    const config = sentinelConfigSchema.parse({
      gemini: {
        model: 'gemini-2.5-flash',
        max_tokens: 2048,
      },
      cost: {
        max_tokens_per_run: 5000,
      },
    });

    const client = new GeminiLLMClient(config);
    const initialUsage = client.getTotalUsage();
    assert.equal(initialUsage.inputTokens, 0);
    assert.equal(initialUsage.outputTokens, 0);
  });

  it('should throw an error when token budget is exceeded', async () => {
    const config = sentinelConfigSchema.parse({
      cost: {
        max_tokens_per_run: 10,
      },
    });

    const client = new GeminiLLMClient(config);

    // Simulate exceeding token budget
    (client as any).totalUsage = { inputTokens: 10, outputTokens: 5 };

    await assert.rejects(
      () => client.call('system', 'user'),
      /Token budget exceeded: 15 >= 10/,
    );
  });
});
