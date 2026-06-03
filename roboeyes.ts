/**
 * RoboEyes class implementation for micro:bit with SSD1306 OLED
 */

namespace RoboEyesOLED {
    // Display constants
    const DISPLAY_WIDTH = 128;
    const DISPLAY_HEIGHT = 64;
    const FRAME_RATE = 100; // milliseconds per frame

    // Mood constants
    export const DEFAULT = 0;
    export const TIRED = 1;
    export const ANGRY = 2;
    export const HAPPY = 3;
    export const FROZEN = 4;
    export const SCARY = 5;
    export const CURIOUS = 6;

    // State constants
    export const ON = 1;
    export const OFF = 0;

    // Direction constants (predefined positions)
    export const N = 1;   // north, top center
    export const NE = 2;  // north-east, top right
    export const E = 3;   // east, middle right
    export const SE = 4;  // south-east, bottom right
    export const S = 5;   // south, bottom center
    export const SW = 6;  // south-west, bottom left
    export const W = 7;   // west, middle left
    export const NW = 8;  // north-west, top left

    /**
     * Animation step data
     */
    class StepData {
        done: boolean = false;
        ms_timing: number;
        callback: () => void;
        owner_seq: Sequence;

        constructor(owner_seq: Sequence, ms_timing: number, callback: () => void) {
            this.ms_timing = ms_timing;
            this.callback = callback;
            this.owner_seq = owner_seq;
        }

        update(ticks_ms: number): void {
            if (this.done) return;
            if (ticks_ms - this.owner_seq._start < this.ms_timing) return;
            this.callback();
            this.done = true;
        }
    }

    /**
     * Animation Sequence class
     */
    export class Sequence {
        owner: RoboEyes;
        name: string;
        steps: StepData[] = [];
        _start: number = -1;

        constructor(owner: RoboEyes, name: string) {
            this.owner = owner;
            this.name = name;
        }

        step(ms_timing: number, callback: () => void): void {
            const step_data = new StepData(this, ms_timing, callback);
            this.steps.push(step_data);
        }

        start(): void {
            this._start = input.runningTime();
        }

        reset(): void {
            this._start = -1;
            for (let step of this.steps) {
                step.done = false;
            }
        }

        get done(): boolean {
            if (this._start < 0) return true;
            return this.steps.every(s => s.done);
        }

        update(): void {
            if (this._start < 0) return;
            const current_time = input.runningTime();
            for (let step of this.steps) {
                step.update(current_time);
            }
        }
    }

    /**
     * Main RoboEyes class
     */
    export class RoboEyes {
        // Display buffer
        private fb: Image;
        private last_update: number = 0;

        // Eye properties
        private eye_width_left: number = 28;
        private eye_width_right: number = 28;
        private eye_height_left: number = 45;
        private eye_height_right: number = 45;
        private eye_radius_left: number = 8;
        private eye_radius_right: number = 8;
        private eye_spacing: number = 10;
        private cyclops: boolean = false;

        // Eye position
        private pupil_x_left: number = 0;
        private pupil_y_left: number = 0;
        private pupil_x_right: number = 0;
        private pupil_y_right: number = 0;

        // Mood and state
        private mood: number = DEFAULT;
        private blinking: number = 0;
        private closed: number = 0;

        // Auto blinker
        private auto_blink_enabled: number = OFF;
        private auto_blink_interval: number = 1;
        private auto_blink_variation: number = 4;
        private next_blink_time: number = 0;

        // Idle mode
        private idle_enabled: number = OFF;
        private idle_interval: number = 1;
        private idle_variation: number = 4;
        private next_idle_time: number = 0;

        // Animation sequences
        private sequences: Sequence[] = [];

        constructor() {
            // Initialize a virtual framebuffer (16x8 pixels for 128x64)
            this.fb = image.create(DISPLAY_WIDTH, DISPLAY_HEIGHT);
            this.fb.fill(0);
            this.initializeEyes();
        }

        private initializeEyes(): void {
            this.pupil_x_left = this.eye_width_left / 2;
            this.pupil_y_left = this.eye_height_left / 2;
            this.pupil_x_right = this.eye_width_right / 2;
            this.pupil_y_right = this.eye_height_right / 2;
        }

        /**
         * Set the mood of the eyes
         */
        public setMood(new_mood: number): void {
            this.mood = new_mood;
        }

        /**
         * Set auto blinking
         */
        public setAutoBlinker(active: number, interval: number = 1, variation: number = 4): void {
            this.auto_blink_enabled = active;
            this.auto_blink_interval = interval * 1000; // Convert to milliseconds
            this.auto_blink_variation = variation * 1000;
            if (active) {
                this.next_blink_time = input.runningTime() + this.auto_blink_interval + randint(0, this.auto_blink_variation);
            }
        }

        /**
         * Set idle mode
         */
        public setIdleMode(active: number, interval: number = 1, variation: number = 4): void {
            this.idle_enabled = active;
            this.idle_interval = interval * 1000; // Convert to milliseconds
            this.idle_variation = variation * 1000;
            if (active) {
                this.next_idle_time = input.runningTime() + this.idle_interval + randint(0, this.idle_variation);
            }
        }

        /**
         * Set eye dimensions
         */
        public setEyeWidth(left: number, right: number): void {
            this.eye_width_left = left;
            this.eye_width_right = right;
        }

