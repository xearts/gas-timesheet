import { Command } from '../interfaces';
import Request from '../request';
import Response from '../response';
import I18n from '../i18n';

export default class CommandHelp implements Command {
  execute(request: Request, i18n: I18n): Response {
    return new Response(i18n.template('help'));
  }
}
