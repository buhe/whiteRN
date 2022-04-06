import WebView from 'react-native-webview';

export default class Bridge {
  webview: WebView | undefined;

  constructor(webview: WebView) {
    this.webview = webview;
  }
   public call(method, args, cb) {

    }
   public register(name, fun, asyn) {

    }
}
