# Git Quick Reference for WithMilestone

Quick commands and workflows for daily git operations.

## Initial Setup

```bash
# Initialize git repository (one time)
cd /Users/melchorvalencia/Documents/WithMilestone
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Initial commit
git commit -m "initial: withmilestone mvp v1.0.0"

# Rename branch to main
git branch -M main

# Add remote repository
git remote add origin https://github.com/yourusername/withmilestone.git

# Push to GitHub
git push -u origin main

# Create develop branch
git checkout -b develop
git push -u origin develop
```

## Daily Workflow

### Starting a New Feature

```bash
# 1. Make sure you're on develop
git checkout develop

# 2. Update with latest changes
git pull origin develop

# 3. Create feature branch
git checkout -b feature/001-user-authentication develop

# 4. Push it to remote (setup tracking)
git push -u origin feature/001-user-authentication

# 5. Start working...
```

### Working on Your Feature

```bash
# Check status
git status

# Stage changes
git add .

# Commit changes (use conventional commit format)
git commit -m "feat(auth): add login endpoint

- Create AuthController
- Add JWT token generation
- Add password hashing"

# Push changes
git push origin feature/001-user-authentication

# Update from parent branch if needed
git fetch origin
git rebase origin/develop

# Force push after rebase (safe with lease)
git push origin feature/001-user-authentication --force-with-lease
```

### Staying Updated

```bash
# Fetch latest changes
git fetch origin

# Rebase on parent branch (preferred)
git rebase origin/develop

# OR merge (if rebase causes issues)
git merge origin/develop

# Resolve conflicts if any
# Edit files, then:
git add .
git rebase --continue
```

### Creating Pull Request

```bash
# Ensure your branch is up to date
git fetch origin
git rebase origin/develop
git push origin feature-branch

# Go to GitHub and create PR
# Link to issue: Fixes #123
# Add description from template
# Request reviewers
# Submit PR
```

### After PR Approval

```bash
# Merge via GitHub UI
# Select "Squash and merge" or "Create merge commit"

# Locally, update develop
git checkout develop
git pull origin develop

# Delete local feature branch
git branch -d feature/001-user-authentication

# Delete remote feature branch
git push origin --delete feature/001-user-authentication
```

## Common Commands

### Checking Status
```bash
# See current status
git status

# See diff of changes
git diff

# See staged changes
git diff --staged

# See branch info
git branch -v

# See all branches (including remote)
git branch -av
```

### Viewing History
```bash
# View last 5 commits
git log -5

# View commits with one line each
git log --oneline -10

# View commits since last week
git log --since="1 week ago"

# View commits by author
git log --author="Your Name"

# View commits affecting file
git log -- app/Models/User.php
```

### Undoing Changes

```bash
# Discard changes in working directory
git checkout -- app/file.php

# Discard all changes
git checkout -- .

# Unstage file
git reset HEAD app/file.php

# Amend last commit (only if not pushed)
git add .
git commit --amend --no-edit

# Revert commit (creates new commit that undoes it)
git revert abc1234

# Hard reset to parent branch (WARNING: loses changes)
git reset --hard origin/develop
```

### Stashing Work

```bash
# Save work temporarily
git stash

# List stashes
git stash list

# Apply most recent stash
git stash pop

# Apply specific stash
git stash apply stash@{0}

# Delete a stash
git stash drop stash@{0}
```

## Branch Operations

### Creating Branches
```bash
# Create feature branch from develop
git checkout -b feature/002-user-history develop

# Create from current branch
git checkout -b feature/branch-name

# Create and track remote
git checkout -b feature/branch-name origin/develop
git push -u origin feature/branch-name
```

### Switching Branches
```bash
# Switch to branch
git checkout develop

# Create and switch
git checkout -b feature/new-feature

# Switch to previous branch
git checkout -
```

### Deleting Branches
```bash
# Delete local branch
git branch -d feature/branch-name

# Force delete (if not merged)
git branch -D feature/branch-name

# Delete remote branch
git push origin --delete feature/branch-name

# Delete multiple
git branch -d feature/001 feature/002
```

### Renaming Branches
```bash
# Rename current branch
git branch -m new-name

# Rename other branch
git branch -m old-name new-name

# Rename and push to remote
git push origin --delete old-name
git push -u origin new-name
```

## Merging & Rebasing

### Merging
```bash
# Merge feature to develop
git checkout develop
git pull origin develop
git merge feature/001-user-authentication

# Push merged develop
git push origin develop

# Delete feature branch after merge
git push origin --delete feature/001-user-authentication
```

### Rebasing (preferred)
```bash
# Rebase on develop
git fetch origin
git rebase origin/develop

# If conflicts, resolve them and:
git add .
git rebase --continue

# To abort rebase
git rebase --abort

# Force push after rebase
git push origin feature-branch --force-with-lease
```

### Interactive Rebase (squash commits)
```bash
# Rebase last 3 commits
git rebase -i HEAD~3

# In editor: replace 'pick' with 's' to squash commits
# Save and confirm

# Force push
git push origin feature-branch --force-with-lease
```

## Conflict Resolution

### Handling Merge Conflicts

```bash
# When you see conflict message
git status  # See files in conflict

# Edit files and fix conflicts
# Markers look like:
<<<<<<< HEAD
your changes
=======
their changes
>>>>>>> branch-name

# After resolving:
git add .
git commit -m "resolve: merge conflict in file.php"
git push origin branch-name
```

### Merge Strategies
```bash
# Use their changes
git checkout --theirs filename.php

# Use your changes
git checkout --ours filename.php

# Abort merge
git merge --abort

# Abort rebase
git rebase --abort
```

