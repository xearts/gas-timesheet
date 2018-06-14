import _ from 'lodash';

export default class Response {
  private _header: {[name: string]: string};

  constructor(private _content: string, private prevResponse?: Response) {}

  get content(): string {
    // if (this.prevResponse) {
    //   return this.prevResponse.content + "\n" + this._content;
    // }
    return this._content;
  }

  get header(): {[name: string]: string} {
    if (this.prevResponse) {
      return _.assign({}, this.prevResponse.header, this._header)
    }
    return this._header;
  }
}
