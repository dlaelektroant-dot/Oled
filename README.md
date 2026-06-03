# RoboEyes OLED for BBC micro:bit

## Overview

This MakeCode extension brings **RoboEyes** - animated robot eyes - to your BBC micro:bit with a **SSD1306 128x64 I2C OLED display**.

Based on the original [RoboEyes project by FluxGarage](https://github.com/FluxGarage/RoboEyes) and ported from the [MicroPython version](https://github.com/mchobby/micropython-roboeyes).

## Features

✨ **Multiple Eye Moods:**
- DEFAULT - Normal eyes
- HAPPY - Smiling eyes
- ANGRY - Angry expression
- TIRED - Sleepy eyes
- SCARY - Frightened look
- CURIOUS - Inquisitive expression
- FROZEN - Wide-eyed shock

🎨 **Animations:**
- Automatic blinking
- Idle mode (random eye movements)
- Custom animation sequences
- Eye winking

⚙️ **Customization:**
- Adjustable eye width, height, radius
- Configurable eye spacing
- Cyclops mode (single eye)
- Color support (monochrome and color displays)

## Hardware Requirements

- BBC micro:bit
- SSD1306 128x64 OLED display
- I2C connection (SDA, SCL)

## Wiring

```
micro:bit Pin 19 (SCL) → OLED SCL
micro:bit Pin 20 (SDA) → OLED SDA
micro:bit GND        → OLED GND
micro:bit 3.3V       → OLED VCC
```

## Usage Examples

### Basic Setup

```typescript
let roboEyes = RoboEyesOLED.createRoboEyes()
roboEyes.setAutoBlinking(true, 3, 2)
roboEyes.setIdleMode(true, 2, 2)
roboEyes.setMood(RoboEyesOLED.Mood.Happy)

basic.forever(function () {
    roboEyes.update()
})
```

### Custom Eye Shape

```typescript
let roboEyes = RoboEyesOLED.createRoboEyes()
roboEyes.setEyeWidth(45, 45)
roboEyes.setEyeHeight(45, 45)
roboEyes.setEyeRadius(22, 22)
roboEyes.setEyeSpacing(-7)
```

### Animation Sequences

```typescript
let seq = RoboEyesOLED.createSequence(roboEyes, "blink")
seq.step(0, function () {
    roboEyes.setMood(RoboEyesOLED.Mood.Happy)
})
seq.step(500, function () {
    roboEyes.close()
})
seq.step(1000, function () {
    roboEyes.open()
})
seq.start()
```

## API Reference

### RoboEyesOLED

#### `createRoboEyes()`
Initializes and returns a new RoboEyes instance.

#### `setMood(mood: Mood)`
Sets the current mood of the eyes.

#### `setAutoBlinking(active: boolean, interval?: number, variation?: number)`
Enables/disables automatic blinking with optional interval settings.

#### `setIdleMode(active: boolean, interval?: number, variation?: number)`
Enables/disables idle mode (random eye movements).

#### `setEyeWidth(left: number, right: number)`
Sets the width of each eye in pixels.

#### `setEyeHeight(left: number, right: number)`
Sets the height of each eye in pixels.

#### `setEyeRadius(left: number, right: number)`
Sets the corner radius of each eye.

#### `setEyeSpacing(spacing: number)`
Sets the space between eyes (can be negative).

#### `setCyclopsMode(enabled: boolean)`
Enables/disables cyclops mode (single eye).

#### `close()`
Closes the eyes.

#### `open()`
Opens the eyes.

#### `wink()`
Performs a wink animation.

#### `update()`
Updates the display with the current frame. Call this continuously in your main loop.

### Sequence

#### `step(msDelay: number, callback: () => void)`
Adds a step to the sequence that executes at the specified delay.

#### `start()`
Starts executing the sequence.

#### `reset()`
Resets the sequence to its initial state.

#### `done()`
Returns true if the sequence has finished executing.

## License

MIT License - See LICENSE file

## Credits

- Original RoboEyes for Arduino: [FluxGarage](https://github.com/FluxGarage/RoboEyes)
- MicroPython port: [MCHobby](https://github.com/mchobby/micropython-roboeyes)
- MakeCode extension: dlaelektroant-dot
