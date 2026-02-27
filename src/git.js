const simpleGit = require('simple-git');
const path = require('path');

/**
 * Git 활동 파싱
 */

class GitParser {
  constructor(repoPath = process.cwd()) {
    this.git = simpleGit(repoPath);
    this.repoPath = repoPath;
  }

  async getTodayCommits() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const since = today.toISOString();

    try {
      const log = await this.git.log({
        '--since': since,
        '--author': await this.getCurrentUser()
      });

      return log.all.map(commit => ({
        hash: commit.hash.substring(0, 7),
        message: commit.message,
        date: commit.date,
        files: commit.diff?.files || []
      }));
    } catch (error) {
      console.error('Git log error:', error.message);
      return [];
    }
  }

  async getCurrentUser() {
    try {
      const config = await this.git.listConfig();
      return config.all['user.name'] || 'unknown';
    } catch {
      return 'unknown';
    }
  }

  async getFileChanges(since) {
    try {
      const diff = await this.git.diffSummary([since, 'HEAD']);
      return {
        files: diff.files.length,
        insertions: diff.insertions,
        deletions: diff.deletions,
        changed: diff.changed
      };
    } catch {
      return { files: 0, insertions: 0, deletions: 0, changed: 0 };
    }
  }

  async getRepoInfo() {
    try {
      const remote = await this.git.getRemotes(true);
      const branch = await this.git.branchLocal();
      
      return {
        name: path.basename(this.repoPath),
        branch: branch.current,
        remote: remote[0]?.refs?.fetch || 'local'
      };
    } catch {
      return {
        name: path.basename(this.repoPath),
        branch: 'unknown',
        remote: 'local'
      };
    }
  }
}

module.exports = GitParser;