## Tags

### Creating Tags
```bash
# Create lightweight tag
git tag v1.1.0

# Create annotated tag (recommended)
git tag -a v1.1.0 -m "Release v1.1.0"

# Tag previous commit
git tag v1.1.0 abc1234

# Push tags
git push origin v1.1.0
git push origin --tags
```

### Viewing Tags
```bash
# List tags
git tag

# List tags matching pattern
git tag -l "v1.*"

# Show tag details
git show v1.1.0
```

### Deleting Tags
```bash
# Delete local tag
git tag -d v1.1.0

# Delete remote tag
git push origin --delete v1.1.0
```

## Remote Operations

### Managing Remotes
```bash
# List remotes
git remote -v

# Add remote
git remote add origin https://github.com/user/repo.git

# Remove remote
git remote remove origin

# Change remote URL
git remote set-url origin https://github.com/user/new-repo.git
```

### Fetching & Pulling
```bash
# Fetch (doesn't change your files)
git fetch origin

# Fetch specific branch
git fetch origin develop

# Pull (fetch + merge)
git pull origin develop

# Pull with rebase
git pull --rebase origin develop
```

### Pushing
```bash
# Push branch
git push origin feature-branch

# Push with setup tracking
git push -u origin feature-branch

# Force push (safe version)
git push origin branch --force-with-lease

# Push all branches
git push origin --all

# Push tags
git push origin --tags
```

## Useful Aliases

Add to git config:

```bash
# Add aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'

# Usage examples
git co develop          # checkout
git br -av              # branch -av
git st                  # status
git unstage file.php    # reset HEAD file.php
```

## Branch Protection (GitHub Settings)

For `main` and `develop`:

```
Settings > Branches > Branch protection rules

main:
✓ Require pull request reviews before merging (2)
✓ Require status checks to pass
✓ Require branches to be up to date
✗ Allow force pushes

develop:
✓ Require pull request reviews before merging (1)
✓ Require status checks to pass
✓ Dismiss stale reviews when new commits
```

## Workflow Templates

### Feature Development
```bash
# 1. Create branch
git checkout -b feature/nnn-description develop
git push -u origin feature/nnn-description

# 2. Work on feature
git add .
git commit -m "feat(scope): description"
git push origin feature/nnn-description

# 3. Keep updated
git fetch origin
git rebase origin/develop
git push origin feature/nnn-description --force-with-lease

# 4. Create PR and get approval

# 5. Merge via GitHub

# 6. Cleanup
git checkout develop
git pull origin develop
git branch -d feature/nnn-description
```

### Bug Fix
```bash
# 1. Create branch
git checkout -b bugfix/issue-description develop

# 2. Fix bug with tests
git add .
git commit -m "fix(scope): issue description

- Root cause explanation
- Fix implementation
- Test coverage added"

git push origin bugfix/issue-description

# 3. PR, review, merge
```

### Hotfix (Production Issue)
```bash
# 1. Create from main
git checkout -b hotfix/issue-description main

# 2. Fix and test thoroughly
git add .
git commit -m "hotfix(scope): critical issue"
git push origin hotfix/issue-description

# 3. Create PR to main, get approval, merge
git checkout main
git pull origin main
git merge hotfix/issue-description

# 4. Merge to develop
git checkout develop
git pull origin develop
git merge hotfix/issue-description

# 5. Delete hotfix branch
git push origin --delete hotfix/issue-description
```

## Troubleshooting

### Lost Commits
```bash
# View all commits ever made
git reflog

# Restore to specific commit
git checkout abc1234

# Create branch from lost commit
git checkout -b recovered abc1234
```

### Undo Push (if not merged)
```bash
# View what was pushed
git log origin/develop..develop

# Revert commits locally
git reset --soft HEAD~1

# Force push to remote
git push origin branch --force-with-lease
```

### Clean Up Local Branches
```bash
# Delete all local branches except main and develop
git branch -d $(git branch | grep -v 'main\|develop')

# Delete branches not on remote
git fetch -p
git branch -vv | grep 'gone' | awk '{print $1}' | xargs git branch -d
```

### Check What Will Merge
```bash
# See what commits will merge
git log develop..feature-branch

# See what files will change
git diff develop...feature-branch --name-only

# See full diff
git diff develop...feature-branch
```

## Best Practices

✅ **DO:**
- Pull before pushing
- Commit frequently with clear messages
- Create focused branches
- Keep branches short-lived (< 1 week)
- Use rebase to keep history clean
- Review your own code before PR
- Write descriptive PR descriptions
- Test locally before pushing

❌ **DON'T:**
- Force push to develop/main
- Commit directly to main
- Mix multiple features in one branch
- Ignore merge conflicts
- Use `git push -f` (use `--force-with-lease` instead)
- Leave stale branches
- Commit sensitive data (API keys, passwords)
- Merge without tests passing

## Useful Resources

- [Git Official Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)
- [Oh Shit, Git!?!](https://ohshitgit.com/) - Common problems & solutions
- [Git Tips & Tricks](https://github.com/joshnh/Git-Commands)

## Emergency Commands

```bash
# Complete undo (WARNING: loses all uncommitted changes)
git reset --hard origin/main

# Get back to where you started
git reflog
git reset --hard <commit>

# Remove file from git (but keep locally)
git rm --cached filename
git commit -m "remove: filename from tracking"

# Remove file from entire history (WARNING: destructive)
git filter-branch --tree-filter 'rm -f secrets.env' --prune-empty HEAD

# View what you've done
git reflog
```

---

**Remember:** When in doubt, ask for help or check this reference!
