# node-record-lpcm16-ts

A TypeScript module for recording 16-bit signed-integer linear pulse modulation code WAV audio files from your microphone!

This library is a Typescript port of the excellent [node-record-lpcm16](https://github.com/gillesdemey/node-record-lpcm16), which has not been updated in years and lacked Typescript bindings and modern syntax. Credit goes to Gilles de Mey for the original implementation.

The recorded audio files are fully compatible with both the Google Speech to Text API (v2) and the Wit.ai Speech API.

## Installation

```
npm install node-record-lpcm16-ts
```

## Dependencies

Run `npm install` to install all necessary dependencies.

This module requires [SoX](http://sox.sourceforge.net) to be installed and available in your `$PATH`.

### Installation by OS

- **Mac OS**: `brew install sox`
- **Linux**: `sudo apt-get install sox libsox-fmt-all`
- **Windows**: Use [chocolatey](https://chocolatey.org/install) to install SoX:
  ```
  choco install sox.portable
  ```

## Usage

```typescript
import { record } from 'node-record-lpcm16-ts';
import fs from 'fs';

const file = fs.createWriteStream('test.wav', { encoding: 'binary' });

const recording = record({
  sampleRate: 44100,
  channels: 1
});

recording.stream().pipe(file);

// Stop recording after 3 seconds
setTimeout(() => {
  recording.stop();
}, 3000);
```

### Controlling the Recording

You can pause, resume, and stop the recording manually:

```typescript
import { record } from 'node-record-lpcm16-ts';
import fs from 'fs';

const file = fs.createWriteStream('test.wav', { encoding: 'binary' });

const recording = record();
recording.stream().pipe(file);

// Pause recording after one second
setTimeout(() => {
  recording.pause();
}, 1000);

// Resume another second later
setTimeout(() => {
  recording.resume();
}, 2000);

// Stop recording after three seconds
setTimeout(() => {
  recording.stop();
}, 3000);
```

## Options

```typescript
interface RecordingOptions {
  sampleRate: number;      // audio sample rate (default: 16000)
  channels: number;        // number of channels (default: 1)
  compress: boolean;       // compress the audio (default: false)
  threshold: number;       // silence threshold (default: 0.5)
  thresholdStart: number | null; // silence threshold to start recording (default: null)
  thresholdEnd: number | null;   // silence threshold to end recording (default: null)
  silence: string;         // seconds of silence before ending (default: '1.0')
  recorder: string;        // recorder to use (default: 'sox')
  endOnSilence: boolean;   // automatically end on silence (default: false)
  audioType: string;       // audio type to record (default: 'wav')
  device?: string;         // recording device (e.g., 'plughw:1')
}
```

## Recorders

The following recorders are supported:

- rec
- sox
- arecord

Note: Not all recorders support all features.

## Error Handling

To handle errors, add an error event listener to the stream:

```typescript
recording.stream()
  .on('error', (err: Error) => {
    console.error('Recorder error:', err);
  })
  .pipe(file);
```

## Debugging

Debug logging is implemented with [debug](https://github.com/debug-js/debug):

```
DEBUG=record node your-script.js
```

## License

This project is licensed under the ISC License copywritten by the original author [Gilles de Mey](https://github.com/gillesdemey)
