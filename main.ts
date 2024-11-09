input.onGesture(Gesture.LogoUp, function () {
    basic.showNumber(nb_leds)
})
input.onButtonPressed(Button.A, function () {
    strip.clear()
    strip.show()
    nb_leds = Math.max(20, nb_leds - 1)
    strip = neopixel.create(DigitalPin.P0, nb_leds, NeoPixelMode.RGB)
    strip.showRainbow(1, 360)
})
input.onButtonPressed(Button.B, function () {
    strip.clear()
    strip.show()
    nb_leds = Math.max(20, nb_leds + 1)
    strip = neopixel.create(DigitalPin.P0, nb_leds, NeoPixelMode.RGB)
    strip.showRainbow(1, 360)
})
let strip: neopixel.Strip = null
let nb_leds = 0
nb_leds = 120
strip = neopixel.create(DigitalPin.P0, nb_leds, NeoPixelMode.RGB)
strip.showRainbow(1, 360)
basic.forever(function () {
    strip.rotate(1)
    strip.show()
    basic.pause(100)
})
