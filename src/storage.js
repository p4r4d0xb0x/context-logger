const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const os = require('os');

/**
 * SQLite 저장소
 */

class Storage {
  constructor(dbPath = null) {
    const defaultPath = path.join(os.homedir(), '.context-logger', 'db.sqlite');
    this.dbPath = dbPath || defaultPath;
    
    // 디렉토리 생성
    const dir = path.dirname(this.dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.db = new Database(this.dbPath);
    this.init();
  }

  init() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS commits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hash TEXT UNIQUE,
        message TEXT,
        date TEXT,
        repo TEXT,
        author TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS file_changes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        commit_hash TEXT,
        file_path TEXT,
        insertions INTEGER,
        deletions INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (commit_hash) REFERENCES commits(hash)
      );

      CREATE TABLE IF NOT EXISTS summaries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT UNIQUE,
        summary TEXT,
        commit_count INTEGER,
        file_count INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_commits_date ON commits(date);
      CREATE INDEX IF NOT EXISTS idx_summaries_date ON summaries(date);
    `);
  }

  saveCommit(commit, repo) {
    const stmt = this.db.prepare(`
      INSERT OR IGNORE INTO commits (hash, message, date, repo, author)
      VALUES (?, ?, ?, ?, ?)
    `);

    return stmt.run(
      commit.hash,
      commit.message,
      commit.date,
      repo,
      commit.author || 'unknown'
    );
  }

  getTodayCommits() {
    const today = new Date().toISOString().split('T')[0];
    const stmt = this.db.prepare(`
      SELECT * FROM commits
      WHERE date LIKE ?
      ORDER BY date DESC
    `);
    return stmt.all(`${today}%`);
  }

  saveSummary(date, summary, commitCount, fileCount) {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO summaries (date, summary, commit_count, file_count)
      VALUES (?, ?, ?, ?)
    `);
    return stmt.run(date, summary, commitCount, fileCount);
  }

  getSummary(date) {
    const stmt = this.db.prepare('SELECT * FROM summaries WHERE date = ?');
    return stmt.get(date);
  }

  close() {
    this.db.close();
  }
}

module.exports = Storage;
