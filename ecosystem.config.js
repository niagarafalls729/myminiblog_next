module.exports = {
  apps: [{
    name: "frontend-next",
    script: "npm",
    args: "run start",
    instances: 1,
    autorestart: true,
    watch: false, // Next.js는 빌드 과정이 필요하므로 watch로 자동 재시작하는 것이 의미가 없습니다. (코드 수정 후 빌드 필요)
    env: {
      NODE_ENV: "production",
      NEXT_PUBLIC_API_KEY: "http://158.180.78.245:4000" // 백엔드 IP 주소
    }
  }]
}
