# yt-dlp-web
웹으로 간편하게 [yt-dlp](https://github.com/yt-dlp/yt-dlp)를 이용해보세요.

[Supported Sites](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md)

<br />

# 프리뷰
| Light | Dark |
|--|--|
| <img width="981" alt="SCR-20230426" src="https://user-images.githubusercontent.com/74892930/234488572-00fcc4f0-f368-4e34-b3d3-2ff0acc03b4a.png"> | <img width="977" alt="SCR-20230427" src="https://user-images.githubusercontent.com/74892930/234488581-8aeddb8b-e1b7-48a4-8a73-70c179ca21d3.png"> |

# 설치

`docker-compose.yml`에서 `user`, `volumes`, `ports`를 환경에 맞게 설정해주세요
```YML
version: "3"

services:
  yt-dlp-web:
    image: sooros5132/yt-dlp-web
    container_name: yt-dlp-web
    user: 1000:1000 # User Id, Group Id Setting
    volumes:
      - /path/to/downloads:/downloads # Downloads folder
      - /path/to/cache:/cache         # Cache folder
    ports:
      - 3000:3000 # Port mapping
    restart: unless-stopped
```

# 시작
```BASH
# docker-compose v1 일 경우
docker-compose up -d

# docker-compose v2 일 경우
docker compose up -d
```

<br />

# 테스트한 환경
- Ubuntu 22.4 LTS
- macOS Ventura v13.2.1

# 사용한 기술스택
- [yt-dlp v2023.03.04](https://github.com/yt-dlp/yt-dlp)
- [ffmpeg v6](https://ffmpeg.org/)
- [Next.js v13.3](https://nextjs.org/)
- [React v18.2](https://react.dev/)
- [Typescript v5](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
