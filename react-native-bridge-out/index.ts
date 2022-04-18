import WebView from 'react-native-webview';
import {v1 as uuid} from 'uuid';
class Bridge {
  webview: WebView | undefined = undefined;
  methods: Map<string, any> = new Map();
  queue: Map<string, any> = new Map();

  public init(webview: WebView) {
    this.webview = webview;
  }
  public call(method: string, args: string) {
    const actionId = '0';
    const potocol = 'req|' + actionId + '|0|' + method + '|' + args;
    this.queue.set(actionId, {ack: false});
    this.webview!.postMessage(potocol);
    return actionId;
  }
  public register(name: string, fun: any) {
    this.methods.set(name, fun);
  }
  public hasAck(action: string) {
    // alert('has ' + JSON.stringify(this.queue.get('0')));
    const ack = this.queue.get(action);
    return ack.ack;
  }
  public getRet(actionId: string) {
    const ack = this.queue.get(actionId);
    return ack.ret;
  }
  public recv(potocol: string) {
    if (typeof potocol === 'string') {
      let dser: string[] = potocol.split('|');
      let type = dser[0];
      let action = dser[1];
      // let object = dser[2];
      let method = dser[3];
      let args = dser[4];
      // alert(type + action);
      switch (type) {
        case 'ack':
          if (this.queue.has(action)) {
            const q = this.queue.get(action);
            // alert(JSON.stringify(q));
            q.ack = true;
            q.ret = method;
            this.queue.set(action, q);
          }
          break;
        case 'evt':
          break;
      }
      if (this.methods.has(method)) {
        let fun = this.methods.get(method);
        fun.apply(args);
      }
    }
  }
}
const bridge = new Bridge();
export default bridge;
