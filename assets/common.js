/* ══════════════════════════════════════════════════════
   화성시 계약업무 시스템 — 공통 유틸리티
   (화성시_계약업무_대시보드.html + admin.html 공유)
   ══════════════════════════════════════════════════════ */

'use strict';

/* ── 숫자 포매팅 ── */

// 숫자 → 한국식 단위 (3억 5천만, 2천만, 500만 등)
function fmtShort(n) {
  if (!n && n !== 0) return '-';
  n = Math.abs(n);
  if (n >= 1e8) {
    var 억 = Math.floor(n / 1e8);
    var rem = Math.floor((n % 1e8) / 1e4);
    return rem > 0 ? 억 + '억 ' + rem.toLocaleString('ko-KR') + '만원' : 억 + '억원';
  }
  if (n >= 1e4) return Math.floor(n / 1e4).toLocaleString('ko-KR') + '만원';
  return n.toLocaleString('ko-KR') + '원';
}

// 숫자 → 원 단위 (1,234,567원)
function fmtAmt(n) {
  if (!n && n !== 0) return '-';
  return Math.round(n).toLocaleString('ko-KR') + '원';
}

// 문자열(쉼표 포함) → 숫자
function parseAmt(s) {
  if (!s) return 0;
  return parseInt(String(s).replace(/[^0-9]/g, ''), 10) || 0;
}

/* ── HTML 이스케이프 ── */
function esc(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── localStorage 래퍼 (prefix: hscity_) ── */
var LS_PREFIX = 'hscity_';

function lsGet(key) {
  try {
    var raw = localStorage.getItem(LS_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function lsSet(key, val) {
  try {
    localStorage.setItem(LS_PREFIX + key, JSON.stringify(val));
    return true;
  } catch (e) {
    return false;
  }
}

function lsDel(key) {
  try {
    localStorage.removeItem(LS_PREFIX + key);
  } catch (e) {}
}

/* ── 날짜 유틸 ── */

// Date → 'YYYY-MM-DD'
function dateToStr(d) {
  if (!(d instanceof Date) || isNaN(d)) return '';
  var y = d.getFullYear();
  var m = String(d.getMonth() + 1).padStart(2, '0');
  var dd = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + dd;
}

// 오늘 날짜 문자열
function today() {
  return dateToStr(new Date());
}

// 'YYYY-MM-DD' → 표시용 'YYYY년 MM월 DD일'
function fmtDate(s) {
  if (!s || s.length < 10) return s || '-';
  return s.slice(0, 4) + '년 ' + s.slice(5, 7) + '월 ' + s.slice(8, 10) + '일';
}

/* ── 금액 입력 자동 쉼표 포매팅 ── */
function bindAmountInput(el, onChange) {
  if (!el) return;
  el.addEventListener('input', function (e) {
    var n = parseAmt(e.target.value);
    e.target.value = n.toLocaleString('ko-KR');
    if (typeof onChange === 'function') onChange(n);
  });
}

/* ── 사업자등록번호 자동 하이픈 (XXX-XX-XXXXX) ── */
function bindBizNumInput(el, onChange) {
  if (!el) return;
  el.addEventListener('input', function (e) {
    var v = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (v.length <= 3) e.target.value = v;
    else if (v.length <= 5) e.target.value = v.slice(0, 3) + '-' + v.slice(3);
    else e.target.value = v.slice(0, 3) + '-' + v.slice(3, 5) + '-' + v.slice(5);
    if (typeof onChange === 'function') onChange(e.target.value);
  });
}

/* ── 전화번호 자동 하이픈 ── */
function bindPhoneInput(el, onChange) {
  if (!el) return;
  el.addEventListener('input', function (e) {
    var v = e.target.value.replace(/\D/g, '');
    var f;
    if (v.startsWith('02')) {
      if (v.length <= 2) f = v;
      else if (v.length <= 6) f = v.slice(0, 2) + '-' + v.slice(2);
      else if (v.length <= 10) f = v.slice(0, 2) + '-' + v.slice(2, 6) + '-' + v.slice(6);
      else f = v.slice(0, 2) + '-' + v.slice(2, 6) + '-' + v.slice(6, 10);
    } else {
      if (v.length <= 3) f = v;
      else if (v.length <= 7) f = v.slice(0, 3) + '-' + v.slice(3);
      else f = v.slice(0, 3) + '-' + v.slice(3, 7) + '-' + v.slice(7);
    }
    e.target.value = f || v;
    if (typeof onChange === 'function') onChange(e.target.value);
  });
}

/* ── 토스트 알림 ── */
function showToast(msg, type) {
  var el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;padding:10px 16px;border-radius:8px;font-size:12px;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,.15);transition:opacity .3s;max-width:300px;line-height:1.4;pointer-events:none';
    document.body.appendChild(el);
  }
  var colors = {
    success: { bg: '#DCFCE7', color: '#14532D', border: '#16A34A' },
    error:   { bg: '#FEE2E2', color: '#7F1D1D', border: '#DC2626' },
    info:    { bg: '#DBEAFE', color: '#1E3A8A', border: '#2563EB' },
    warning: { bg: '#FEF0E6', color: '#7C2D00', border: '#F47920' }
  };
  var c = colors[type] || colors.info;
  el.style.background = c.bg;
  el.style.color = c.color;
  el.style.borderLeft = '3px solid ' + c.border;
  el.textContent = msg;
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(function () { el.style.opacity = '0'; }, 2800);
}

/* ── 확인 다이얼로그 (Promise 기반) ── */
function confirmDialog(msg) {
  return new Promise(function (resolve) {
    resolve(window.confirm(msg));
  });
}

/* ── ID 생성 (간단 UUID-like) ── */
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
