# 화성시 계약업무 대시보드

## 프로젝트 목적
신규 공무원을 위한 계약업무 안내 시스템 개발

## 작업 경로
C:\Claude\Project_contract

## 주요 파일
- index.html : 메인 대시보드
- admin/admin.html : 관리자 페이지
- backend/main.py : FastAPI 백엔드 서버
- backend/data/contract_data.json : 공유 데이터 파일 (자동 생성)
- 화성시_계약메뉴얼_및_각종서식.pdf : 원본 업무 매뉴얼 (서식·절차 기준)

## 기술 스택
- 프론트엔드: 순수 HTML/CSS/JS (index.html, admin/admin.html)
- 백엔드: FastAPI (Python) — 정적 파일 서빙 + 데이터 API

## 로컬 서버 실행

```bash
# 1. 패키지 설치 (최초 1회)
cd C:\Claude\Project_contract
pip install -r backend/requirements.txt

# 2. 서버 실행
python backend/main.py

# 3. 브라우저에서 확인
# 메인:   http://localhost:8000
# 관리자: http://localhost:8000/admin/admin.html
# API:    http://localhost:8000/api/data
```

## 데이터 흐름
- admin에서 수정 → POST /api/data → backend/data/contract_data.json 저장
- index에서 로드 → GET /api/data → JSON 반환 → 화면 반영
- 공유 키: customAlerts(주의사항), approverProfiles(담당자), contractData(절차·서식·세부유형)

## 주요 기능
- 계약 유형별(공사/용역/물품) 절차 안내
- 금액·조건 입력 시 주의사항 자동 산출
- 서식 미리보기 및 실제 파일 다운로드
- 담당자 정보 저장/불러오기
- 관리자 페이지에서 절차·서식·세부유형·부서 CRUD

## 코딩 규칙
- 한국어 주석 사용
- 화성시 지방계약법 예규 기준 준수