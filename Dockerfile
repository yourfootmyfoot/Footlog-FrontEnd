# 빌드 단계
FROM node:20-alpine AS build

# 필요한 패키지 설치 (git 포함)
RUN apk update && apk add --no-cache git

WORKDIR /app

# 빌드 아규먼트 설정
ARG VITE_KAKAOMAP_KEY

# 환경 변수 설정
ENV VITE_KAKAOMAP_KEY=${VITE_KAKAOMAP_KEY}

# 패키지 파일 복사 및 의존성 설치
COPY package.json yarn.lock ./
RUN yarn install

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN yarn build

# 실행 단계
FROM nginx:alpine

# 빌드된 파일을 Nginx의 기본 디렉토리에 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 사용자 정의 Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
