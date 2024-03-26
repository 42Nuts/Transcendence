#!/usr/bin/env sh

echo "PostgreSQL 데이터베이스 생성"

# 환경변수 확인 (디버깅 용도로 출력, 실제 배포 시에는 제거하는 것이 좋습니다)
echo "환경 변수 확인:"
echo "POSTGRES_USER: $POSTGRES_USER"
echo "POSTGRES_PASSWORD: [HIDDEN]"
echo "POSTGRES_DB: $POSTGRES_DB"

# `psql` 명령어를 사용하여 SQL 명령어 실행
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';
    ALTER USER $POSTGRES_USER WITH SUPERUSER;
    CREATE DATABASE $POSTGRES_DB;
EOSQL

echo "데이터베이스 생성 완료."

# 공식 이미지의 기능을 활용하여 PostgreSQL 서버를 시작하고, 컨테이너 내에서 지속적으로 실행되도록 한다
exec docker-entrypoint.sh postgres
