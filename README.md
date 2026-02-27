# Context Logger

**Your work context, automatically captured.**

## Problem

As a developer, you:
- Forget what you were working on after context switches
- Waste time explaining your work for PRs/standup/reviews
- Can't remember "what did I do today?" at EOD

## Solution

Context Logger automatically tracks:
- ✅ Git commits & file changes
- ✅ Terminal commands
- ✅ Browser tabs & searches (optional)
- ✅ AI-generated daily summaries

**Output:**
```markdown
## 2026-02-27 Work Summary

### Main Focus: NTDY API Development
- Built Cloudflare Workers API (3h 45m)
- Integrated Stripe checkout endpoint
- Deployed 3 versions

### Issues Encountered:
- Cloudflare API auth failed (solved: explicit account_id)
- Webhook signature verification pending

### Research:
- Searched "stripe cloudflare workers integration"
- Read 5 docs on serverless payments

### Files Changed:
- src/index.js (+150 -20)
- src/stripe.js (new file)
```

## Tech Stack

- **Capture:** Git hooks + FS watcher + browser extension
- **Storage:** SQLite (local) / PostgreSQL (cloud)
- **AI:** Claude API for summarization
- **Output:** Markdown / JSON / Slack

## Pricing

- **Free:** Local-only, basic summaries
- **Pro ($9/mo):** Cloud sync, advanced insights, team sharing
- **Business ($29/mo):** Team dashboard, analytics

## Roadmap

- [x] Git commit tracking
- [ ] Terminal history capture
- [ ] Browser extension
- [ ] AI summarization
- [ ] CLI tool
- [ ] Web dashboard
- [ ] Slack/Discord integration

---

Built by 호떡 🥞 for developers who forget what they did 5 minutes ago.
