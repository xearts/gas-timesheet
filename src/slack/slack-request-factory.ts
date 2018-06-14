import { RequestFactory } from '../interfaces';
import Request from '../request';
import InvalidArgumentError from '../error/invalid-argument-error';
import UserResolver from '../user-resolver';

export default class SlackRequestFactory implements RequestFactory {
  constructor(private userResolver: UserResolver, private slackOutGoingToken: string) {}

  factory({
    queryString,
    parameter,
    parameters,
    contextPath,
    contentLength,
    postData
  }: {
    queryString?: string | null;
    parameter: { [key: string]: string };
    parameters: { [key: string]: string[] };
    contextPath: string;
    contentLength: number;
    postData?: {};
  }): Request {
    if (!parameter.text) {
      throw new InvalidArgumentError('parameter text is empty ');
    }
    if (!parameter.user_name) {
      throw new InvalidArgumentError('parameter user_name is empty');
    }
    if (parameter.token != this.slackOutGoingToken) {
    }

    const user = this.userResolver.resolve(parameter.user_name.toLowerCase());

    if (!user) {
      throw new InvalidArgumentError('user not found');
    }


    const body = parameter.text.toLowerCase().replace(/[Ａ-Ｚａ-ｚ０-９：／．]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });

    return new Request(body, user);
  }
}
