import { AccessibilityIssueDTO } from "../types/index";
import puppeteer from "puppeteer";
import { AxePuppeteer } from "@axe-core/puppeteer";

export class AccessibilityService {

  static async analyzeHtml(html: string): Promise<AccessibilityIssueDTO[]> {
    try {
      console.log("🔍 Starting axe-core accessibility analysis...");
      const startTime = Date.now();

      // Use axe-core's built-in HTML analysis
      const results = await this.runAxeOnHtml(html);

      const analysisTime = Date.now() - startTime;
      console.log(`✅ Axe-core analysis completed in ${analysisTime}ms`);

      // Convert axe results to our DTO format
      const issues: AccessibilityIssueDTO[] = [];

      // Process violations (definite issues)
      if (results.violations) {
        results.violations.forEach((violation: any) => {
          const severity = this.mapAxeSeverityToType(violation.impact);

          violation.nodes.forEach((node: any) => {
            issues.push({
              type: severity,
              message: `${violation.description} - ${node.failureSummary || violation.help}`,
              selector: Array.isArray(node.target) ? node.target.join(', ') : node.target,
              context: `Rule: ${violation.id} | WCAG: ${violation.tags?.filter((tag: string) => tag.startsWith('wcag')).join(', ') || 'N/A'}`
            });
          });
        });
      }

      // Process incomplete results (potential issues that need review)
      if (results.incomplete) {
        results.incomplete.forEach((incomplete: any) => {
          incomplete.nodes.forEach((node: any) => {
            issues.push({
              type: "Medium",
              message: `Needs Review: ${incomplete.description} - ${node.failureSummary || incomplete.help}`,
              selector: Array.isArray(node.target) ? node.target.join(', ') : node.target,
              context: `Rule: ${incomplete.id} | WCAG: ${incomplete.tags?.filter((tag: string) => tag.startsWith('wcag')).join(', ') || 'N/A'}`
            });
          });
        });
      }

      console.log(`🎯 Found ${issues.length} accessibility issues (${results.violations?.length || 0} violations, ${results.incomplete?.length || 0} incomplete)`);

      return issues;
    } catch (error: any) {
      console.error("Axe-core analysis error:", error.message);
      throw new Error("Failed to analyze accessibility with axe-core");
    }
  }
  /**
   * Run axe-core analysis on HTML string using Puppeteer
   */
  private static async runAxeOnHtml(html: string): Promise<any> {
    let browser;
    try {
      // Launch headless browser
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();

      // Set the HTML content
      await page.setContent(html, { waitUntil: 'domcontentloaded' });

      // Run axe-core analysis
      const results = await new AxePuppeteer(page)
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
        .analyze();

      return results;
    } catch (error) {
      console.error('Puppeteer axe analysis failed:', error);
      // Fallback to regex-based analysis
      return this.runBasicAccessibilityChecks(html);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  /**
   * Fallback regex-based accessibility checks
   */
  private static runBasicAccessibilityChecks(html: string): any {
    const issues = {
      violations: [] as any[],
      incomplete: [] as any[]
    };

    // Basic accessibility checks
    const checks = [
      {
        id: 'image-alt',
        description: 'Images must have alternate text',
        impact: 'critical',
        regex: /<img(?![^>]*alt=)[^>]*>/gi,
        help: 'Add alt attribute to images'
      },
      {
        id: 'form-labels',
        description: 'Form inputs must have labels',
        impact: 'critical',
        regex: /<input(?![^>]*(?:aria-label|aria-labelledby))[^>]*type=["'](?:text|email|password|number)["'][^>]*>/gi,
        help: 'Add labels or ARIA attributes to form inputs'
      },
      {
        id: 'button-name',
        description: 'Buttons must have accessible names',
        impact: 'serious',
        regex: /<button(?![^>]*(?:aria-label|aria-labelledby))[^>]*>\s*<\/button>/gi,
        help: 'Add text content or ARIA labels to buttons'
      },
      {
        id: 'link-name',
        description: 'Links must have accessible names',
        impact: 'serious',
        regex: /<a(?![^>]*(?:aria-label|aria-labelledby))[^>]*>\s*<\/a>/gi,
        help: 'Add text content or ARIA labels to links'
      }
    ];

    checks.forEach(check => {
      const matches = html.match(check.regex);
      if (matches) {
        matches.forEach((match, index) => {
          issues.violations.push({
            id: check.id,
            description: check.description,
            impact: check.impact,
            help: check.help,
            tags: ['wcag2a', 'wcag2aa'],
            nodes: [{
              target: [`${check.id}-violation-${index + 1}`],
              failureSummary: `Found: ${match.substring(0, 100)}...`
            }]
          });
        });
      }
    });

    return issues;
  }

  /**
   * Map axe-core severity levels to our DTO types
   */
  private static mapAxeSeverityToType(impact: string | undefined): string {
    switch (impact) {
      case 'critical':
        return 'Critical';
      case 'serious':
        return 'High';
      case 'moderate':
        return 'Medium';
      case 'minor':
        return 'Low';
      default:
        return 'Medium';
    }
  }

  /**
   * Generate actionable code fixes for accessibility issues
   */
  static async generateCodeFixes(
    issues: AccessibilityIssueDTO[]
  ): Promise<Array<{ issue: AccessibilityIssueDTO; fixCode: string; explanation: string }>> {
    if (!issues || !Array.isArray(issues) || issues.length === 0) {
      return [];
    }
    const fixes = [];

    for (const issue of issues.slice(0, 5)) { // Limit to 5 issues for performance
      try {
        const prompt = `You are an expert web developer. Generate a specific code fix for this accessibility issue.

Issue: ${issue.message}
Selector: ${issue.selector || 'N/A'}
Context: ${issue.context || 'N/A'}

Respond ONLY with valid JSON in this exact format:
{
  "code": "exact HTML code fix here",
  "explanation": "brief explanation in 1-2 sentences"
}

Examples:
- For missing alt: {"code": "<img src='image.jpg' alt='Descriptive text'>", "explanation": "Add descriptive alt text to make images accessible to screen readers."}
- For empty button: {"code": "<button>Submit Form</button>", "explanation": "Add descriptive text content to make button purpose clear."}
- For missing lang: {"code": "<html lang='en'>", "explanation": "Add language attribute to help screen readers pronounce content correctly."}

Respond with JSON only, no other text:`;

        const response = await this.callGeminiAPI(prompt, 'AI_API_KEY_CODE_FIX');

        try {
          // Clean up the response - remove markdown code blocks and extra text
          let cleanResponse = response.trim();

          // Remove markdown code blocks
          cleanResponse = cleanResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');

          // Try to extract JSON from the response
          const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            cleanResponse = jsonMatch[0];
          }

          const parsed = JSON.parse(cleanResponse);
          fixes.push({
            issue,
            fixCode: parsed.code || 'No code provided',
            explanation: parsed.explanation || 'No explanation provided'
          });
        } catch (e) {
          console.warn('Failed to parse AI response for issue:', issue.message, 'Response:', response);

          // Better fallback - try to extract useful information
          let fallbackCode = 'No specific code provided';
          let fallbackExplanation = 'AI provided general guidance';

          // Try to extract some useful content even if JSON parsing fails
          if (response.includes('alt=')) {
            fallbackCode = '<img src="..." alt="Descriptive text here">';
            fallbackExplanation = 'Add descriptive alt text to images';
          } else if (response.includes('lang=')) {
            fallbackCode = '<html lang="en">';
            fallbackExplanation = 'Add language attribute to HTML element';
          } else if (response.includes('button') && response.includes('text')) {
            fallbackCode = '<button>Descriptive button text</button>';
            fallbackExplanation = 'Add descriptive text content to buttons';
          } else if (response.includes('label')) {
            fallbackCode = '<label for="input-id">Label text</label><input id="input-id" type="text">';
            fallbackExplanation = 'Associate labels with form inputs';
          } else if (response.includes('main')) {
            fallbackCode = '<main><!-- Main content here --></main>';
            fallbackExplanation = 'Wrap main content in a <main> landmark';
          }

          fixes.push({
            issue,
            fixCode: fallbackCode,
            explanation: fallbackExplanation
          });
        }
      } catch (error) {
        console.error('Failed to generate fix for issue:', issue.message);
      }
    }

    return fixes;
  }

  static async generateRecommendations(
    issues: AccessibilityIssueDTO[]
  ): Promise<string> {
    if (!issues || !Array.isArray(issues) || issues.length === 0) {
      throw new Error("No accessibility issues provided.");
    }

    const formattedIssues = issues
      .map((issue: any, index: number) => {
        return `${index + 1}. Type: ${issue.type || "Unknown"}, Message: ${issue.message || issue.description || "No description"}${issue.selector ? `, Selector: ${issue.selector}` : ""}`;
      })
      .join("\n");

    const prompt = `You are an expert in web accessibility. I have identified the following accessibility issues on a webpage:\n\n${formattedIssues}\n\nPlease provide concise, actionable recommendations to fix these issues. Focus on practical steps a developer can take. Group recommendations by issue type if possible.`;

    try {
      const recKey = process.env.AI_API_KEY_RECC;
      if (!recKey) {
        throw new Error("Missing AI_API_KEY_RECC environment variable");
      }

      // Direct API call to Google Gemini
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${recKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 1000000,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Gemini API error response:", errorData);

        if (response.status === 429) {
          throw new Error(
            "Rate limit exceeded. Please try again in a few minutes."
          );
        }
        if (response.status === 503) {
          throw new Error(
            "AI service is temporarily overloaded. Please try again in a few minutes."
          );
        }
        if (response.status === 403 || response.status === 401) {
          throw new Error(
            "Invalid API key. Please check your AI_API_KEY_RECC configuration."
          );
        }

        throw new Error(
          `Gemini API error: ${response.status} - ${errorData?.error?.message || response.statusText}`
        );
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text || text.trim().length === 0) {
        console.error("Empty response from Gemini:", data);
        throw new Error("AI returned empty recommendations");
      }

      return text;
    } catch (error: any) {
      console.error(
        "Error generating AI recommendations:",
        error?.message || error
      );

      if (error?.message?.includes("fetch")) {
        throw new Error(
          "Failed to connect to AI service. Please check your internet connection."
        );
      }

      throw error instanceof Error
        ? error
        : new Error("Failed to generate AI recommendations");
    }
  }
  /**
   * Helper method to call Gemini API
   */
  private static async callGeminiAPI(prompt: string, apiKeyEnv: string): Promise<string> {
    const apiKey = process.env[apiKeyEnv];
    if (!apiKey) {
      throw new Error(`Missing ${apiKeyEnv} environment variable`);
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1000,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }
}
