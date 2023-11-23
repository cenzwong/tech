# Command

# Compare the files of a branch is the same as other
```
git diff origin/branch origin/master
```

# Compare the commits beteen wo branches
```
git log --left-right --graph --cherry-pick --oneline origin/branch..origin/master
```
