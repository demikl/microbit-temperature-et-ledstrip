dstemp2wire.sensorError(function (errorMessage, errorCode, port) {
    err = errorMessage
})
input.onGesture(Gesture.LogoUp, function () {
    basic.showNumber(nb_leds)
})
input.onButtonPressed(Button.A, function () {
    strip.clear()
    strip.show()
    nb_leds = Math.max(1, nb_leds - 1)
    strip = neopixel.create(DigitalPin.P0, nb_leds, NeoPixelMode.RGB)
    strip.showRainbow(1, 360)
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
    strip.clear()
    strip.show()
    nb_leds = nb_leds + 1
    strip = neopixel.create(DigitalPin.P0, nb_leds, NeoPixelMode.RGB)
    strip.showRainbow(1, 360)
})
input.onGesture(Gesture.Shake, function () {
    strip.clear()
    strip.show()
    nb_leds = randint(10, 120)
    strip = neopixel.create(DigitalPin.P0, nb_leds, NeoPixelMode.RGB)
    strip.showRainbow(1, 360)
})
let temp = 0
let err = ""
let strip: neopixel.Strip = null
let nb_leds = 0
nb_leds = 120
strip = neopixel.create(DigitalPin.P0, nb_leds, NeoPixelMode.RGB)
strip.showRainbow(1, 360)
basic.forever(function () {
    strip.rotate(1)
    strip.show()
    basic.pause(1)
})
