import Request from '../request';
import CommandRegistry from './command-registry';
import { I18nFactory } from '../i18n';
import { Command } from '../interfaces';

export default class CommandResolver {
  constructor(private commandRegistry: CommandRegistry, private i18nFactory: I18nFactory) {}

  resolve(request: Request): Command {
    const i18n = this.i18nFactory.factory(request.user.getLocale());
    const commands = i18n.getCommands();

    for (let key of Object.keys(commands)) {
      const matcher = new RegExp(commands[key]);

      if (matcher.test(request.body)) {
        return this.commandRegistry.get(key);
      }
    }

    return null;
  }
}
