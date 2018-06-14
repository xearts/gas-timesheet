import ApplicationError from './application-error';

export default class InvalidArgumentError extends ApplicationError {
  public name = 'InvalidArgumentError';
}
