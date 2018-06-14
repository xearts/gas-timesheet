
import Installer from './installer';
import Application from "./application";


declare var global: any;
declare var process: any;


global.test = () => {
  global.doPost({
    queryString: null,
    parameter: {
      user_name: 'test',
      text: 'help'
    },
    parameters: {},
    contextPath: '',
    contentLength: 1,
    postData: {}

  })
}

global.test2 = () => {
  global.doPost({
    queryString: null,
    parameter: {
      user_name: 'test',
      text: 'ハロー',
      token:  "token"
    },
    parameters: {},
    contextPath: '',
    contentLength: 1,
    postData: {}

  })
}

global.doPost = (e) => {

  console.log(e);
  const app = new Application();
  app.boot();


  const request = app.container.RequestFactory.factory(e);
  const command = app.container.CommandResolver.resolve(request);

  if (command) {
    const i18n = app.container.I18nFactory.factory(request.user.getLocale());
    const response = command.execute(request, i18n);

    if (response) {
      app.container.ResponseHandler.handle(response);
    }

  }
}

global.doGet = () => {
  const app = new Application();
  app.boot();
  app.container.Installer.install();

  return HtmlService.createHtmlOutputFromFile('installer');
};

global.setUp = () => {
  const app = new Application();
  app.boot();
  app.container.Installer.install();
};