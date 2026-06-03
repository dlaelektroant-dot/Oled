/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

/**
 * RoboEyes blocks for BBC micro:bit with OLED display
 */
//% weight=100 color=#0078D4 icon="\uf06e" block="RoboEyes OLED"
namespace roboeyesOLED {
    export enum Mood {
        //% block="Default"
        Default = 0,
        //% block="Happy"
        Happy = 3,
        //% block="Angry"
        Angry = 2,
        //% block="Tired"
        Tired = 1,
        //% block="Scary"
        Scary = 5,
        //% block="Curious"
        Curious = 6,
        //% block="Frozen"
        Frozen = 4
    }

    export enum Position {
        //% block="Center"
        Center = 0,
        //% block="Top"
        Top = 1,
        //% block="TopRight"
        TopRight = 2,
        //% block="Right"
        Right = 3,
        //% block="BottomRight"
        BottomRight = 4,
        //% block="Bottom"
        Bottom = 5,
        //% block="BottomLeft"
        BottomLeft = 6,
        //% block="Left"
        Left = 7,
        //% block="TopLeft"
        TopLeft = 8
    }

    let roboEyesInstance: RoboEyes = null;

    /**
     * Initialize RoboEyes
     */
    //% block="initialize RoboEyes"
    //% blockId=roboeyes_init
    //% weight=100
    export function initialize(): void {
        if (!roboEyesInstance) {
            roboEyesInstance = new RoboEyes();
        }
    }

    /**
     * Update RoboEyes display
     */
    //% block="update RoboEyes"
    //% blockId=roboeyes_update
    //% weight=99
    export function update(): void {
        if (roboEyesInstance) {
            roboEyesInstance.update();
        }
    }

    /**
     * Set mood of eyes
     */
    //% block="set RoboEyes mood to %mood"
    //% blockId=roboeyes_set_mood
    //% mood.defl=Mood.Default
    //% weight=90
    export function setMood(mood: Mood): void {
        if (roboEyesInstance) {
            roboEyesInstance.setMood(mood);
        }
    }

    /**
     * Enable auto blinking
     */
    //% block="set auto blinking %enabled interval %interval seconds variation %variation seconds"
    //% blockId=roboeyes_auto_blink
    //% enabled.shadow=toggleOnOff
    //% interval.defl=3
    //% variation.defl=2
    //% weight=85
    export function setAutoBlinking(enabled: boolean, interval: number = 3, variation: number = 2): void {
        if (roboEyesInstance) {
            roboEyesInstance.setAutoBlinking(enabled ? 1 : 0, interval, variation);
        }
    }

    /**
     * Enable idle mode (random eye movements)
     */
    //% block="set idle mode %enabled interval %interval seconds variation %variation seconds"
    //% blockId=roboeyes_idle_mode
    //% enabled.shadow=toggleOnOff
    //% interval.defl=2
    //% variation.defl=2
    //% weight=84
    export function setIdleMode(enabled: boolean, interval: number = 2, variation: number = 2): void {
        if (roboEyesInstance) {
            roboEyesInstance.setIdleMode(enabled ? 1 : 0, interval, variation);
        }
    }

    /**
     * Set eye width
     */
    //% block="set eye width left %left right %right"
    //% blockId=roboeyes_eye_width
    //% left.defl=36
    //% right.defl=36
    //% weight=80
    export function setEyeWidth(left: number, right: number): void {
        if (roboEyesInstance) {
            roboEyesInstance.setEyeWidth(left, right);
        }
    }

    /**
     * Set eye height
     */
    //% block="set eye height left %left right %right"
    //% blockId=roboeyes_eye_height
    //% left.defl=36
    //% right.defl=36
    //% weight=79
    export function setEyeHeight(left: number, right: number): void {
        if (roboEyesInstance) {
            roboEyesInstance.setEyeHeight(left, right);
        }
    }

    /**
     * Set eye radius (roundness)
     */
    //% block="set eye radius left %left right %right"
    //% blockId=roboeyes_eye_radius
    //% left.defl=8
    //% right.defl=8
    //% weight=78
    export function setEyeRadius(left: number, right: number): void {
        if (roboEyesInstance) {
            roboEyesInstance.setEyeRadius(left, right);
        }
    }

    /**
     * Set space between eyes
     */
    //% block="set eye spacing %spacing"
    //% blockId=roboeyes_spacing
    //% spacing.defl=10
    //% weight=77
    export function setEyeSpacing(spacing: number): void {
        if (roboEyesInstance) {
            roboEyesInstance.setEyeSpacing(spacing);
        }
    }

    /**
     * Close eyes
     */
    //% block="close eyes"
    //% blockId=roboeyes_close
    //% weight=75
    export function closeEyes(): void {
        if (roboEyesInstance) {
            roboEyesInstance.close();
        }
    }

    /**
     * Open eyes
     */
    //% block="open eyes"
    //% blockId=roboeyes_open
    //% weight=74
    export function openEyes(): void {
        if (roboEyesInstance) {
            roboEyesInstance.open();
        }
    }

    /**
     * Wink animation
     */
    //% block="wink"
    //% blockId=roboeyes_wink
    //% weight=73
    export function wink(): void {
        if (roboEyesInstance) {
            roboEyesInstance.wink();
        }
    }

    /**
     * Move eyes to position
     */
    //% block="look %position"
    //% blockId=roboeyes_look
    //% position.defl=Position.Center
    //% weight=72
    export function lookAt(position: Position): void {
        if (roboEyesInstance) {
            roboEyesInstance.setPosition(position);
        }
    }

    /**
     * Enable cyclops mode
     */
    //% block="set cyclops mode %enabled"
    //% blockId=roboeyes_cyclops
    //% enabled.shadow=toggleOnOff
    //% weight=70
    export function setCyclopsMode(enabled: boolean): void {
        if (roboEyesInstance) {
            roboEyesInstance.setCyclopsMode(enabled);
        }
    }

    /**
     * Make eyes confused (shake animation)
     */
    //% block="confuse eyes"
    //% blockId=roboeyes_confuse
    //% weight=60
    export function confuse(): void {
        if (roboEyesInstance) {
            roboEyesInstance.confuse();
        }
    }

    /**
     * Make eyes laugh (shake animation)
     */
    //% block="laugh"
    //% blockId=roboeyes_laugh
    //% weight=59
    export function laugh(): void {
        if (roboEyesInstance) {
            roboEyesInstance.laugh();
        }
    }
}
