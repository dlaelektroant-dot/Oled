# RoboEyes OLED for BBC micro:bit

## Overview

Animated robot eyes for BBC micro:bit connected to SSD1306 128x64 I2C OLED display.

Based on [RoboEyes by FluxGarage](https://github.com/FluxGarage/RoboEyes) and ported from [MicroPython version](https://github.com/mchobby/micropython-roboeyes).

## Features

- 7 mood expressions (Default, Happy, Angry, Tired, Scary, Curious, Frozen)
- Auto blinking with configurable timing
- Idle mode with random eye movements
- Cyclops mode (single eye)
- Customizable eye shape and spacing
- Smooth animations and transitions
- Winking and special animations

## Hardware Setup

### Wiring (I2C SSD1306 OLED)
```
micro:bit Pin 19 (SCL) → OLED SCL
micro:bit Pin 20 (SDA) → OLED SDA
micro:bit GND        → OLED GND
micro:bit 3.3V       → OLED VCC
```

## Quick Start

```blocks
roboeyesOLED.initialize()
roboeyesOLED.setAutoBlinking(true, 3, 2)
roboeyesOLED.setIdleMode(true, 2, 2)
roboeyesOLED.setMood(roboeyesOLED.Mood.Happy)
basic.forever(function () {
    roboeyesOLED.update()
})
```

## Supported Moods

- **Default** - Neutral expression
- **Happy** - Smiling eyes
- **Angry** - Angry expression  
- **Tired** - Sleepy eyes
- **Scary** - Frightened look
- **Curious** - Inquisitive expression
- **Frozen** - Wide-eyed shock

## API Blocks

### Initialization
- `initialize RoboEyes` - Set up the eyes
- `update RoboEyes` - Refresh display (call in forever loop)

### Mood & Expression
- `set RoboEyes mood to [mood]` - Change expression
- `wink` - Perform wink animation
- `confuse eyes` - Shake animation
- `laugh` - Shake animation

### Animation
- `set auto blinking [enabled] interval [3] seconds variation [2] seconds`
- `set idle mode [enabled] interval [2] seconds variation [2] seconds`

### Customization
- `set eye width left [36] right [36]`
- `set eye height left [36] right [36]`
- `set eye radius left [8] right [8]`
- `set eye spacing [10]`
- `set cyclops mode [enabled]`
- `look [Center]`

### Control
- `open eyes`
- `close eyes`

## Example Programs

### Happy Robot
```blocks
roboeyesOLED.initialize()
roboeyesOLED.setMood(roboeyesOLED.Mood.Happy)
roboeyesOLED.setAutoBlinking(true, 2, 1)
roboeyesOLED.setIdleMode(true, 3, 1)

basic.forever(function () {
    roboeyesOLED.update()
})
```

### Emotional Journey
```blocks
roboeyesOLED.initialize()
roboeyesOLED.setAutoBlinking(true)

basic.forever(function () {
    roboeyesOLED.setMood(roboeyesOLED.Mood.Happy)
    basic.pause(2000)
    roboeyesOLED.setMood(roboeyesOLED.Mood.Angry)
    basic.pause(2000)
    roboeyesOLED.setMood(roboeyesOLED.Mood.Tired)
    basic.pause(2000)
    roboeyesOLED.update()
})
```

## License

MIT
