#!/bin/bash

# GitHub Pages 部署脚本
# 用法: ./deploy.sh "commit message"

set -e  # 遇到错误立即退出

echo "🚀 开始部署到 GitHub Pages..."

# 检查是否提供了提交信息
if [ -z "$1" ]; then
  COMMIT_MSG="Update: deploy to GitHub Pages"
else
  COMMIT_MSG="$1"
fi

echo "📝 提交信息: $COMMIT_MSG"

# 检查是否有未提交的更改
if [[ -n $(git status -s) ]]; then
  echo "📦 添加文件到 Git..."
  git add .
  
  echo "💾 提交更改..."
  git commit -m "$COMMIT_MSG"
else
  echo "✅ 没有新的更改需要提交"
fi

# 获取当前分支
CURRENT_BRANCH=$(git branch --show-current)
echo "🌿 当前分支: $CURRENT_BRANCH"

# 推送到 GitHub
echo "⬆️  推送到 GitHub..."
git push origin "$CURRENT_BRANCH"

echo ""
echo "✨ 部署已触发!"
echo "📊 查看部署进度:"
echo "   https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions"
echo ""
echo "🌐 部署完成后访问:"
echo "   https://$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/' | cut -d'/' -f1).github.io/$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/' | cut -d'/' -f2)"
echo ""

