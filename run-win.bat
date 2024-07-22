@echo off
cd docker

echo Building and starting Docker containers...
docker-compose up --build

pause