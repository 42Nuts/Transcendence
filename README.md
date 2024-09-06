# Transcendence

## 목차
1. [🗣️ 프로젝트 설명](#프로젝트-설명)
2. [🦾 기술 스택](#기술-스택)
3. [🤖 설치 및 실행 방법](#설치-및-실행-방법)
4. [🖋️ 기능 설명](#기능-설명)
5. [📹 스크린샷](#스크린샷)
6. [🔖 아키텍처](#아키텍처)
   - [🍔 Frontend](#frontend)
   - [🥐 Backend](#backend)
   - [🏓 Game](#game)
   - [🌐 인프라 구조도](#인프라-구조도)
7. [🗄️ Team](#team)

## 프로젝트 설명

`Transcendence` 는 클래식 Pong game을 재해석한 웹사이트 프로젝트입니다. 바닐라 JavaScript를 사용한 프론트엔드와 Django 백엔드를 활용하여 사용자 인터페이스와 실시간 멀티 플레이어 온라인 게임을 제공합니다.

## 기술 스택

![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)

![Docker_Compose](https://img.shields.io/badge/Docker_Compose-1DA1F2?logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=yellow)
![Django](https://img.shields.io/badge/Django-092E20?logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![Daphne](https://img.shields.io/badge/Daphne-512BD4?logo=django&logoColor=white)
![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?logo=gunicorn&logoColor=white)
![OAuth](https://img.shields.io/badge/OAuth-4285F4?logo=oauth&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?logo=grafana&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?logo=elasticsearch&logoColor=white)
![Logstash](https://img.shields.io/badge/Logstash-005571?logo=logstash&logoColor=white)
![Kibana](https://img.shields.io/badge/Kibana-005571?logo=kibana&logoColor=white)

## 설치 및 실행 방법

`local`에서 다운 받고 실행하는 방법입니다.

### 사전설정 확인

프로젝트를 다운 받고 실행하기 전에 아래 프로그램이 설치가 되어있는지 확인하세요:

- Docker
- Docker Compose

### 실행 방법

1. 클론 레포지토리
    
    ```bash
    https://github.com/42Nuts/Transcendence.git
    ```
    
2. 파일 안으로 들어가기
    
    ```bash
    cd Transcendence
    ```
    
3. env 파일 설정
    1. 서버 IP와 포트 확인
        
        ```bash
        SERVER_IP=127.0.0.1 # localhost
        SERVER_PORT=5500 # 열린 포트 설정
        
        # NGINX
        NGINX_HOST=nginx
        NGINX_PORT=5500 # nginx 포트도 같은 포트로 설정
        ```
        
    2. 42 client id 및 42 client secret 키 확인
        1. 42 intra에서 API 키 발급 및 redirect URI 설정
            
            [`https://127.0.0.1:5500/42oauth/`](https://127.0.0.1:5500/42oauth/) (지정한 서버 IP와 포트로 설정)
            
        2. 42 client id 및 42 client secret 키 변경
            
            ```bash
            FOURTYTWO_CLIENT_ID=${발급받은 UID}
            FOURTYTWO_CLIENT_SECRET=${발급받은 SECRET}
            ```
            
4. 컨테이너 실행
    1. Docker 실행
    2. 컨테이너 빌드
        
        ```bash
        make
        ```
        
5. 로컬호스트 접속
    - [`https://127.0.0.1:5500`](https://127.0.0.1:5500)

### 팁

문제가 생긴다면 스스로 디버깅하세요.

## 기능 설명

- **사용자 관리**
    - 원격 인증 구현.
- **게임플레이 및 사용자 경험**
    - 원격 플레이어와의 실시간 멀티플레이어.
    - 멀티플레이어 모드 (2인 및 4인 게임).
    - 다크 모드, 테마 변경, 유저 프로필 관리.
- **DevOps**
    - 로그 관리 및 시스템 모니터링을 위한 인프라 설정.

## 스크린샷
![1](https://github.com/user-attachments/assets/cbf3673f-1d66-4dff-8b52-b3805b6f2e3c)
![2](https://github.com/user-attachments/assets/4d309c7b-43fc-4a85-b282-18a5adf426ad)
![3](https://github.com/user-attachments/assets/18d703c5-f241-4b14-a6cd-6769d2bda9d1)
![4](https://github.com/user-attachments/assets/f790054b-3f96-4980-90ae-9144dd02c7c0)
![8](https://github.com/user-attachments/assets/7ab67c71-a097-42b7-a642-f66434919752)
![6](https://github.com/user-attachments/assets/86b62c71-a051-45bb-8e16-b2b65bb7ea8b)

## 아키텍처

### Frontend
![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)
- **Framework/Library**: 프론트엔드는 바닐라 JavaScript를 사용하여 구축되었습니다. 모듈화된 컴포넌트를 통해 코드 재사용성을 고려하였고 유지보수성과 확장성을 높였습니다.
- **Single Page Application (SPA)**: 페이지 새로고침이 없는 원활한 사용자 경험을 위해 커스텀 라우터를 구현한 SPA 아키텍처를 적용했습니다.
- **State Management**: Redux 또는 Vuex와 유사한 Store 패턴을 사용하여 커스텀 상태 관리 시스템을 구현하였으며, 해당 코드는 `frontend/src/store/index.js`에 위치해 있습니다.
- **Styling**: 디자인 단계부터 Figma를 활용해 컴포넌트화된 구조를 기획했으며, Tailwind CSS를 사용해 일관된 스타일을 적용했습니다.

### Backend
![Docker_Compose](https://img.shields.io/badge/Docker_Compose-1DA1F2?logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=yellow)
![Django](https://img.shields.io/badge/Django-092E20?logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![Daphne](https://img.shields.io/badge/Daphne-512BD4?logo=django&logoColor=white)
![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?logo=gunicorn&logoColor=white)
![OAuth](https://img.shields.io/badge/OAuth-4285F4?logo=oauth&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?logo=grafana&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?logo=elasticsearch&logoColor=white)
![Logstash](https://img.shields.io/badge/Logstash-005571?logo=logstash&logoColor=white)
![Kibana](https://img.shields.io/badge/Kibana-005571?logo=kibana&logoColor=white)
- **Framework**: Python 기반 Django 웹 프레임워크 사용
    - Gunicorn: 동기식 HTTP 요청을 처리하는 WSGI 서버
    - Daphne: 비동기 WebSocket 요청을 처리하는 ASGI 서버
- **Database**: PostgreSQL 사용
- **Authentication: 42를 사용한 OAuth 2.0 인증**
- **Nginx**
    - **SSL/TLS**: HTTPS 통신을 처리하여 보안 강화를 구현
    - **Reverse Proxy**: 클라이언트 요청을 Django 백엔드로 프록시하여 전달
    - **정적 파일 제공**: 프론트엔드에서 생성된 최신 정적 파일(JS, CSS 등)을 제공
- **Docker**
    - **컨테이너 관리**: 각 서비스는 Docker와 Docker Compose를 통해 관리됩니다. Nginx, Django, PostgreSQL, Redis, Prometheus, Grafana 등 각 서비스의 독립적 관리를 수행
    - **정적 파일 공유:  Docker 볼륨을 사용하여 Nginx 컨테이너와 정적 파일을 공유해, 컨테이너를 재구성하지 않고도 최신 파일 제공 가능**
    - **바인드 마운트: 개발 중 호스트 디렉터리를 컨테이너에 연결해 실시간으로 변경 사항이 반영되도록 하여 빠른 개발 가능**
- **Monitoring & Logging**
    - **ELK: Elasticsearch, Logstash, Kibana로 구성된 로그 관리를 위한 인프라 설정**
    - **Prometheus/Grafana: 시스템 모니터링을 위해 Prometheus와 Grafana를 사용**

### Game

- **웹소켓**: 실시간 게임 플레이를 위한 웹소켓 기반 통신 구현.

### 인프라 구조도
![스크린샷 2024-09-06 오후 5 41 53](https://github.com/user-attachments/assets/2b89ef14-d4a2-43ae-8207-0ca3f6b2eaf1)


## Team

<div align="center">

| [🍔 leechan02](https://github.com/leechan02) | [😎 GCgang](https://github.com/GCgang) | [🌞 gitubanana](https://github.com/gitubanana) | [🐱 Labin97](https://github.com/Labin97) |
| ----------------------------------------------- | ----------------------------------------- | ---------------------------------------- | ------------------------------------------ |
| **Frontend && Design** | **Backend && Devops** | **Backend && Devops** | **Game** |

</div>