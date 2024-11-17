function changer_nb_leds (nb: number) {
    if (strip) {
        strip.clear()
        strip.show()
    }
    strip = neopixel.create(DigitalPin.P0, nb, NeoPixelMode.RGB)
    strip.showRainbow(1, 360)
    nb_leds = nb
}
function lireTemperaturePrecis () {
    analog = pins.analogReadPin(AnalogPin.P1)
    R = analog * 10000 / (1023 - analog)
    step1 = 1 / (273.15 + 25)
    calc_log = Math.log(R / 10000.0) / Math.log(10)
    calc_log_ref = calc_log / 3950
    T_kelvin = 1 / (step1 + calc_log_ref)
    T_celsius = T_kelvin - 273.15
    temperature = T_celsius
}
input.onGesture(Gesture.LogoUp, function () {
    basic.showNumber(nb_leds)
})
input.onButtonPressed(Button.A, function () {
    changer_nb_leds(Math.max(1, nb_leds - 1))
})
input.onGesture(Gesture.TiltRight, function () {
    lireTemperaturePrecis()
    basic.showNumber(temperature)
})
input.onGesture(Gesture.TiltLeft, function () {
    basic.showNumber(pins.analogReadPin(AnalogReadWritePin.P1))
})
input.onButtonPressed(Button.AB, function () {
    modeThermomètre = !(modeThermomètre)
    if (modeThermomètre) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showIcon(IconNames.EighthNote)
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
let temperature = 0
let T_celsius = 0
let T_kelvin = 0
let calc_log_ref = 0
let calc_log = 0
let step1 = 0
let analog = 0
let strip: neopixel.Strip = null
let modeThermomètre = false
let nb_leds = 0
let Vi = 0
let R = 0
serial.redirectToUSB()
serial.writeLine("Hello world")
nb_leds = 120
changer_nb_leds(nb_leds)
led.plotBarGraph(
1023,
1023
)
modeThermomètre = true
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    if (modeThermomètre) {
        lireTemperaturePrecis()
        strip.showBarGraph(Math.map(T_celsius, 23, 27, 0, 255), 255)
    }
    basic.pause(20)
})
basic.forever(function () {
    if (!(modeThermomètre)) {
        strip.showBarGraph(input.soundLevel(), 255)
    }
})
