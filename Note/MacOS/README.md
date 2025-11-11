### 🧠 Step 1：搵 `.venv` 資料夾

開 Terminal，喺你平時放 project 嘅資料夾（例如 `~/Projects`）入面跑：

```bash
find . -type d -name ".venv"
```

然後睇吓有幾多個虛擬環境。再用：

```bash
du -sh .venv
```

喺每個目錄入面跑一次，就會顯示 `.venv` 大小。

如果想一次過搵晒所有 `.venv` 並顯示佢哋嘅大小，可以用：

```bash
find ~ -type d -name ".venv" -exec du -sh {} + 2>/dev/null
```

---

### 🧩 Step 2：檢查 pip cache

pip 會喺你屋企目錄下邊個位置儲 cache：

```
~/Library/Caches/pip
```

睇下大小：

```bash
du -sh ~/Library/Caches/pip
```

如果太大，可以清理：

```bash
pip cache purge
```

---

### 🧪 Step 3：檢查 uv（即 [uv](https://github.com/astral-sh/uv) Python package manager）cache

uv 默認會用：

```
~/Library/Caches/uv
```

睇大小：

```bash
du -sh ~/Library/Caches/uv
```

想清空就：

```bash
uv cache prune
```

或者直接：

```bash
rm -rf ~/Library/Caches/uv
```

---

### ⚙️ 延伸：睇下所有 Python 相關 cache

```bash
du -sh ~/Library/Caches/* | grep -i "python"
```

有時 Xcode、VSCode、或者 Docker 都會有關聯。

---

如果你願意，可以貼出以上命令嘅輸出結果（例如 `.venv`、`pip`、`uv` cache 大小），我可以幫你估下邊個最值得清理、清完大約可以慳幾多 GB。
