import api from '../../../utils/api.js';

// Shape for a vocab item used in the UI
// {
//   id: string | number,
//   kanji?: string,
//   kana?: string[],
//   meanings: string[],
//   jlpt?: 'N5'|'N4'|'N3'|'N2'|'N1',
//   pos?: string[],
//   audioUrl?: string,
//   examples?: Array<{ jp: string, en: string }>
// }

// Mock dataset used if API call fails or no backend yet
const MOCK = [
  {
    id: '1',
    kanji: '食べる',
    kana: ['たべる'],
    meanings: ['to eat'],
    jlpt: 'N5',
    pos: ['verb'],
    examples: [
      { jp: '毎朝パンを食べる。', en: 'I eat bread every morning.' },
      { jp: '寿司を食べたことがありますか。', en: 'Have you ever eaten sushi?' }
    ],
  },
  {
    id: '2',
    kanji: '速い',
    kana: ['はやい'],
    meanings: ['fast', 'quick'],
    jlpt: 'N5',
    pos: ['adjective'],
  },
  {
    id: '3',
    kanji: '勉強',
    kana: ['べんきょう'],
    meanings: ['study'],
    jlpt: 'N5',
    pos: ['noun', 'verb'],
    examples: [
      { jp: '日本語を勉強しています。', en: 'I am studying Japanese.' }
    ],
  },
  {
    id: '4',
    kana: ['ありがとう'],
    meanings: ['thank you'],
    jlpt: 'N5',
    pos: ['expression'],
  },
];

export async function searchVocab({ query = '', jlpt = 'All', pos = [], limit = 50 } = {}) {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (jlpt && jlpt !== 'All') params.set('jlpt', jlpt);
  if (pos?.length) params.set('pos', pos.join(','));
  if (limit) params.set('limit', String(limit));

  try {
    const res = await api.get(`/vocab/search?${params.toString()}`);
    // Expect res.data to be array of items in the defined shape; if needed map here
    return Array.isArray(res.data) ? res.data : [];
  } catch {
    // Fallback to client-side filtered mock
    const q = query.trim().toLowerCase();
    let items = MOCK.filter((it) => {
      const inText = !q ||
        it.kanji?.includes(query) ||
        it.kana?.some((k) => k.includes(query)) ||
        it.meanings?.some((m) => m.toLowerCase().includes(q));
      const jlptOk = jlpt === 'All' || it.jlpt === jlpt;
      const posOk = !pos?.length || pos.every((p) => it.pos?.includes(p));
      return inText && jlptOk && posOk;
    });
    if (limit) items = items.slice(0, limit);
    return items;
  }
}
