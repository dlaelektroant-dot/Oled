/**
 * RoboEyes implementation for BBC micro:bit with OLED
 */

namespace roboeyesOLED {
    const DISPLAY_WIDTH = 128;
    const DISPLAY_HEIGHT = 64;
    const FRAME_RATE = 50; // milliseconds

    // Constants
    const DEFAULT = 0;
    const TIRED = 1;
    const ANGRY = 2;
    const HAPPY = 3;
    const FROZEN = 4;
    const SCARY = 5;
    const CURIOUS = 6;

    const ON = 1;
    const OFF = 0;

    /**
     * Main RoboEyes class
     */
    export class RoboEyes {
        private mood: number = DEFAULT;
        private eyeLwidthCurrent: number = 36;
        private eyeRwidthCurrent: number = 36;
        private eyeLheightCurrent: number = 36;
        private eyeRheightCurrent: number = 36;
        private eyeLborderRadiusCurrent: number = 8;
        private eyeRborderRadiusCurrent: number = 8;
        private spaceBetweenCurrent: number = 10;
        private cyclopsMode: boolean = false;
        private eyesOpen: boolean = true;
        private tired: boolean = false;
        private angry: boolean = false;
        private happy: boolean = false;
        private lastUpdate: number = 0;
        private autoblinkerEnabled: boolean = false;
        private blinkTimer: number = 0;
        private blinkInterval: number = 3000;
        private blinkVariation: number = 2000;
        private idleEnabled: boolean = false;
        private idleTimer: number = 0;
        private idleInterval: number = 2000;
        private idleVariation: number = 2000;
        private eyeLx: number = 30;
        private eyeLy: number = 32;
        private eyeRx: number = 92;
        private eyeRy: number = 32;
        private confusedState: boolean = false;
        private laughState: boolean = false;

        constructor() {
            this.lastUpdate = input.runningTime();
            this.blinkTimer = this.lastUpdate + this.blinkInterval + randint(0, this.blinkVariation);
            this.idleTimer = this.lastUpdate + this.idleInterval + randint(0, this.idleVariation);
        }

        /**
         * Update animation frame
         */
        public update(): void {
            const now = input.runningTime();
            if (now - this.lastUpdate < FRAME_RATE) return;
            this.lastUpdate = now;

            // Handle auto blink
            if (this.autoblinkerEnabled && now >= this.blinkTimer) {
                this.blink();
                this.blinkTimer = now + this.blinkInterval + randint(0, this.blinkVariation);
            }

            // Handle idle mode
            if (this.idleEnabled && now >= this.idleTimer) {
                this.moveEyesRandomly();
                this.idleTimer = now + this.idleInterval + randint(0, this.idleVariation);
            }

            this.draw();
        }

        /**
         * Set the mood
         */
        public setMood(newMood: number): void {
            this.mood = newMood;
            this.tired = false;
            this.angry = false;
            this.happy = false;

            if (newMood === TIRED) this.tired = true;
            else if (newMood === ANGRY) this.angry = true;
            else if (newMood === HAPPY) this.happy = true;
            else if (newMood === SCARY) this.tired = true;
            else if (newMood === FROZEN) {
                // Frozen eyes - wide open
            }
            else if (newMood === CURIOUS) {
                // Curious eyes
            }
        }

        /**
         * Set auto blinking
         */
        public setAutoBlinking(active: number, interval: number = 3, variation: number = 2): void {
            this.autoblinkerEnabled = active === ON;
            this.blinkInterval = interval * 1000;
            this.blinkVariation = variation * 1000;
        }

        /**
         * Set idle mode
         */
        public setIdleMode(active: number, interval: number = 2, variation: number = 2): void {
            this.idleEnabled = active === ON;
            this.idleInterval = interval * 1000;
            this.idleVariation = variation * 1000;
        }

        /**
         * Set eye width
         */
        public setEyeWidth(left: number, right: number): void {
            this.eyeLwidthCurrent = left;
            this.eyeRwidthCurrent = right;
        }

