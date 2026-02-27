const https = require('https');

/**
 * AI 요약 생성 (Claude API)
 */

class AISummarizer {
  constructor(apiKey = process.env.ANTHROPIC_API_KEY) {
    this.apiKey = apiKey;
    this.model = 'claude-3-5-sonnet-20241022';
  }

  async summarize(commits, repoInfo) {
    if (!this.apiKey) {
      return this.generateBasicSummary(commits, repoInfo);
    }

    const prompt = this.buildPrompt(commits, repoInfo);

    try {
      const response = await this.callClaude(prompt);
      return response;
    } catch (error) {
      console.error('AI summary failed, using basic summary:', error.message);
      return this.generateBasicSummary(commits, repoInfo);
    }
  }

  buildPrompt(commits, repoInfo) {
    const commitList = commits.map(c => 
      `- [${c.hash}] ${c.message} (${new Date(c.date).toLocaleTimeString()})`
    ).join('\n');

    return `You are analyzing a developer's Git activity. Generate a concise, natural summary.

Repository: ${repoInfo.name} (${repoInfo.branch})
Commits today: ${commits.length}

Commit history:
${commitList}

Generate a brief summary (2-3 sentences) describing what the developer worked on today. Focus on:
1. Main features/tasks
2. Any issues or bugs fixed
3. Overall theme of the work

Be conversational and specific. Use past tense.`;
  }

  callClaude(prompt) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        model: this.model,
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      const options = {
        hostname: 'api.anthropic.com',
        port: 443,
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Length': data.length
        }
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          try {
            const response = JSON.parse(body);
            if (response.content && response.content[0]) {
              resolve(response.content[0].text);
            } else {
              reject(new Error('Invalid API response'));
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }

  generateBasicSummary(commits, repoInfo) {
    if (commits.length === 0) {
      return 'No activity recorded today.';
    }

    const messages = commits.map(c => c.message.split('\n')[0]);
    const uniqueTopics = [...new Set(messages.map(m => {
      // Extract main action words
      const words = m.toLowerCase().split(' ');
      if (words.includes('fix')) return 'bug fixes';
      if (words.includes('add')) return 'new features';
      if (words.includes('update')) return 'updates';
      if (words.includes('refactor')) return 'refactoring';
      return 'development';
    }))];

    return `Worked on ${repoInfo.name} with ${commits.length} commit${commits.length > 1 ? 's' : ''}, focusing on ${uniqueTopics.join(', ')}. Last activity at ${new Date(commits[0].date).toLocaleTimeString()}.`;
  }
}

module.exports = AISummarizer;
