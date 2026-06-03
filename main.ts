/**
 * RoboEyes OLED blocks
 */
//% weight=100 color=#4472C4 icon="\uf06e" block="RoboEyes"
namespace RoboEyesOLED {
    export enum Mood {
        //% block="DEFAULT"
        DEFAULT = 0,
        //% block="HAPPY"
        HAPPY = 1,
        //% block="ANGRY"
        ANGRY = 2,
        //% block="TIRED"
        TIRED = 3,
        //% block="SCARY"
        SCARY = 4,
        //% block="CURIOUS"
        CURIOUS = 5,
        //% block="FROZEN"
        FROZEN = 6
    }

    export enum Direction {
        //% block="CENTER"
        CENTER = 0,
        //% block="NORTH"
        NORTH = 1,
        //% block="NORTHEAST"
        NORTHEAST = 2,
        //% block="EAST"
        EAST = 3,
        //% block="SOUTHEAST"
        SOUTHEAST = 4,
        //% block="SOUTH"
        SOUTH = 5,
        //% block="SOUTHWEST"
        SOUTHWEST = 6,
        //% block="WEST"
        WEST = 7,
        //% block="NORTHWEST"
        NORTHWEST = 8
    }

    let roboEyesInstance: RoboEyes | null = null;

    /**
     * Create and initialize RoboEyes
     */
    //% block="create RoboEyes"
    //% blockId=roboeyes_create
    //% weight=90
    export function createRoboEyes(): RoboEyes {
        if (!roboEyesInstance) {
            roboEyesInstance = new RoboEyes();
        }
        return roboEyesInstance;
    }

    /**
     * Set the mood of the eyes
     */
    //% block="set RoboEyes mood to %mood"
    //% blockId=roboeyes_set_mood
    //% weight=80
    export function setMood(roboeyes: RoboEyes, mood: Mood): void {
        roboeyes.setMood(mood);
    }

    /**
     * Set auto blinking
     */
    //% block="set RoboEyes auto blinking %active interval %interval variation %variation"
    //% blockId=roboeyes_auto_blink
    //% weight=75
    //% active.shadow=toggleOnOff
    //% interval.defl=3
    //% variation.defl=2
    export function setAutoBlinking(roboeyes: RoboEyes, active: boolean, interval: number = 3, variation: number = 2): void {
        roboeyes.setAutoBlinker(active ? 1 : 0, interval, variation);
    }

    /**
     * Set idle mode
     */
    //% block="set RoboEyes idle mode %active interval %interval variation %variation"
    //% blockId=roboeyes_idle_mode
    //% weight=74
    //% active.shadow=toggleOnOff
    //% interval.defl=2
    //% variation.defl=2
    export function setIdleMode(roboeyes: RoboEyes, active: boolean, interval: number = 2, variation: number = 2): void {
        roboeyes.setIdleMode(active ? 1 : 0, interval, variation);
    }

    /**
     * Set eye dimensions
     */
    //% block="set RoboEyes eye width left %left right %right"
    //% blockId=roboeyes_eye_width
    //% weight=70
    export function setEyeWidth(roboeyes: RoboEyes, left: number, right: number): void {
        roboeyes.setEyeWidth(left, right);
    }

    /**
     * Set eye height
     */
    //% block="set RoboEyes eye height left %left right %right"
    //% blockId=roboeyes_eye_height
    //% weight=69
    export function setEyeHeight(roboeyes: RoboEyes, left: number, right: number): void {
        roboeyes.setEyeHeight(left, right);
    }

    /**
     * Set eye radius (corner roundness)
     */
    //% block="set RoboEyes eye radius left %left right %right"
    //% blockId=roboeyes_eye_radius
    //% weight=68
    export function setEyeRadius(roboeyes: RoboEyes, left: number, right: number): void {
        roboeyes.setEyeRadius(left, right);
    }

    /**
     * Set eye spacing
     */
    //% block="set RoboEyes eye spacing %spacing"
    //% blockId=roboeyes_eye_spacing
    //% weight=67
    export function setEyeSpacing(roboeyes: RoboEyes, spacing: number): void {
        roboeyes.setEyeSpacing(spacing);
    }

    /**
     * Set cyclops mode
     */
    //% block="set RoboEyes cyclops mode %enabled"
    //% blockId=roboeyes_cyclops
    //% weight=66
    //% enabled.shadow=toggleOnOff
    export function setCyclopsMode(roboeyes: RoboEyes, enabled: boolean): void {
        roboeyes.setCyclopsMode(enabled);
    }

    /**
     * Close eyes
     */
    //% block="close RoboEyes eyes"
    //% blockId=roboeyes_close
    //% weight=60
    export function closeEyes(roboeyes: RoboEyes): void {
        roboeyes.close();
    }

    /**
     * Open eyes
     */
    //% block="open RoboEyes eyes"
    //% blockId=roboeyes_open
    //% weight=59
    export function openEyes(roboeyes: RoboEyes): void {
        roboeyes.open();
    }

    /**
     * Wink animation
     */
    //% block="RoboEyes wink"
    //% blockId=roboeyes_wink
    //% weight=58
    export function wink(roboeyes: RoboEyes): void {
        roboeyes.wink();
    }

    /**
     * Update display
     */
    //% block="update RoboEyes"
    //% blockId=roboeyes_update
    //% weight=100
    export function update(roboeyes: RoboEyes): void {
        roboeyes.update();
    }

    /**
     * Create a new animation sequence
     */
    //% block="create animation sequence %name"
    //% blockId=roboeyes_create_sequence
    //% weight=50
    export function createSequence(roboeyes: RoboEyes, name: string): Sequence {
        return new Sequence(roboeyes, name);
    }
}
