const { translate: googleTranslate } = require('@vitalets/google-translate-api');
const { translate, validEngines } = require('./translateService');

describe('translate', () => {
  let text, from, to;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    text = 'Hello world!';
    from = 'en';
    to = 'es';
  });

  it('should translate text from English to Spanish using Google Translate', async () => {
    const result = await translate(text, from, to);

    expect(googleTranslate).toHaveBeenCalledTimes(1);
    expect(result.text).toBe(`Hello world! translated from ${from} to ${to}`);
  });

  it('should return the same text if from and to languages are the same', async () => {
    to = 'en';

    const result = await translate(text, from, to);
    expect(googleTranslate).toHaveBeenCalledTimes(0);
    expect(result.text).toBe(text);
  });

  it('should throw an error if an invalid engine is provided', async () => {
    const engine = 'invalid';
    await expect(translate(text, from, to, engine)).rejects.toThrow(`Invalid engine. Try with one of these: ${validEngines}`);
  });
});