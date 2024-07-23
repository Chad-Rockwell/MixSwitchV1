# MixSwitch

The MixSwitch App is a React Native/Expo application that allows users to load and play two audio mixes, switch between them, and take notes while listening. Users can save their notes, clear all notes with a confirmation prompt, and view their saved notes.

## Features

- Load two audio mixes from the device.
- Play and stop audio mixes.
- Switch between Mix 1 and Mix 2.
- Display the progress of the currently playing track.
- Has a rotating logo based on the progress of the song.
- There is a notes tab where you can log any mix notes.
- User can clear all notes with a confirmation prompt.

## Screenshots

(Include screenshots of your app here)

## Usage

1. **Load Audio Mixes:**
    - Click on "Load Mix A" or "Load Mix B" to select an audio file from your device.

2. **Play and Stop Mixes:**
    - Use the play and stop buttons to control the audio playback.
    - Switch between Mix 1 and Mix 2 using the respective buttons.

3. **Take Notes:**
    - Enter your notes in the text input field.
    - Click "Save Note" to save your note.
    - Click "Clear All Notes" to clear all saved notes. A confirmation prompt will appear.

4. **View Saved Notes:**
    - Scroll through your saved notes in the notes section.

## Components

### HomeScreen

- Manages audio playback and switching between Mix 1 and Mix 2.
- Displays the progress bar, app title, logo and highlights the active(audible) mix.
- Contains the following buttons:
  - Load Mix A
  - Load Mix B
  - Play
  - Stop
  - Mix 1
  - Mix 2

### Logo

- Displays the rotating logo.
- Logo rotates when song is being played.

### Notes

- Allows users to take and save notes related to the mixes.
- Displays saved notes and provides an option to clear all notes with a confirmation prompt.

## Styling

The app is styled to be visually appealing with a dark theme. The primary colors used are blue, white, and grey.

## Dependencies

- React Native
- Expo
- AsyncStorage
- Expo File System
- Expo Document Picker
- Expo AV (Audio/Video)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

MIT License

Copyright (c) 2024 Chad Rockwell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

