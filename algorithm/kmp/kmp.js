function buildNext(str) {
  let j = 0,
    t = -1;
  const nxt = [-1];
  while (j < str.length - 1) {
    if (0 > t || str[j] === str[t]) {
      // 匹配
      j++;
      t++;
      nxt[j] = t;
    } else {
      t = nxt[t];
    }
  }
  return nxt;
}

function kmp(str, p) {
  const next = buildNext(p);
  let i = 0,
    j = 0;
  while (i < str.length && j < p.length) {
    if (j === -1 || str[i] === p[j]) {
      i++;
      j++;
    } else {
      j = next[j];
    }
  }
  if (j === p.length) return i - j;
  return -1;
}