# Command

# Compare the files of a branch is the same as other
```bash
git diff origin/branch origin/master
```

# Compare the commits beteen wo branches
```bash
git log --left-right --graph --cherry-pick --oneline origin/branch..origin/master
```
# Remove all branches except local main
```bash
git branch | grep -v main | xargs git branch -D 
```