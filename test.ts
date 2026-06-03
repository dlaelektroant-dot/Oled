// Test blocks
let roboEyes = RoboEyesOLED.createRoboEyes()
roboEyes.setAutoBlinking(true, 3, 2)
roboEyes.setIdleMode(true, 2, 2)
roboEyes.setMood(RoboEyesOLED.Mood.DEFAULT)

basic.forever(function () {
    roboEyes.update()
})
