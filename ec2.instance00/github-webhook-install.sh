#!/bin/bash

gh api \
  --method POST \
  -H "Accept: application/vnd.github.v3+json" \
  /repos/dythia102/coding-test/hooks \
  --input - <<EOF
{
  "name": "web",
  "active": true,
  "events": ["push"],
  "config": {
    "url": "http://52.74.52.230:8080/github-webhook/",
    "content_type": "json"
  }
}
EOF
