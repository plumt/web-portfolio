// 노션 이력서의 경력 기간 표기("총 경력 N년 N개월", 재직 중 회사의 근무 기간)를 이번 달 기준으로 고친다.
// 사용: NOTION_TOKEN=… NOTION_PAGE_ID=… node --experimental-strip-types scripts/notion-career.ts [--dry]
// 매월 1일 GitHub Actions(.github/workflows/notion-career.yml)가 돌린다.

// 경력 구간. 끝이 없으면 재직 중. 월 단위로 양 끝 달을 모두 센다.
const CAREERS: { start: [number, number]; end?: [number, number] }[] = [
  { start: [2020, 12], end: [2025, 4] }, // 오픈잇
  { start: [2025, 7] }, // 레몬헬스케어
];

const API = 'https://api.notion.com/v1';
const DURATION = String.raw`(?:\d+년(?: \d+개월)?|\d+개월)`;

export function monthsBetween([sy, sm]: [number, number], [ey, em]: [number, number]): number {
  return (ey - sy) * 12 + (em - sm) + 1;
}

export function formatMonths(total: number): string {
  const y = Math.floor(total / 12);
  const m = total % 12;
  if (y === 0) return `${m}개월`;
  return m === 0 ? `${y}년` : `${y}년 ${m}개월`;
}

export function careerTexts(now: Date) {
  const today: [number, number] = [now.getFullYear(), now.getMonth() + 1];
  const months = CAREERS.map((c) => monthsBetween(c.start, c.end ?? today));
  const current = CAREERS.findIndex((c) => !c.end);
  return {
    total: formatMonths(months.reduce((a, b) => a + b, 0)),
    current: current >= 0 ? formatMonths(months[current]) : undefined,
  };
}

// 블록 글 조각 하나의 내용만 바꾼다. 색·굵기·링크는 그대로 둔다.
export function rewrite(text: string, t: ReturnType<typeof careerTexts>): string {
  let out = text.replace(new RegExp(`(총 경력 )${DURATION}`, 'g'), `$1${t.total}`);
  if (t.current) out = out.replace(new RegExp(`(재직 중\\s*)${DURATION}`, 'g'), `$1${t.current}`);
  return out;
}

async function notion(path: string, init: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error(`${init.method ?? 'GET'} ${path} → ${res.status} ${await res.text()}`);
  return res.json();
}

async function* blocks(id: string): AsyncGenerator<any> {
  let cursor: string | undefined;
  do {
    const page = await notion(`/blocks/${id}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ''}`);
    for (const b of page.results) {
      yield b;
      if (b.has_children) yield* blocks(b.id);
    }
    cursor = page.has_more ? page.next_cursor : undefined;
  } while (cursor);
}

async function main() {
  const { NOTION_TOKEN, NOTION_PAGE_ID } = process.env;
  if (!NOTION_TOKEN || !NOTION_PAGE_ID) throw new Error('NOTION_TOKEN, NOTION_PAGE_ID 가 필요하다.');
  const dry = process.argv.includes('--dry');
  const t = careerTexts(new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })));
  console.log(`총 경력 ${t.total}, 재직 중 ${t.current ?? '-'}`);

  let changed = 0;
  let matched = 0;
  const marker = new RegExp(`총 경력 ${DURATION}|재직 중\\s*${DURATION}`);
  for await (const b of blocks(NOTION_PAGE_ID)) {
    const rich = b[b.type]?.rich_text;
    if (!Array.isArray(rich)) continue;
    if (rich.some((r: any) => r.type === 'text' && marker.test(r.text.content))) matched++;
    let dirty = false;
    const next = rich.map((r: any) => {
      if (r.type !== 'text') return r;
      const content = rewrite(r.text.content, t);
      if (content === r.text.content) return r;
      dirty = true;
      return { type: 'text', text: { ...r.text, content }, annotations: r.annotations };
    });
    if (!dirty) continue;
    changed++;
    console.log(`${dry ? '[dry] ' : ''}고침: ${b.id}`);
    if (!dry) await notion(`/blocks/${b.id}`, { method: 'PATCH', body: JSON.stringify({ [b.type]: { rich_text: next } }) });
  }
  console.log(`경력 표기 블록 ${matched}개, 바뀐 블록 ${changed}개`);
  // 표기를 하나도 못 찾으면 페이지 문구가 바뀐 것이다 — 조용히 넘어가지 않게 실패시킨다
  if (matched === 0) throw new Error('경력 표기를 찾지 못했다. 노션 문구가 바뀌었는지 확인하라.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