        public setEyeHeight(left: number, right: number): void {
            this.eye_height_left = left;
            this.eye_height_right = right;
        }

        public setEyeRadius(left: number, right: number): void {
            this.eye_radius_left = left;
            this.eye_radius_right = right;
        }

        public setEyeSpacing(spacing: number): void {
            this.eye_spacing = spacing;
        }

        /**
         * Set cyclops mode
         */
        public setCyclopsMode(enabled: boolean): void {
            this.cyclops = enabled;
        }

        /**
         * Close eyes
         */
        public close(): void {
            this.closed = 1;
        }

        /**
         * Open eyes
         */
        public open(): void {
            this.closed = 0;
        }

        /**
         * Perform wink animation
         */
        public wink(): void {
            this.blinking = 1;
        }

        /**
         * Update animation
         */
        public update(): void {
            const now = input.runningTime();
            if (now - this.last_update < FRAME_RATE) return;
            this.last_update = now;

            // Handle auto blinking
            if (this.auto_blink_enabled && now >= this.next_blink_time) {
                this.blinking = 1;
                this.next_blink_time = now + this.auto_blink_interval + randint(0, this.auto_blink_variation);
            }

            // Handle idle mode
            if (this.idle_enabled && now >= this.next_idle_time) {
                this.movePupilToPosition(randint(0, 8));
                this.next_idle_time = now + this.idle_interval + randint(0, this.idle_variation);
            }

            // Update sequences
            for (let seq of this.sequences) {
                seq.update();
            }

            // Draw eyes
            this.drawEyes();

            // Display the frame
            this.show();
        }

        /**
         * Draw the eyes on the framebuffer
         */
        private drawEyes(): void {
            this.fb.fill(0); // Clear display

            // Draw left eye
            if (!this.cyclops) {
                this.drawEye(
                    30, // x position of left eye
                    32, // y position of left eye
                    this.eye_width_left,
                    this.eye_height_left,
                    this.eye_radius_left,
                    this.pupil_x_left,
                    this.pupil_y_left
                );
            }

            // Draw right eye (or cyclops center)
            const right_x = this.cyclops ? 64 : 98; // 128/2 for cyclops
            this.drawEye(
                right_x,
                32,
                this.cyclops ? this.eye_width_left : this.eye_width_right,
                this.cyclops ? this.eye_height_left : this.eye_height_right,
                this.cyclops ? this.eye_radius_left : this.eye_radius_right,
                this.cyclops ? this.pupil_x_left : this.pupil_x_right,
                this.cyclops ? this.pupil_y_left : this.pupil_y_right
            );
        }

        /**
         * Draw a single eye
         */
        private drawEye(center_x: number, center_y: number, width: number, height: number, radius: number, pupil_x: number, pupil_y: number): void {
            const x_start = center_x - width / 2;
            const y_start = center_y - height / 2;
            const x_end = x_start + width;
            const y_end = y_start + height;

            // Draw eye outline (rectangle or rounded)
            for (let x = x_start; x < x_end; x++) {
                for (let y = y_start; y < y_end; y++) {
                    if (this.closed) {
                        if (y === y_start || y === y_end - 1) {
                            this.fb.setPixel(x, y, 1);
                        }
                    } else {
                        // Draw white background
                        this.fb.setPixel(x, y, 1);
                    }
                }
            }

            // Draw pupil (if eyes are open)
            if (!this.closed) {
                const pupil_size = 4;
                const pupil_center_x = x_start + pupil_x;
                const pupil_center_y = y_start + pupil_y;

                for (let x = pupil_center_x - pupil_size / 2; x < pupil_center_x + pupil_size / 2; x++) {
                    for (let y = pupil_center_y - pupil_size / 2; y < pupil_center_y + pupil_size / 2; y++) {
                        if (x >= 0 && x < DISPLAY_WIDTH && y >= 0 && y < DISPLAY_HEIGHT) {
                            this.fb.setPixel(x, y, 0); // Black pupil
                        }
                    }
                }
            }
        }

        /**
         * Move pupil to predefined position
         */
        private movePupilToPosition(direction: number): void {
            const max_offset = 10;
            let offset_x = 0;
            let offset_y = 0;

            switch (direction) {
                case N:
                    offset_y = -max_offset;
                    break;
                case NE:
                    offset_x = max_offset;
                    offset_y = -max_offset;
                    break;
                case E:
                    offset_x = max_offset;
                    break;
                case SE:
                    offset_x = max_offset;
                    offset_y = max_offset;
                    break;
                case S:
                    offset_y = max_offset;
                    break;
                case SW:
                    offset_x = -max_offset;
                    offset_y = max_offset;
                    break;
                case W:
                    offset_x = -max_offset;
                    break;
                case NW:
                    offset_x = -max_offset;
                    offset_y = -max_offset;
                    break;
                default: // CENTER
                    offset_x = 0;
                    offset_y = 0;
            }

            this.pupil_x_left = this.eye_width_left / 2 + offset_x;
            this.pupil_y_left = this.eye_height_left / 2 + offset_y;
            this.pupil_x_right = this.eye_width_right / 2 + offset_x;
            this.pupil_y_right = this.eye_height_right / 2 + offset_y;
        }

        /**
         * Display the framebuffer
         */
        private show(): void {
            // In MakeCode, we would send this to the OLED display
            // For now, show on LED matrix (scaled down version)
            led.plotImage(this.fb);
        }
    }
}
