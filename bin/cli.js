#!/usr/bin/env node

const { Command } = require('commander');
const GitParser = require('../src/git');
const Storage = require('../src/storage');

const program = new Command();

program
  .name('context-logger')
  .description('Automatic work context capture from Git activity')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize context logger in current directory')
  .action(async () => {
    console.log('🥞 Context Logger initialized!');
    console.log('Run "context-logger today" to see your activity.');
  });

program
  .command('today')
  .description('Show today\'s activity')
  .action(async () => {
    const git = new GitParser();
    const storage = new Storage();

    try {
      console.log('\n📅 Today\'s Activity\n' + '='.repeat(40));
      
      const commits = await git.getTodayCommits();
      const repo = await git.getRepoInfo();

      if (commits.length === 0) {
        console.log('\nNo commits today yet. Keep coding! 🔥\n');
        return;
      }

      console.log(`\n📦 Repository: ${repo.name} (${repo.branch})`);
      console.log(`📊 Commits: ${commits.length}\n`);

      commits.forEach((commit, i) => {
        console.log(`${i + 1}. [${commit.hash}] ${commit.message}`);
        console.log(`   ${new Date(commit.date).toLocaleTimeString()}\n`);
        
        // Save to database
        storage.saveCommit(commit, repo.name);
      });

      console.log('='.repeat(40) + '\n');
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      storage.close();
    }
  });

program
  .command('stats')
  .description('Show statistics')
  .action(() => {
    const storage = new Storage();
    const commits = storage.getTodayCommits();
    
    console.log('\n📊 Statistics\n' + '='.repeat(40));
    console.log(`Total commits today: ${commits.length}`);
    console.log(`Database: ${storage.dbPath}\n`);
    
    storage.close();
  });

program.parse();
