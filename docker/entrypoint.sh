#!/bin/sh
echo "[INFO] Starting Flask"
cd ~/BeeMovr/backend
python3 server.py

echo "[INFO] Starting Node.js"
cd ~/BeeMovr/frontend
exec npm start
