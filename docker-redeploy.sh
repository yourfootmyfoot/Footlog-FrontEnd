#!/bin/bash

# 스크립트 이름: build_and_deploy.sh

set -e

echo "Starting build and deploy process..."

# 현재 디렉토리가 프로젝트 루트인지 확인
if [ ! -f "package.json" ] || [ ! -f "docker-compose.yml" ]; then
    echo "Error: package.json or docker-compose.yml not found. Please run this script from the project root."
    exit 1
fi

# 환경 변수 파일이 있다면 로드
if [ -f ".env" ]; then
    export $(cat .env | xargs)
fi

# 이전 빌드 제거
echo "Removing previous build..."
rm -rf dist

# React 애플리케이션 빌드
echo "Building the React application..."
yarn install
yarn build

# Docker 이미지 빌드
echo "Building Docker image..."
docker-compose build

# 기존 컨테이너 중지 및 제거
echo "Stopping and removing existing containers..."
docker-compose down

# 새 컨테이너 시작
echo "Starting new containers..."
docker-compose up -d

echo "Build and deploy process completed successfully!"