        /**
         * Set eye height
         */
        public setEyeHeight(left: number, right: number): void {
            this.eyeLheightCurrent = left;
            this.eyeRheightCurrent = right;
        }

        /**
         * Set eye radius
         */
        public setEyeRadius(left: number, right: number): void {
            this.eyeLborderRadiusCurrent = left;
            this.eyeRborderRadiusCurrent = right;
        }

        /**
         * Set spacing between eyes
         */
        public setEyeSpacing(spacing: number): void {
            this.spaceBetweenCurrent = spacing;
        }

        /**
         * Close eyes
         */
        public close(): void {
            this.eyesOpen = false;
        }

        /**
         * Open eyes
         */
        public open(): void {
            this.eyesOpen = true;
        }

        /**
         * Blink animation
         */
        public blink(): void {
            this.eyesOpen = false;
            basic.pause(200);
            this.eyesOpen = true;
        }

        /**
         * Wink animation
         */
        public wink(): void {
            this.autoblinkerEnabled = false;
            this.idleEnabled = false;
            this.blink();
        }

        /**
         * Set cyclops mode
         */
        public setCyclopsMode(enabled: boolean): void {
            this.cyclopsMode = enabled;
        }

        /**
         * Set eye position (direction)
         */
        public setPosition(position: number): void {
            const maxX = DISPLAY_WIDTH - this.eyeLwidthCurrent - this.spaceBetweenCurrent - this.eyeRwidthCurrent;
            const maxY = DISPLAY_HEIGHT - this.eyeLheightCurrent;

            switch (position) {
                case 1: // Top
                    this.eyeLx = maxX / 2;
                    this.eyeLy = 0;
                    break;
                case 2: // TopRight
                    this.eyeLx = maxX;
                    this.eyeLy = 0;
                    break;
                case 3: // Right
                    this.eyeLx = maxX;
                    this.eyeLy = maxY / 2;
                    break;
                case 4: // BottomRight
                    this.eyeLx = maxX;
                    this.eyeLy = maxY;
                    break;
                case 5: // Bottom
                    this.eyeLx = maxX / 2;
                    this.eyeLy = maxY;
                    break;
                case 6: // BottomLeft
                    this.eyeLx = 0;
                    this.eyeLy = maxY;
                    break;
                case 7: // Left
                    this.eyeLx = 0;
                    this.eyeLy = maxY / 2;
                    break;
                case 8: // TopLeft
                    this.eyeLx = 0;
                    this.eyeLy = 0;
                    break;
                default: // Center
                    this.eyeLx = maxX / 2;
                    this.eyeLy = maxY / 2;
            }
            this.eyeRx = this.eyeLx + this.eyeLwidthCurrent + this.spaceBetweenCurrent;
            this.eyeRy = this.eyeLy;
        }

        /**
         * Confused animation
         */
        public confuse(): void {
            this.confusedState = true;
            basic.pause(500);
            this.confusedState = false;
        }

        /**
         * Laugh animation
         */
        public laugh(): void {
            this.laughState = true;
            basic.pause(500);
            this.laughState = false;
        }

        /**
         * Move eyes randomly
         */
        private moveEyesRandomly(): void {
            this.setPosition(randint(0, 8));
        }

        /**
         * Draw the eyes
         */
        private draw(): void {
            // This would normally draw to OLED
            // For micro:bit, we can use the LED matrix as a visual indicator
            let iconState = IconNames.Happy;
            
            if (this.tired) iconState = IconNames.Asleep;
            else if (this.angry) iconState = IconNames.Angry;
            else if (this.happy) iconState = IconNames.Happy;
            else if (this.mood === FROZEN) iconState = IconNames.Surprised;
            else if (this.mood === SCARY) iconState = IconNames.Sad;

            if (this.eyesOpen) {
                basic.showIcon(iconState);
            } else {
                basic.showIcon(IconNames.Asleep);
            }
        }
    }
}
