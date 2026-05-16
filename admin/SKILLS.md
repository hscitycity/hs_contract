# 화성시 계약업무 시스템 — UI 규칙 요약 (세션2: 관리자)

## 브랜드 컬러 (화성특례시 공식)

| 변수 | 값 | 용도 |
|------|-----|------|
| `--primary` | `#1B4FA8` | 메인 파란색, 버튼·헤더 제목 |
| `--secondary` | `#2563C8` | 호버 상태, 보조 파란색 |
| `--accent` | `#F47920` | 오렌지 포인트, 섹션 구분선, 강조 |
| `--accent-light` | `#FEF0E6` | 오렌지 배경 (연한) |
| `--light-blue` | `#EBF2FF` | 파란 배경 (연한) |

## 상태 컬러

| 변수 | 값 | 용도 |
|------|-----|------|
| `--consult-red` | `#DC2626` | 위험·삭제 |
| `--warning` | `#F47920` | 경고 |
| `--info-blue` | `#2563EB` | 정보 |
| `--success-green` | `#16A34A` | 성공·완료 |

## assets/style.css 에서 제공하는 공통 클래스

| 클래스 | 설명 |
|--------|------|
| `.header` | 상단 헤더 (흰 배경, accent 하단선) |
| `.header-logo`, `.header-title`, `.hdr-btns` | 헤더 내부 구조 |
| `.btn-hdr` | 헤더 버튼 (primary 배경) |
| `.btn-hdr.secondary` | 헤더 보조 버튼 (흰 배경) |
| `.card`, `.card-pad` | 카드 컨테이너 |
| `.sec` | 섹션 구분 제목 (accent 하단선) |
| `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-danger` | 버튼 |
| `.opt`, `.opt.active`, `.opt.locked` | 토글 버튼 |
| `.al.warning`, `.al.info`, `.al.success`, `.al.consult` | 알림 카드 |
| `.tbl` | 테이블 |
| `.inp` | 입력 필드 (text, select, textarea) |
| `.badge-*` | 배지 (primary/accent/success/warning/danger/gray) |
| `.modal-ov`, `.modal`, `.modal-hd`, `.modal-bd`, `.modal-ft` | 모달 |
| `.hidden`, `.text-primary`, `.fw-700` 등 | 유틸리티 |

## assets/common.js 에서 제공하는 함수

| 함수 | 설명 |
|------|------|
| `fmtShort(n)` | 숫자 → 한국식 단위 (3억 5천만원) |
| `fmtAmt(n)` | 숫자 → 원 단위 (1,234,567원) |
| `parseAmt(s)` | 문자열 → 숫자 |
| `esc(s)` | HTML 이스케이프 |
| `lsGet(key)` | localStorage 읽기 (prefix 자동) |
| `lsSet(key, val)` | localStorage 쓰기 (prefix 자동) |
| `lsDel(key)` | localStorage 삭제 (prefix 자동) |
| `fmtDate(s)` | 'YYYY-MM-DD' → 'YYYY년 MM월 DD일' |
| `today()` | 오늘 날짜 문자열 |
| `bindAmountInput(el, cb)` | 금액 입력 자동 쉼표 |
| `bindBizNumInput(el, cb)` | 사업자번호 자동 하이픈 |
| `bindPhoneInput(el, cb)` | 전화번호 자동 하이픈 |
| `showToast(msg, type)` | 토스트 알림 (success/error/info/warning) |
| `genId()` | 간단 UUID 생성 |

## admin.html 기본 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <link rel="stylesheet" href="../assets/style.css">
  <!-- 관리자 전용 추가 스타일 <style> 태그로 -->
</head>
<body>
  <div class="header">...</div>
  <div class="admin-wrap">
    <!-- 탭 내비게이션 -->
    <!-- 탭 패널들 -->
  </div>
  <script src="../assets/common.js"></script>
  <script>/* 관리자 전용 JS */</script>
</body>
</html>
```

## localStorage 키 (대시보드와 공유)

> **prefix `hscity_` 필수** — common.js의 lsGet/lsSet이 자동 처리

| 키 (prefix 제외) | 내용 |
|-----------------|------|
| `customAlerts` | 사용자 정의 알림 배열 `[{id, type, ico, txt}]` |
| `contractProfiles` | 담당자 프로필 객체 `{ 프로필명: {officerRank, officerName, dept, ...} }` |
| `settings` | 시스템 설정 `{year, dept, version}` |

## 규칙 요약

- 초록색 계열 사용 금지 → 오렌지(`--accent`) 또는 `--success-green` 사용
- 한국어 주석 사용
- 모든 삭제 액션은 `confirm()` 확인 필수
- 반응형 최소 지원: 1024px (데스크탑 전용 업무 시스템)
- asset 경로는 `../assets/` (admin/ 하위에서 상위 assets/ 참조)
