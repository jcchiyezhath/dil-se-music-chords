name: Auto-generate setlist.json

on:
  push:
    branches: [ "main" ]
    paths:
      - "songs/**"
      - "generate_setlist.mjs"

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Generate setlist.json
        run: node generate_setlist.mjs

      - name: Commit and push if changed
        run: |
          if git diff --quiet; then
            echo "No changes to commit."
            exit 0
          fi
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add setlist.json
          git commit -m "Auto-update setlist.json"
          git push
