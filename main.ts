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
function lireTemperatureSimple () {
    calculTemp = pins.analogReadPin(AnalogReadWritePin.P1)
    calculTemp = 1023 / calculTemp - 1
    calculTemp = 10000 / calculTemp
    calculTemp = calculTemp / 3950
    calculTemp = calculTemp + 1 / (25 + 273.15)
    calculTemp = 1 / calculTemp
    calculTemp = calculTemp - 273.15
    temperature = calculTemp
}
let calculTemp = 0
let temperature = 0
let T_celsius = 0
let T_kelvin = 0
let calc_log_ref = 0
let calc_log = 0
let step1 = 0
let analog = 0
let strip: neopixel.Strip = null
let nb_leds = 0
let R = 0
let Vi = 0
serial.redirectToUSB()
serial.writeLine("Hello world")
nb_leds = 120
changer_nb_leds(nb_leds)
loops.everyInterval(1000, function () {
    lireTemperaturePrecis()
    serial.writeNumber(T_celsius)
    serial.writeLine(" deg celsius")
    serial.writeNumber(R)
    serial.writeLine(" ohms")
    serial.writeNumber(analog)
    serial.writeLine(" /1024")
})
basic.forever(function () {
    strip.rotate(1)
    strip.show()
    basic.pause(1)
})
