// Test example
roboeyesOLED.initialize();
roboeyesOLED.setAutoBlinking(true, 3, 2);
roboeyesOLED.setIdleMode(true, 2, 2);
roboeyesOLED.setMood(roboeyesOLED.Mood.Happy);

basic.forever(function () {
    roboeyesOLED.update();
});
