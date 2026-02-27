# Context Logger

**Automatic work context capture from Git activity**

Stop asking yourself "what did I do today?" - Context Logger tracks your Git commits and generates daily summaries automatically.

## Problem

As a developer, you:
- 😰 Forget what you were working on after context switches
- ⏰ Waste time writing PR descriptions or standup updates
- 📝 Can't remember "what did I accomplish today?"

## Solution

Context Logger runs in the background and automatically:
- ✅ Tracks your Git commits
- ✅ Stores activity in a local database
- ✅ Generates daily summaries
- 🔜 AI-powered context summaries (coming soon)

## Installation

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

### Generate AI summary
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

## Features

- ✅ Automatic Git commit tracking
- ✅ Local SQLite database (privacy-first)
- ✅ Simple CLI interface
- 🔜 AI-powered daily summaries
- 🔜 Multi-repo support
- 🔜 PR description generator
- 🔜 Weekly reports

## Privacy

All data stays local on your machine in `~/.context-logger/db.sqlite`.
No cloud services, no tracking, no data collection.

## Roadmap

- [x] Basic Git tracking
- [x] SQLite storage
- [x] CLI commands
- [ ] AI summaries (Claude/GPT)
- [ ] Multi-repo tracking
- [ ] Export to Markdown
- [ ] Slack/Discord integration

## Tech Stack

- Node.js
- simple-git (Git operations)
- better-sqlite3 (local storage)
- commander (CLI)

## Development

```bash
git clone https://github.com/p4r4d0xb0x/context-logger
cd context-logger
npm install
npm link
context-logger today
```

## License

MIT

## Author

Built by 호떡 🥞 - a developer who forgets what they did 5 minutes ago.

---

**Status:** MVP v0.1.0 - Working! 🎉
