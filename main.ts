function changer_nb_leds (nb: number) {
    if (strip) {
        strip.clear()
        strip.show()
    }
    strip = neopixel.create(DigitalPin.P0, nb, NeoPixelMode.RGB)
    strip.showRainbow(1, 360)
    nb_leds = nb
}
dstemp2wire.sensorError(function (errorMessage, errorCode, port) {
    err = errorMessage
})
input.onGesture(Gesture.LogoUp, function () {
    basic.showNumber(nb_leds)
})
input.onButtonPressed(Button.A, function () {
    changer_nb_leds(Math.max(1, nb_leds - 1))
})
input.onGesture(Gesture.TiltRight, function () {
    temp = dstemp2wire.celsius(DigitalPin.P2)
    if (temp > -300) {
        basic.showNumber(temp)
    } else {
        basic.showString(err)
    }
})
input.onButtonPressed(Button.B, function () {
    changer_nb_leds(nb_leds + 1)
})
input.onGesture(Gesture.Shake, function () {
    changer_nb_leds(randint(10, 120))
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    changer_nb_leds(120)
    music.play(music.builtinPlayableSoundEffect(soundExpression.twinkle), music.PlaybackMode.InBackground)
})
let temp = 0
let err = ""
let strip: neopixel.Strip = null
let nb_leds = 0
nb_leds = 120
changer_nb_leds(nb_leds)
basic.forever(function () {
    strip.rotate(1)
    strip.show()
    basic.pause(1)
})
