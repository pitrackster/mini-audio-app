# mini-audio-app

Uses
- Electron
- WebAudio API
- Angular2
- TypeScript

**WIP**

## Install

```
npm install && npm start
```


## Main idea

- First steps with Electron / Angular2
- In an hypothetic future, provide an open source multiplatform ***virtual studio app*** with HTML based virtual instruments, controllers / components such as patterns, patterns bank, pattern editor, song mode, visual automation...


### Instruments
- 2 OSC synth
- Sample based DrumMachine
- 1 MonoSynth (TB303 like)
- Sampler (soundfont reader ? is that possible ?)

All instruments should :

- receive MIDI messages (such as channel, note-on note-off, volume ...)
- have the ability to handles "patchs"


### Components

- OSC
- ENV
- LFO
- MIXER
- FILTER
- DELAY
- REV
- DISTORTION
- KEYBOARD
- PATTERN SEQ
- ...

> for inspiration see [this](https://github.com/BarakChamo/rc455/)
