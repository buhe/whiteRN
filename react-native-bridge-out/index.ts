import WebView from 'react-native-webview';
import uuid from 'react-native-uuid';
class Bridge {
  webview: WebView | undefined = undefined;
  methods: Map<string, any> = new Map();
  queue: Map<string | number[], any> = new Map();

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
  public callAsync(method: string, args: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const actionId = uuid.v4();
      const potocol = 'req|' + actionId + '|0|' + method + '|' + args;
      this.queue.set(actionId, {ack: false, resolve: resolve, reject: reject});
      this.webview!.postMessage(potocol);
    });
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
    this.queue.delete(actionId);
    return ack.ret;
  }
  public recv(potocol: string) {
    if (typeof potocol === 'string') {
      let dser: string[] = potocol.split('|');
      let type = dser[0];
      let action = dser[1];
      // let object = dser[2];
      let methodOrRet = dser[3];
      let argsOrErr = dser[4];
      // alert(type + action);
      switch (type) {
        case 'ack':
          if (this.queue.has(action)) {
            const q = this.queue.get(action);
            // alert(JSON.stringify(q));
            q.ack = true;
            if (q.resolve) {
              if (argsOrErr) {
                q.reject(argsOrErr);
              } else {
                q.resolve(methodOrRet);
              }
              this.queue.delete(action);
            } else {
              q.ret = methodOrRet;
              this.queue.set(action, q);
            }
          }
          break;
        case 'evt':
          if (this.methods.has(methodOrRet)) {
            let fun = this.methods.get(methodOrRet);
            try {
              const ret = fun.apply(argsOrErr);
              const potocolForAck = 'ack|' + action + '|0|' + ret;
              this.webview!.postMessage(potocolForAck);
            } catch (e) {
              const potocolForAck =
                'ack|' + action + '|0|undefined|' + JSON.stringify(e);
              this.webview!.postMessage(potocolForAck);
            }
          }
          break;
      }
    }
  }
}
const bridge = new Bridge();
export default bridge;
