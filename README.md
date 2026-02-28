# Context Logger

**Context Engineering Infrastructure for AI-Powered Development**

Context Logger automatically captures your Git activity and transforms it into structured context for AI agents, agentic workflows, and automated development tools.

## The Context Engineering Problem

Modern AI-powered development workflows need rich context about your work:
- 🤖 AI agents need to understand "what have I been working on?"
- 🔄 Agentic workflows require project history for decision-making
- 📊 Automated tools depend on accurate activity tracking
- 🧠 Developer context switches cause information loss

**Context Logger solves this by maintaining a persistent, queryable context layer.**

## How It Works

Context Logger runs in the background and automatically:
- ✅ Tracks your Git commits across all repositories
- ✅ Stores activity in a local SQLite database (privacy-first)
- ✅ Generates daily/weekly summaries
- ✅ Provides structured context for AI agents and automation
- 🔜 Multi-agent context routing (Pro tier)

## Installation

### Quick Install (Recommended)
```bash
curl -fsSL https://raw.githubusercontent.com/p4r4d0xb0x/context-logger/main/bin/install.sh | bash
```

### Manual Install
```bash
git clone https://github.com/p4r4d0xb0x/context-logger.git
cd context-logger
npm install
npm link
```

### NPM (Coming Soon)
```bash
npm install -g context-logger
```

## Usage

### See today's activity
```bash
cd your-project
context-logger today
```

Output:
```
📅 Today's Activity
========================================

📦 Repository: my-awesome-app (main)
📊 Commits: 3

1. [a1b2c3d] Fix authentication bug
   14:23:15

2. [e4f5g6h] Add user profile page
   11:45:32

3. [i7j8k9l] Update README
   09:12:08

========================================
```

### Generate AI-powered summary
```bash
context-logger summary
```

Output:
```
🤖 Generating AI summary...

📝 Today's Work Summary
========================================

Worked on CLAW_WS with 1 commit, focusing on updates. 
Last activity at 14:11:36.

========================================
```

**Note:** For AI-powered summaries, set `ANTHROPIC_API_KEY` in your environment.
Without it, basic keyword-based summaries are generated (still useful!).

### View statistics
```bash
context-logger stats
```

## Use Cases

### For Individual Developers
- 😰 "What did I work on today?" → Instant daily summaries
- ⏰ Writing standup updates → Automated from Git activity
- 📝 PR descriptions → Generated from commit context

### For AI Agents & Agentic Workflows
- 🤖 Persistent memory of developer activity
- 🔄 Context routing for multi-agent systems
- 📊 Decision-making based on project history
- 🧠 Understanding "what's been done" before taking action

### For Teams (Coming Soon)
- 👥 Shared context across team members
- 📈 Project-wide activity tracking
- 🔗 Integration with GitHub Agentic Workflows

## Features

- ✅ Automatic Git commit tracking
- ✅ Local SQLite database (privacy-first)
- ✅ Simple CLI interface
- ✅ AI-powered summaries (Claude/GPT)
- 🔜 Multi-repo support
- 🔜 Context API for AI agents
- 🔜 Multi-agent context routing (Pro)
- 🔜 GitHub Agentic Workflows integration
- 🔜 Team collaboration features

## Privacy & Security

All data stays local on your machine in `~/.context-logger/db.sqlite`.
- ✅ No cloud services (unless you opt-in)
- ✅ No tracking or analytics
- ✅ No data collection
- ✅ Your code context belongs to you

## Tech Stack

- Node.js
- simple-git (Git operations)
- better-sqlite3 (local storage)
- commander (CLI)
- Anthropic Claude API (optional, for AI summaries)

## Roadmap

- [x] Basic Git tracking
- [x] SQLite storage
- [x] CLI commands
- [x] AI summaries (Claude/GPT)
- [ ] Multi-repo tracking
- [ ] Context API for AI agents
- [ ] Export to Markdown/JSON
- [ ] GitHub Agentic Workflows integration
- [ ] Multi-agent context routing
- [ ] Team features (Pro tier)

## Development

```bash
git clone https://github.com/p4r4d0xb0x/context-logger
cd context-logger
npm install
npm link
context-logger today
```

## Contributing

Contributions welcome! This is an open-source project focused on solving context engineering challenges in AI-powered development.

## License

MIT

## Author

Built by 호떡 🥞 - because AI agents deserve better context.

---

**Status:** MVP v0.1.0 - Working! 🎉

**Topics:** `context-engineering` `ai-infrastructure` `agentic-workflows` `developer-tools` `git-automation` `ai-agents`
