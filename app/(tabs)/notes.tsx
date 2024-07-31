import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";

export default function Notes() {
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [loaded, error] = useFonts({
    "Rubik Mono One": require("../../assets/fonts/RubikMonoOne-Regular.ttf"),
  });
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("mixNotes");
      if (storedNotes) {
        setSavedNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Failed to load notes.", error);
    }
  };

  const saveNote = async () => {
    if (note.trim()) {
      const newNotes = [...savedNotes, note];
      setSavedNotes(newNotes);
      setNote("");

      try {
        await AsyncStorage.setItem("mixNotes", JSON.stringify(newNotes));
      } catch (error) {
        console.error("Failed to save note.", error);
      }
    }
  };

  const confirmClearNotes = () => {
    Alert.alert(
      "Confirm Clear",
      "Are you sure you want to clear all notes?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: clearNotes,
        },
      ],
      { cancelable: false }
    );
  };

  const clearNotes = async () => {
    try {
      await AsyncStorage.removeItem("mixNotes");
      setSavedNotes([]);
    } catch (error) {
      console.error("Failed to clear notes.", error);
    }
  };

  return (
    <View style={styles.container}>
      {loaded && <Text style={styles.title}>Mix Notes</Text>}
      <TextInput
        style={styles.input}
        placeholder="Write your note here..."
        placeholderTextColor="#888"
        value={note}
        onChangeText={setNote}
        multiline
      />
      <TouchableOpacity onPress={saveNote} style={styles.button}>
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={confirmClearNotes} style={[styles.button, styles.clearButton]}>
        <Text style={styles.buttonText}>Clear All Notes</Text>
      </TouchableOpacity>
      <ScrollView style={styles.notesContainer}>
        {savedNotes.map((savedNote, index) => (
          <View key={index} style={styles.note}>
            <Text style={styles.noteText}>{savedNote}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Rubik Mono One",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 100,
  },
  input: {
    backgroundColor: "#333",
    color: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: "top", 
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: "#FF0000",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  notesContainer: {
    flex: 1,
    marginTop: 20,
  },
  note: {
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  noteText: {
    color: "white",
    fontSize: 16,
  },
});
