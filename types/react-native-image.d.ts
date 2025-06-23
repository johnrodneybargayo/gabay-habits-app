// types/react-native-image.d.ts
import 'react-native';

declare module 'react-native' {
  interface ImageStatic {
    resolveAssetSource(source: ImageSourcePropType): { uri: string };
  }
}
