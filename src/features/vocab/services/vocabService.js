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
  {
    id: '5',
    kanji: '水',
    kana: ['みず'],
    meanings: ['water'],
    jlpt: 'N5',
    pos: ['noun'],
    examples: [
      { jp: '水を飲みます。', en: 'I drink water.' },
      { jp: '冷たい水が欲しいです。', en: 'I want cold water.' }
    ],
  },
  {
    id: '6',
    kanji: '学校',
    kana: ['がっこう'],
    meanings: ['school'],
    jlpt: 'N5',
    pos: ['noun'],
    examples: [
      { jp: '学校に行きます。', en: 'I go to school.' }
    ],
  },
  {
    id: '7',
    kanji: '見る',
    kana: ['みる'],
    meanings: ['to see', 'to watch', 'to look at'],
    jlpt: 'N5',
    pos: ['verb'],
    examples: [
      { jp: 'テレビを見ます。', en: 'I watch TV.' },
      { jp: '映画を見たいです。', en: 'I want to watch a movie.' }
    ],
  },
  {
    id: '8',
    kanji: '大きい',
    kana: ['おおきい'],
    meanings: ['big', 'large'],
    jlpt: 'N5',
    pos: ['adjective'],
    examples: [
      { jp: '大きい家に住んでいます。', en: 'I live in a big house.' }
    ],
  },
  {
    id: '9',
    kanji: '友達',
    kana: ['ともだち'],
    meanings: ['friend'],
    jlpt: 'N5',
    pos: ['noun'],
    examples: [
      { jp: '友達と遊びます。', en: 'I play with friends.' }
    ],
  },
  {
    id: '10',
    kanji: '話す',
    kana: ['はなす'],
    meanings: ['to speak', 'to talk'],
    jlpt: 'N4',
    pos: ['verb'],
    examples: [
      { jp: '日本語を話せますか。', en: 'Can you speak Japanese?' },
      { jp: '先生と話しました。', en: 'I talked with the teacher.' }
    ],
  },
  {
    id: '11',
    kanji: '仕事',
    kana: ['しごと'],
    meanings: ['work', 'job'],
    jlpt: 'N4',
    pos: ['noun'],
    examples: [
      { jp: '仕事が忙しいです。', en: 'Work is busy.' },
      { jp: '新しい仕事を探しています。', en: 'I am looking for a new job.' }
    ],
  },
  {
    id: '12',
    kanji: '考える',
    kana: ['かんがえる'],
    meanings: ['to think', 'to consider'],
    jlpt: 'N4',
    pos: ['verb'],
    examples: [
      { jp: 'よく考えてください。', en: 'Please think carefully.' }
    ],
  },
  {
    id: '13',
    kanji: '経験',
    kana: ['けいけん'],
    meanings: ['experience'],
    jlpt: 'N3',
    pos: ['noun'],
    examples: [
      { jp: 'いい経験になりました。', en: 'It was a good experience.' }
    ],
  },
  {
    id: '14',
    kanji: '説明',
    kana: ['せつめい'],
    meanings: ['explanation'],
    jlpt: 'N3',
    pos: ['noun', 'verb'],
    examples: [
      { jp: '説明してください。', en: 'Please explain.' }
    ],
  },
  {
    id: '15',
    kanji: '気持ち',
    kana: ['きもち'],
    meanings: ['feeling', 'mood'],
    jlpt: 'N3',
    pos: ['noun'],
    examples: [
      { jp: 'うれしい気持ちです。', en: 'I feel happy.' }
    ],
  },
  {
    id: '16',
    kanji: '政治',
    kana: ['せいじ'],
    meanings: ['politics'],
    jlpt: 'N2',
    pos: ['noun'],
    examples: [
      { jp: '政治に興味があります。', en: 'I am interested in politics.' }
    ],
  },
  {
    id: '17',
    kanji: '責任',
    kana: ['せきにん'],
    meanings: ['responsibility'],
    jlpt: 'N2',
    pos: ['noun'],
    examples: [
      { jp: '責任を取ります。', en: 'I will take responsibility.' }
    ],
  },
  {
    id: '18',
    kanji: '現象',
    kana: ['げんしょう'],
    meanings: ['phenomenon'],
    jlpt: 'N1',
    pos: ['noun'],
    examples: [
      { jp: '不思議な現象です。', en: 'It is a mysterious phenomenon.' }
    ],
  },
  {
    id: '19',
    kana: ['こんにちは'],
    meanings: ['hello', 'good afternoon'],
    jlpt: 'N5',
    pos: ['expression'],
  },
  {
    id: '20',
    kana: ['さようなら'],
    meanings: ['goodbye'],
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
