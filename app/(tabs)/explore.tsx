import { RiveAnimation } from '@/components/rive';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Fit } from 'rive-react-native';

export default function TabTwoScreen() {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.set(
      withRepeat(
        withSequence(
          withTiming(-5, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.get() }], // use .get()
  }));

  const animatedShadowStyle = useAnimatedStyle(() => ({
    opacity: 0.3 + translateY.get() / 20,
  }));

  return (
    <View style={{ flex: 1, backgroundColor: '#0F2938' }}>
      <View style={styles.campingContainer}>
        <RiveAnimation
          style={{ width: '100%', height: '100%' }} // fill wrapper
          source={require(`../../assets/rive/camp-tastic.riv`)}
          autoplay={true}
          fit={Fit.Cover}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Camp-tastic! </Text>
        <Text style={styles.subText}>/kæmp-tas-tic/</Text>
        <Text style={styles.descriptionText}>
          “the most wonderful, awe-inspiring and simply fantastic camping
          experiences”
        </Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Animated.View style={animatedButtonStyle}>
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Text style={styles.buttonLabel}>Get Started!</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.buttonShadow, animatedShadowStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  campingContainer: {
    width: '100%',
    height: '55%',
  },
  textContainer: {
    paddingHorizontal: 32,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#A1F6FF',
    textAlign: 'left',
  },
  subText: {
    color: '#A1F6FF',
    textAlign: 'left',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '600',
    marginTop: 8,
  },
  descriptionText: {
    color: '#A7D1D7',
    textAlign: 'left',
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
    fontWeight: '400',
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#193C50',
    paddingVertical: 18,
    width: 320,
    height: 56,
    borderRadius: 1000,
  },
  buttonLabel: {
    color: '#CDEBEE',
    fontSize: 16,
    fontWeight: 'semibold',
  },
  buttonShadow: {
    width: 75,
    height: 75,
    backgroundColor: '#000000',
    borderRadius: 100,
    opacity: 0.3,
    transform: [{ scaleX: 2 }, { scaleY: 0.2 }],
    position: 'absolute',
    top: 44,
  },
});
