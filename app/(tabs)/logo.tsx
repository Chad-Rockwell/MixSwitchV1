import { transform } from "@babel/core";
import React, { useRef, useEffect, useState } from "react";
import { View, Image, StyleSheet, Animated, Easing } from "react-native";

interface Props {
    isPlaying: boolean;
  }
  
  const Logo: React.FC<Props> = ({ isPlaying }) => {
    const spinValue = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      let spinAnimation;
  
      if (isPlaying) {
        spinAnimation = Animated.loop(
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        );
        spinAnimation.start();
      } else {
        
        spinValue.stopAnimation();
        spinValue.setValue(0);
      }
  
      return () => {
        spinValue.stopAnimation();
      };
    }, [isPlaying, spinValue]);
  
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

  return (
    <View style={styles.imageContainer}>
        <Animated.View style={isPlaying &&{ transform: [{ rotate: spin }] }}>
        <Image
          source={require("../../assets/images/record-logo.jpg")}
          style={styles.logo}
        />
        </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 213,
    height: 213,
    resizeMode: "cover",
    transform: [{ translateX: -3.2 }, { translateY: -0.8 }],
  },
});
export default Logo;
