// noinspection HttpUrlsUsage

import markdownToHtml from '../src/index';

describe('Detect Ruby Property', () => {
  test('Without Ruby', () => {
    const html = markdownToHtml('Lore ipsum.');
    expect(html).toContain('<p>Lore ipsum.</p>');
  });
  test('For alphabetic groups Ruby', () => {
    const html = markdownToHtml('{ruby base|ruby text}');
    expect(html).toContain('<p><ruby>ruby base<rt>ruby text</rt></ruby></p>');
  });
  test('For Japanese lang mono ruby characters', () => {
    const html = markdownToHtml(
      '{鬼|き}{門|もん}の{方|ほう}{角|がく}を{凝|ぎょう}{視|し}する。'
    );
    expect(html).toContain(
      '<p><ruby>鬼<rt>き</rt></ruby><ruby>門<rt>もん</rt></ruby>の<ruby>方<rt>ほう</rt></ruby><ruby>角<rt>がく</rt></ruby>を<ruby>凝<rt>ぎょう</rt></ruby><ruby>視<rt>し</rt></ruby>する。</p>'
    );
  });
  test('For Japanese lang groups Ruby', () => {
    const html = markdownToHtml(
      '{鬼門|きもん}の{方角|ほうがく}を{凝視|ぎょうし}する。'
    );
    expect(html).toContain(
      '<p><ruby>鬼門<rt>きもん</rt></ruby>の<ruby>方角<rt>ほうがく</rt></ruby>を<ruby>凝視<rt>ぎょうし</rt></ruby>する。</p>'
    );
  });
  test('For Japanese lang mono ruby characters style', () => {
    const html = markdownToHtml(
      '{鬼門|き|もん}の{方角|ほう|がく}を{凝視|ぎょう|し}する。'
    );
    expect(html).toContain(
      '<p><ruby>鬼<rt>き</rt>門<rt>もん</rt></ruby>の<ruby>方<rt>ほう</rt>角<rt>がく</rt></ruby>を<ruby>凝<rt>ぎょう</rt>視<rt>し</rt></ruby>する。</p>'
    );
  });
  test('Adding Ruby to Japanese in English', () => {
    const html = markdownToHtml('{編集者|editor}');
    expect(html).toContain('<p><ruby>編集者<rt>editor</rt></ruby></p>');
  });
  test('Adding Japanese Ruby to English', () => {
    const html = markdownToHtml('{editor|エディター}');
    expect(html).toContain('<p><ruby>editor<rt>エディター</rt></ruby></p>');
  });
  test('Strong Style', () => {
    const html = markdownToHtml('**{ruby base|ruby text}**');
    expect(html).toContain(
      '<p><strong><ruby>ruby base<rt>ruby text</rt></ruby></strong></p>'
    );
  });
  test('base characters Strong Style', () => {
    const html = markdownToHtml('{**ruby base**|ruby text}');
    expect(html).toContain(
      '<p><ruby><strong>ruby base</strong><rt>ruby text</rt></ruby></p>'
    );
  });
  test('ruby characters Strong Style', () => {
    const html = markdownToHtml('{ruby base|**ruby text**}');
    expect(html).toContain(
      '<p><ruby>ruby base<rt><strong>ruby text</strong></rt></ruby></p>'
    );
  });
  test('ruby link style nofollow', () => {
    const html = markdownToHtml('[{ruby base|ruby text}](http://example.com)');
    expect(html).toContain(
      '<p><a href="http://example.com" rel="nofollow"><ruby>ruby base<rt>ruby text</rt></ruby></a></p>'
    );
  });
  test('base characters link style nofollow', () => {
    const html = markdownToHtml('{[ruby base](http://example.com)|ruby text}');
    expect(html).toContain(
      '<p><ruby><a href="http://example.com" rel="nofollow">ruby base</a><rt>ruby text</rt></ruby></p>'
    );
  });
  test('ruby characters link style nofollow', () => {
    const html = markdownToHtml('{ruby base|[ruby text](http://example.com)}');
    expect(html).toContain(
      '<p><ruby>ruby base<rt><a href="http://example.com" rel="nofollow">ruby text</a></rt></ruby></p>'
    );
  });
});
