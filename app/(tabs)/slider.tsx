import { RiveAnimation } from '@/components/rive';
import Slider from '@react-native-community/slider';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { RiveRef } from 'rive-react-native';

const backgroundColors = [
  '#FA7878',
  '#A8FFD5',
  '#B3A6FF',
  '#FFD569',
  '#C1DAFF',
];

const slider = () => {
  const [rating, setRating] = useState<number>(5);
  const index = useSharedValue(rating);
  const riveRef = useRef<RiveRef>(null);

  useEffect(() => {
    index.value = withTiming(rating, { duration: 300 });
  }, [rating]);

  useEffect(() => {
    if (riveRef.current) {
      riveRef.current.setInputState('State Machine 1', 'step', rating);
    }
  }, [rating]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      index.value,
      [1, 2, 3, 4, 5],
      backgroundColors
    );
    return { backgroundColor };
  });

  return (
    <Animated.View style={[styles.mainContainer, animatedStyle]}>
      <View
        style={{
          width: 300,
          height: 300,
        }}
      >
        <RiveAnimation
          ref={riveRef}
          style={{ width: '100%', height: '100%' }} // fill wrapper
          source={require(`@assets/rive/emotion_slider.riv`)}
          autoplay={true}
        />
      </View>

      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#FFFFFF"
        step={1}
        onValueChange={(value) => setRating(value)}
        value={rating}
      />
    </Animated.View>
  );
};

export default slider;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
