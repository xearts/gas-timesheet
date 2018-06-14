import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

import { ResponseHandler } from '../interfaces';
import Response from '../response';

export default class SlackResponseHandler implements ResponseHandler {
  constructor(private slackIncomingURL: string) {}

  handle(response: Response) {
    const payload = {
      text: response.content
    };

    const send_options: URLFetchRequestOptions = {
      method: 'post',
      payload: JSON.stringify(payload)
    };

    if (this.slackIncomingURL) {
      UrlFetchApp.fetch(this.slackIncomingURL, send_options);
    } else {
      console.log(send_options);
    }
  }
}
