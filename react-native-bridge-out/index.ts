import WebView from 'react-native-webview';

class Bridge {
  webview: WebView | undefined = undefined;
  methods: Map<string, any> = new Map();

  // constructor() {

  // }

  public init(webview: WebView) {
    this.webview = webview;
  }
  public call(method: string, args: string) {
    const potocol = 'req|0|0|' + method + '|' + args;
    this.webview!.postMessage(potocol);
  }
  public register(name: string, fun: any) {
    this.methods.set(name, fun);
  }

  public recv(potocol: string) {
    let dser: string[] = potocol.split('|');
    let method = dser[3];
    let args = dser[4];

    let fun = this.methods.get(method);
    fun.apply(args);
  }
}
const bridge = new Bridge();
export default bridge;
