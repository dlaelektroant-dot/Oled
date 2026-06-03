namespace RoboEyes {
    const DISPLAY_WIDTH = 128;
    const DISPLAY_HEIGHT = 64;
    const FRAME_RATE = 50;

    // Mood constants
    export const DEFAULT = 0;
    export const TIRED = 1;
    export const ANGRY = 2;
    export const HAPPY = 3;
    export const FROZEN = 4;
    export const SCARY = 5;
    export const CURIOUS = 6;

    // Direction constants
    export const N = 1;
    export const NE = 2;
    export const E = 3;
    export const SE = 4;
    export const S = 5;
    export const SW = 6;
    export const W = 7;
    export const NW = 8;

    export class RoboEyesController {
        // Eye geometry
        private eyeLWidthDefault: number = 36;
        private eyeLHeightDefault: number = 36;
        private eyeRWidthDefault: number = 36;
        private eyeRHeightDefault: number = 36;
        private eyeLborderRadiusDefault: number = 8;
        private eyeRborderRadiusDefault: number = 8;
        private spaceBetweenDefault: number = 10;

        private eyeLWidthCurrent: number = 36;
        private eyeLHeightCurrent: number = 1;
        private eyeRWidthCurrent: number = 36;
        private eyeRHeightCurrent: number = 1;
        private eyeLborderRadiusCurrent: number = 8;
        private eyeRborderRadiusCurrent: number = 8;
        private spaceBetweenCurrent: number = 10;

        // Eye positions
        private eyeLx: number;
        private eyeLy: number;
        private eyeRx: number;
        private eyeRy: number;

        private eyeLxNext: number;
        private eyeLyNext: number;
        private eyeRxNext: number;
        private eyeRyNext: number;

        // State
        private _mood: number = DEFAULT;
        private tired: boolean = false;
        private angry: boolean = false;
        private happy: boolean = false;
        private cyclops: boolean = false;
        private eyeL_open: boolean = false;
        private eyeR_open: boolean = false;

        // Eyelids
        private eyelidsHeightMax: number = 18;
        private eyelidsTiredHeight: number = 0;
        private eyelidsTiredHeightNext: number = 0;
        private eyelidsAngryHeight: number = 0;
        private eyelidsAngryHeightNext: number = 0;
        private eyelidsHappyBottomOffsetMax: number = 21;
        private eyelidsHappyBottomOffset: number = 0;
        private eyelidsHappyBottomOffsetNext: number = 0;

        // Animations
        private autoblinker: boolean = false;
        private blinkInterval: number = 1;
        private blinkIntervalVariation: number = 4;
        private blinktimer: number = 0;

        private idle: boolean = false;
        private idleInterval: number = 1;
        private idleIntervalVariation: number = 3;
        private idleAnimationTimer: number = 0;

        private hFlicker: boolean = false;
        private vFlicker: boolean = false;

        // Display
        private fpsTimer: number = 0;
        private frameInterval: number = 50;

        constructor() {
            this.calculateEyePositions();
            this.fpsTimer = input.runningTime();
            this.blinktimer = this.fpsTimer;
            this.idleAnimationTimer = this.fpsTimer;
            this.eyeL_open = false;
            this.eyeR_open = false;
        }

        private calculateEyePositions(): void {
            const totalWidth = this.eyeLWidthDefault + this.spaceBetweenDefault + this.eyeRWidthDefault;
            this.eyeLx = (DISPLAY_WIDTH - totalWidth) / 2;
            this.eyeLy = (DISPLAY_HEIGHT - this.eyeLHeightDefault) / 2;
            this.eyeLxNext = this.eyeLx;
            this.eyeLyNext = this.eyeLy;

            this.eyeRx = this.eyeLx + this.eyeLWidthCurrent + this.spaceBetweenDefault;
            this.eyeRy = this.eyeLy;
            this.eyeRxNext = this.eyeRx;
            this.eyeRyNext = this.eyeRy;
        }

        public update(): void {
            const now = input.runningTime();
            if (now - this.fpsTimer >= this.frameInterval) {
                this.draw_eyes();
                this.fpsTimer = now;
            }
        }

        public setMood(mood: number): void {
            this._mood = mood;
            this.tired = false;
            this.angry = false;
            this.happy = false;

            if (mood == TIRED) {
                this.tired = true;
            } else if (mood == ANGRY) {
                this.angry = true;
            } else if (mood == HAPPY) {
                this.happy = true;
            } else if (mood == FROZEN) {
                // Frozen - keep eyes wide
            } else if (mood == SCARY) {
                this.tired = true;
            }
        }

        public set_auto_blinker(active: boolean, interval: number = 1, variation: number = 4): void {
            this.autoblinker = active;
            this.blinkInterval = interval;
            this.blinkIntervalVariation = variation;
        }

        public set_idle_mode(active: boolean, interval: number = 1, variation: number = 3): void {
            this.idle = active;
            this.idleInterval = interval;
            this.idleIntervalVariation = variation;
        }

        public eyes_width(leftEye: number, rightEye: number): void {
            this.eyeLWidthDefault = leftEye;
            this.eyeLWidthCurrent = leftEye;
            this.eyeRWidthDefault = rightEye;
            this.eyeRWidthCurrent = rightEye;
        }

        public eyes_height(leftEye: number, rightEye: number): void {
            this.eyeLHeightDefault = leftEye;
            this.eyeLHeightCurrent = leftEye;
            this.eyeRHeightDefault = rightEye;
            this.eyeRHeightCurrent = rightEye;
        }

        public eyes_radius(leftEye: number, rightEye: number): void {
            this.eyeLborderRadiusDefault = leftEye;
            this.eyeLborderRadiusCurrent = leftEye;
            this.eyeRborderRadiusDefault = rightEye;
            this.eyeRborderRadiusCurrent = rightEye;
        }

        public eyes_spacing(space: number): void {
            this.spaceBetweenDefault = space;
            this.spaceBetweenCurrent = space;
        }

        public close(): void {
            this.eyeLHeightCurrent = 1;
            this.eyeRHeightCurrent = 1;
            this.eyeL_open = false;
            this.eyeR_open = false;
        }

        public open(): void {
            this.eyeL_open = true;
            this.eyeR_open = true;
        }

        public blink(): void {
            this.close();
            this.open();
        }

        public wink(): void {
            this.autoblinker = false;
            this.idle = false;
            this.blink();
        }

        public set_position(direction: number): void {
            const maxX = this.getScreenConstraintX();
            const maxY = this.getScreenConstraintY();

            switch (direction) {
                case N:
                    this.eyeLxNext = maxX / 2;
                    this.eyeLyNext = 0;
                    break;
                case NE:
                    this.eyeLxNext = maxX;
                    this.eyeLyNext = 0;
                    break;
                case E:
                    this.eyeLxNext = maxX;
                    this.eyeLyNext = maxY / 2;
                    break;
                case SE:
                    this.eyeLxNext = maxX;
                    this.eyeLyNext = maxY;
                    break;
                case S:
                    this.eyeLxNext = maxX / 2;
                    this.eyeLyNext = maxY;
                    break;
                case SW:
                    this.eyeLxNext = 0;
                    this.eyeLyNext = maxY;
                    break;
                case W:
                    this.eyeLxNext = 0;
                    this.eyeLyNext = maxY / 2;
                    break;
                case NW:
                    this.eyeLxNext = 0;
                    this.eyeLyNext = 0;
                    break;
                default:
                    this.eyeLxNext = maxX / 2;
                    this.eyeLyNext = maxY / 2;
            }
        }

        private getScreenConstraintX(): number {
            return DISPLAY_WIDTH - this.eyeLWidthCurrent - this.spaceBetweenCurrent - this.eyeRWidthCurrent;
        }

        private getScreenConstraintY(): number {
            return DISPLAY_HEIGHT - this.eyeLHeightDefault;
        }

        private draw_eyes(): void {
            // Update eye heights (blinking animation)
            this.eyeLHeightCurrent = (this.eyeLHeightCurrent + this.eyeLHeightDefault) / 2;
            this.eyeRHeightCurrent = (this.eyeRHeightCurrent + this.eyeRHeightDefault) / 2;

            // Open eyes if flagged
            if (this.eyeL_open && this.eyeLHeightCurrent <= 1) {
                this.eyeLHeightDefault = this.eyeLHeightDefault;
            }
            if (this.eyeR_open && this.eyeRHeightCurrent <= 1) {
                this.eyeRHeightDefault = this.eyeRHeightDefault;
            }

            // Update positions
            this.eyeLx = (this.eyeLx + this.eyeLxNext) / 2;
            this.eyeLy = (this.eyeLy + this.eyeLyNext) / 2;
            this.eyeRxNext = this.eyeLxNext + this.eyeLWidthCurrent + this.spaceBetweenCurrent;
            this.eyeRyNext = this.eyeLyNext;
            this.eyeRx = (this.eyeRx + this.eyeRxNext) / 2;
            this.eyeRy = (this.eyeRy + this.eyeRyNext) / 2;

            // Handle auto blinking
            if (this.autoblinker) {
                const now = input.runningTime();
                if (now >= this.blinktimer) {
                    this.blink();
                    this.blinktimer = now + (this.blinkInterval * 1000) + randint(0, this.blinkIntervalVariation * 1000);
                }
            }

            // Handle idle mode
            if (this.idle) {
                const now = input.runningTime();
                if (now >= this.idleAnimationTimer) {
                    const constraint = this.getScreenConstraintX();
                    this.eyeLxNext = randint(0, constraint);
                    this.eyeLyNext = randint(0, this.getScreenConstraintY());
                    this.idleAnimationTimer = now + (this.idleInterval * 1000) + randint(0, this.idleIntervalVariation * 1000);
                }
            }

            // Apply mood eyelids
            if (this.tired) {
                this.eyelidsTiredHeightNext = this.eyeLHeightCurrent / 2;
            } else {
                this.eyelidsTiredHeightNext = 0;
            }

            if (this.angry) {
                this.eyelidsAngryHeightNext = this.eyeLHeightCurrent / 2;
            } else {
                this.eyelidsAngryHeightNext = 0;
            }

            if (this.happy) {
                this.eyelidsHappyBottomOffsetNext = this.eyeLHeightCurrent / 2;
            } else {
                this.eyelidsHappyBottomOffsetNext = 0;
            }

            // Show on LED matrix
            let icon = IconNames.Happy;
            if (!this.eyeL_open) icon = IconNames.Asleep;
            else if (this.happy) icon = IconNames.Happy;
            else if (this.angry) icon = IconNames.Angry;
            else if (this.tired) icon = IconNames.Sad;
            else if (this._mood == FROZEN) icon = IconNames.Surprised;
            
            basic.showIcon(icon);
        }
    }
}
