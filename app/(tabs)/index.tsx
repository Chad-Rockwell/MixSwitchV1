import { StyleSheet, Platform } from "react-native";
import Logo from "./logo";
import React, { useState, useEffect } from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import Slider from "@react-native-community/slider";
import { useFonts } from "expo-font";
import { Fontisto } from "@expo/vector-icons";

export default function HomeScreen() {
  const [audio1, setAudio1] = useState<string | null>("Load Mix A");
  const [audio2, setAudio2] = useState<string | null>("Load Mix B");
  const [sound1, setSound1] = useState<Audio.Sound | null>(null);
  const [sound2, setSound2] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [trackSelect, setTrackSelect] = useState<boolean>(true);
  const [loaded, error] = useFonts({
    "Rubik Mono One": require("../../assets/fonts/RubikMonoOne-Regular.ttf"),
  });

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  }, []);

  const pickFile = async (audioNumber: number): Promise<string | null> => {
    const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });

    if (result.canceled) {
      return null;
    }

    if (result.assets && result.assets.length > 0) {
      if (audioNumber === 1) {
        setAudio1(result.assets[0].name);
        const { sound } = await Audio.Sound.createAsync({
          uri: result.assets[0].uri,
        });
        sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
        setSound1(sound);
        sound1?.unloadAsync();
      }
      if (audioNumber === 2) {
        setAudio2(result.assets[0].name);
        const { sound } = await Audio.Sound.createAsync({
          uri: result.assets[0].uri,
        });
        sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
        setSound2(sound);
        sound2?.unloadAsync();
      }
    }

    return null;
  };

  const updatePlaybackStatus = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      if (Number(status.durationMillis) > duration) {
        setDuration(status.durationMillis || 0);
      }
    }
  };

  const seek = async (value: number) => {
    if (seeking) return;

    setSeeking(true);
    try {
      await Promise.all([
        sound1?.setPositionAsync(value),
        sound2?.setPositionAsync(value),
      ]);
    } catch (error) {
      console.error("Error seeking:", error);
    } finally {
      setSeeking(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{paddingTop: 70}}>
        {loaded && <Text style={styles.title}>MixSwitch</Text>}
      </View>
      <View style={{ paddingTop: 10}}>
        <Logo isPlaying={isPlaying}></Logo>
      </View>

      <View style={{marginTop: 20}}>
        <TouchableOpacity
          style={[
            styles.button,
            isPlaying && trackSelect && styles.buttonActive,
          ]}
          onPress={async () => {
            await Promise.all([sound1?.stopAsync(), sound2?.stopAsync(), setIsPlaying(false), pickFile(1)]);
          }}
        >
          <Text style={styles.buttonText}>{audio1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            isPlaying && !trackSelect && styles.buttonActive,
          ]}
          onPress={async () => {
            await Promise.all([sound1?.stopAsync(), sound2?.stopAsync(), setIsPlaying(false), pickFile(2)]);
          }}
        >
          <Text style={styles.buttonText}>{audio2}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.slideContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={seek}
          minimumTrackTintColor="#FFFFFF"
        />
        <Text style={{ color: "rgba(80, 80, 80, .7)", fontSize: 15 }}>
          {Math.floor(position / 1000)} / {Math.floor(duration / 1000)} sec
        </Text>
      </View>
      <View style={{ flexDirection: "row", paddingTop: 40 }}>
        <TouchableOpacity
          style={styles.playbackButton}
          onPress={async () => {
            await Promise.all([
              sound1?.setIsMutedAsync(false),
              sound2?.setIsMutedAsync(true),
            ]);
            setTrackSelect(true);
          }}
        >
          <Text style={styles.buttonText}>Mix A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playbackButton}
          onPress={async () => {
            await Promise.all([
              sound1?.setIsMutedAsync(true),
              sound2?.setIsMutedAsync(false),
            ]);
            setTrackSelect(false);
          }}
        >
          <Text style={styles.buttonText}>Mix B</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playbackButton}
          onPress={async () => {
            await Promise.all([
              trackSelect ? [sound1?.setIsMutedAsync(false), sound2?.setIsMutedAsync(true)] : [sound1?.setIsMutedAsync(true), sound2?.setIsMutedAsync(false)],
              sound1?.playAsync(),
              sound2?.playAsync(),
            ]);
            setIsPlaying(true);
          }}
        >
          <Fontisto name="play" size={24} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playbackButton}
          onPress={async () => {
            await Promise.all([sound1?.stopAsync(), sound2?.stopAsync()]);
            setIsPlaying(false);
          }}
        >
          <Fontisto name="stop" size={24} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Platform.OS === "ios" ? "white" : "black",
    fontFamily: "Rubik Mono One",
    fontSize: 35,
    textAlign: "center",
  },
  slider: {
    width: 300,
    height: 40,
  },
  slideContainer: {
    alignItems: "center",
    marginVertical: 10,
    marginBottom: -10
  },
  button: {
    backgroundColor: "#1c1c1e",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#636366",
    marginVertical: 2,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: Platform.OS === "ios" ? "Avenir-Book" : "sans-serif",
    fontSize: 20,
  },
  buttonActive: {
    backgroundColor: "#2a2a2c",
    borderColor: "#007AFF",
  },
  playbackButton: {
    width: 75,
    backgroundColor: "#1c1c1e",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#636366",
    marginVertical: 2,
    alignItems: "center",
  },
});
