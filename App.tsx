/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import bridge from './react-native-bridge-out';
import hello from './react-native-bridge-out/demo';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section: React.FC<{
//   title: string;
// }> = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

export default class App extends Component {
  webref: WebView<{}> | undefined;
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  // let webref: WebView | undefined;
  render() {
    setTimeout(async () => {
      // this.webref!.postMessage('m-s');
      // bridge.call('hello', '');
      // console.log('call hi');
      let ret = await hello();
      console.log(ret);
    }, 2000);
    return (
      <WebView
        source={{uri: 'http://192.168.31.105:8080'}}
        originWhitelist={['*']}
        style={{marginTop: 20}}
        onMessage={event => {
          // alert(event.nativeEvent.data); // eslint-disable-line no-alert
          bridge.recv(event.nativeEvent.data);
        }}
        ref={(r: WebView) => {
          this.webref = r;
          bridge.init(r);
          bridge.register('hello_evt', () => {
            console.log('call evt...');
          });
        }}
      />
    );
  }
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
