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

Provide a minimalistic audio app with 4 virtual instruments, patterns, patterns bank, pattern editor and song mode

- 2 OSC synth
- Sample based DrumMachine
- 1 MonoSynth (TB303 like)
- Sampler (soundfont reader ? is that possible ?)


### 2 OSC Synth

- should receive a MIDI channel and MIDI messages (such as note-on note-off, volume ...)
- once this messages are received should play the right note with all MIDI infos
- ability to handles "patchs"
- components :
    - OSC
    - ENV
    - LFO
    - MIXER
    - FILTER
    - DELAY
    - REV
    - DISTORTION
    - ...

> see [this](https://github.com/BarakChamo/rc455/blob/master/app/controllers/Audio.js) and [that](https://github.com/BarakChamo/rc455/blob/master/app/controllers/Voice.js)
