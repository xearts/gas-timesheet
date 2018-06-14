import * as Bottle from 'bottlejs';
import { Command } from '../interfaces';

export default class CommandRegistry {
  constructor(private container: Bottle.IContainer) {}

  get(key: string): Command {
    return this.container['Command' + key.charAt(0).toUpperCase() + key.slice(1)];
  }
}
