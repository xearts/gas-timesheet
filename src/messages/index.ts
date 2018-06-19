import InvalidArgumentError from '../error/invalid-argument-error';
declare function require(x: string): any;

const acceptableLanguages = ['ja'];

export default class Messages {
  private map: {};

  constructor() {
    this.init();
  }

  init() {
    // それぞれの言語を require, キャッシュしておく
    this.map = acceptableLanguages.reduce(
      (acc, language) => {
        acc[language] = require(`./${language}`)['default'];
        return acc;
      },
      {} as { [language: string]: {} }
    );
  }

  get(locale: string): {} {
    if (!this.map[locale]) {
      throw new InvalidArgumentError('locale is not available:' + locale);
    }
    return this.map[locale];
  }
}
