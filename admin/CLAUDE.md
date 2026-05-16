# 화성시 계약업무 — 관리자 페이지

## 세션 역할
이 세션(세션2)은 **admin.html** (관리자 페이지) 개발 담당

## 작업 경로
C:\Claude\Project_contract\admin\

## 관련 파일
- admin.html : 관리자 메인 (이 세션 담당)
- ../화성시_계약업무_대시보드.html : 세션1 담당 (직접 수정 금지)
- ../assets/style.css : 공통 스타일 (양쪽 공유)
- ../assets/common.js : 공통 함수 (양쪽 공유)
- ../assets/hs_logo.gif : 화성특례시 로고
- ../화성시_계약메뉴얼_및_각종서식.pdf : 원본 업무 매뉴얼
- ../forms/ : 서식 PDF 파일들

## 관리자 페이지 기능 (구현 대상)
- 사용자 정의 알림 추가·수정·삭제
- 담당자 프로필 관리 (조회·삭제)
- 서식 파일 목록 관리
- 시스템 설정 (기준 연도, 부서명 등)
- localStorage 데이터 초기화

## localStorage 키 구조 (대시보드와 공유)
> 모든 키는 prefix `hscity_` 사용
- `hscity_customAlerts` : 사용자 정의 알림 배열
- `hscity_contractProfiles` : 담당자 프로필 객체 { 프로필명: {...} }
- `hscity_settings` : 시스템 설정

## 기술 스택
- 순수 HTML/CSS/JS (단일 파일 admin.html)
- 공통 스타일: `../assets/style.css` (link rel="stylesheet")
- 공통 JS: `../assets/common.js` (script src)

## 코딩 규칙
- 한국어 주석 사용
- 화성시 브랜드 컬러 준수 (SKILLS.md 참고)
- localStorage prefix `hscity_` 반드시 사용
- 대시보드와 동일한 디자인 시스템 유지
