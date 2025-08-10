import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { Image } from 'expo-image'; // ✅ Using expo-image for remote image

// Temporary web-compatible Image component
interface ImageProps {
  source: string | { uri: string };
  style?: any;
  contentFit?: 'cover' | 'contain' | 'fill';
  [key: string]: any;
}

const Image: React.FC<ImageProps> = ({ source, style, contentFit, ...props }) => {
  const src = typeof source === 'string' ? source : source?.uri || '';
  return React.createElement('img', {
    src,
    style: {
      ...style,
      objectFit: contentFit === 'cover' ? 'cover' : 
                 contentFit === 'contain' ? 'contain' : 
                 contentFit === 'fill' ? 'fill' : 'cover',
    },
    ...props,
  });
};

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.postimg.cc/Wbp09kB4/icon.png' }} // ✅ Use your actual logo URL
        style={styles.image}
        contentFit="contain"
      />
      <Text style={styles.text}>GabayHabits</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b2845',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  text: {
    color: '#f4b400',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
