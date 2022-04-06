import WebView from 'react-native-webview';

export default class Bridge {
  webview: WebView;
  methods: Map<string, any> = new Map();

  constructor(webview: WebView) {
    this.webview = webview;
  }
   public call(method: string, args: string) {
        this.webview.postMessage('m-s');
    }
    public register(name: string, fun: any) {
        this.methods.set(name, fun);
    }

    public recv(potocol: string) {
        let dser: string[] = potocol.split("|");
        let method = dser[3];
        let args = dser[4];

        let fun = this.methods.get(method);
        fun.apply(args);
    }
}
