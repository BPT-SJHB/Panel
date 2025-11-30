#!/bin/bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

REPO_DIR="/source/Panel/"
BRANCH="main"
LOG_DIR="/var/log/panel_update.log"
DIST_DIR="$REPO_DIR/dist/bpt-sjhb-panel/browser"
DEPLOY_DIR="/var/www/eldoria"

touch "$LOG_DIR" 2>/dev/null

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >>"$LOG_DIR"
}

cd "$REPO_DIR"

git fetch origin "$BRANCH" --quiet || {
  log "ERROR: Branch couldn't fetch from origin"
  exit 1
}

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/$BRANCH 2>/dev/null)

if [ "$LOCAL" = "$REMOTE" ]; then
  exit 0
fi

log "INFO: Changes detected on $BRANCH"

if git stash --quiet; then
  log "INFO: Stash successful"
else
  log "ERROR: Stash failed"
  exit 1
fi

if git pull origin "$BRANCH" --quiet; then
  log "INFO: Pull successful"
else
  log "ERROR: Pull failed"
  exit 1
fi

if git stash pop --quiet; then
  log "INFO: Stash pop successful"
else
  log "ERROR: Stash pop failed"
  exit 1
fi

log "INFO: Removing Node"
rm -rf ./node_modules/

if npm install; then
  log "INFO: Packages installed successful"
else
  log "ERROR: Packages installed failed"
  exit 1
fi

if ng build --output-hashing=all --configuration production; then
  log "INFO: Build successful"
else
  log "ERROR: Build failed"
  exit 1
fi

log "INFO: Copying build to $DEPLOY_DIR"
sudo mkdir -p "$DEPLOY_DIR" 2>>$LOG_DIR
sudo cp -r "$DIST_DIR"/* "$DEPLOY_DIR/" 2>>$LOG_DIR

log "Setting permissions for $DEPLOY_DIR"
sudo chown -R www-data:www-data "$DEPLOY_DIR" 2>>$LOG_DIR

if nginx -t 2>/dev/null && nginx -s reload; then
  log "INFO: Nginx config reloaded successfully"
else
  log "ERROR: Nginx config test failed or reload failed"
fi

log "=================END================="
