import { GoogleGenAI } from '@google/genai';
import { logger } from '../utils/logger.js';
import type { SentinelConfig } from '../types/config.js';

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
}

export interface LLMResponse {
  content: string;
  usage: TokenUsage;
}

/**
 * Abstract LLM client interface.
 *
 * Allows swapping LLM providers.
 */
export interface LLMClient {
  call(systemPrompt: string, userPrompt: string): Promise<LLMResponse>;
  getTotalUsage(): TokenUsage;
}

/**
 * Google Gemini API client with token usage tracking.
 */
export class GeminiLLMClient implements LLMClient {
  private client: GoogleGenAI;
  private model: string;
  private maxTokens: number;
  private maxTokensPerRun: number;
  private totalUsage: TokenUsage = { inputTokens: 0, outputTokens: 0 };

  constructor(config: SentinelConfig) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      logger.warn('GEMINI_API_KEY environment variable is not set');
    }
    this.client = new GoogleGenAI({ apiKey: apiKey || '' });
    this.model = config.gemini.model;
    this.maxTokens = config.gemini.max_tokens;
    this.maxTokensPerRun = config.cost.max_tokens_per_run;
  }

  async call(systemPrompt: string, userPrompt: string): Promise<LLMResponse> {
    // Check token budget before calling
    const totalConsumed = this.totalUsage.inputTokens + this.totalUsage.outputTokens;
    if (totalConsumed >= this.maxTokensPerRun) {
      throw new Error(
        `Token budget exceeded: ${totalConsumed} >= ${this.maxTokensPerRun}. ` +
        'Increase cost.max_tokens_per_run in config to continue.',
      );
    }

    logger.info(`Calling Gemini API (model: ${this.model})...`);

    const response = await this.client.models.generateContent({
      model: this.model,
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: this.maxTokens,
      },
    });

    const inputTokens = response.usageMetadata?.promptTokenCount ?? 0;
    const outputTokens = response.usageMetadata?.candidatesTokenCount ?? 0;

    const usage: TokenUsage = {
      inputTokens,
      outputTokens,
    };

    this.totalUsage.inputTokens += usage.inputTokens;
    this.totalUsage.outputTokens += usage.outputTokens;

    logger.info(
      `Gemini API response: ${usage.inputTokens} input + ${usage.outputTokens} output tokens ` +
      `(total: ${this.totalUsage.inputTokens + this.totalUsage.outputTokens})`,
    );

    const content = response.text ?? '';

    return { content, usage };
  }

  getTotalUsage(): TokenUsage {
    return { ...this.totalUsage };
  }
}
