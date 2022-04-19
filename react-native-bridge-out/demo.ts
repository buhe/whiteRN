import bridge from './index';
// function delay(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
export default async function hello() {
  //call
  //   const actionId = bridge.call('hello', '');
  //   //block ack
  //   while (!bridge.hasAck(actionId)) {
  //     // wait 500ms release cpu
  //     await delay(500);
  //   }
  //   const ret = bridge.getRet(actionId);
  //   return ret;
  const ret = await bridge.callAsync('hello', '');
  return ret;
}
