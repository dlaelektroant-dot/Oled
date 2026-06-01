// Rozszerzenie globalne dla obiektu Math, wymagane przez drugą bibliotekę
declare interface Math {
    floor(x: number): number;
}

// =========================================================================
// CZĘŚĆ 1: Przestrzeń nazw OLED12864_I2C (z pierwszego pliku)
// =========================================================================

//% weight=20 color=#0855AA icon="O" block="OLED12864_I2C"
namespace OLED12864_I2C {
    let font: number[] = [];
    font[0] = 0x0022d422; font[1] = 0x0022d422; font[2] = 0x0022d422; font[3] = 0x0022d422;
    font[4] = 0x0022d422; font[5] = 0x0022d422; font[6] = 0x0022d422; font[7] = 0x0022d422;
    font[8] = 0x0022d422; font[9] = 0x0022d422; font[10] = 0x0022d422; font[11] = 0x0022d422;
    font[12] = 0x0022d422; font[13] = 0x0022d422; font[14] = 0x0022d422; font[15] = 0x0022d422;
    font[16] = 0x0022d422; font[17] = 0x0022d422; font[18] = 0x0022d422; font[19] = 0x0022d422;
    font[20] = 0x0022d422; font[21] = 0x0022d422; font[22] = 0x0022d422; font[23] = 0x0022d422;
    font[24] = 0x0022d422; font[25] = 0x0022d422; font[26] = 0x0022d422; font[27] = 0x0022d422;
    font[28] = 0x0022d422; font[29] = 0x0022d422; font[30] = 0x0022d422; font[31] = 0x0022d422;
    font[32] = 0x00000000; font[33] = 0x000002e0; font[34] = 0x00018060; font[35] = 0x00afabea;
    font[36] = 0x00aed6ea; font[37] = 0x01991133; font[38] = 0x010556aa; font[39] = 0x00000060;
    font[40] = 0x000045c0; font[41] = 0x00003a20; font[42] = 0x00051140; font[43] = 0x00023880;
    font[44] = 0x00002200; font[45] = 0x00021080; font[46] = 0x00000100; font[47] = 0x00111110;
    font[48] = 0x0007462e; font[49] = 0x00087e40; font[50] = 0x000956b9; font[51] = 0x0005d629;
    font[52] = 0x008fa54c; font[53] = 0x009ad6b7; font[54] = 0x008ada88; font[55] = 0x00119531;
    font[56] = 0x00aad6aa; font[57] = 0x0022b6a2; font[58] = 0x00000140; font[59] = 0x00002a00;
    font[60] = 0x0008a880; font[61] = 0x00052940; font[62] = 0x00022a20; font[63] = 0x0022d422;
    font[64] = 0x00e4d62e; font[65] = 0x000f14be; font[66] = 0x000556bf; font[67] = 0x0008c62e;
    font[68] = 0x0007463f; font[69] = 0x0008d6bf; font[70] = 0x000094bf; font[71] = 0x00cac62e;
    font[72] = 0x000f909f; font[73] = 0x000047f1; font[74] = 0x0017c629; font[75] = 0x0008a89f;
    font[76] = 0x0008421f; font[77] = 0x01f1105f; font[78] = 0x01f4105f; font[79] = 0x0007462e;
    font[80] = 0x000114bf; font[81] = 0x000b6526; font[82] = 0x010514bf; font[83] = 0x0004d6b2;
    font[84] = 0x0010fc21; font[85] = 0x0007c20f; font[86] = 0x00744107; font[87] = 0x01f4111f;
    font[88] = 0x000d909b; font[89] = 0x00117041; font[90] = 0x0008ceb9; font[91] = 0x0008c7e0;
    font[92] = 0x01041041; font[93] = 0x000fc620; font[94] = 0x00010440; font[95] = 0x01084210;
    font[96] = 0x00000820; font[97] = 0x010f4a4c; font[98] = 0x0004529f; font[99] = 0x00094a4c;
    font[100] = 0x000fd288; font[101] = 0x000956ae; font[102] = 0x000097c4; font[103] = 0x0007d6a2;
    font[104] = 0x000c109f; font[105] = 0x000003a0; font[106] = 0x0006c200; font[107] = 0x0008289f;
    font[108] = 0x000841e0; font[109] = 0x01e1105e; font[110] = 0x000e085e; font[111] = 0x00064a4c;
    font[112] = 0x0002295e; font[113] = 0x000f2944; font[114] = 0x0001085c; font[115] = 0x00012a90;
    font[116] = 0x010a51e0; font[117] = 0x010f420e; font[118] = 0x00644106; font[119] = 0x01e8221e;
    font[120] = 0x00093192; font[121] = 0x00222292; font[122] = 0x00095b52; font[123] = 0x0008fc80;
    font[124] = 0x000003e0; font[125] = 0x000013f1; font[126] = 0x00841080; font[127] = 0x0022d422;

    let _I2CAddr = 0;
    let _screen = pins.createBuffer(1025);
    let _buf2 = pins.createBuffer(2);
    let _buf3 = pins.createBuffer(3);
    let _buf4 = pins.createBuffer(4);
    let _ZOOM = 1;

    function cmd1(d: number) {
        let n = d % 256;
        pins.i2cWriteNumber(_I2CAddr, n, NumberFormat.UInt16BE);
    }

    function cmd2(d1: number, d2: number) {
        _buf3[0] = 0;
        _buf3[1] = d1;
        _buf3[2] = d2;
        pins.i2cWriteBuffer(_I2CAddr, _buf3);
    }

    function cmd3(d1: number, d2: number, d3: number) {
        _buf4[0] = 0;
        _buf4[1] = d1;
        _buf4[2] = d2;
        _buf4[3] = d3;
        pins.i2cWriteBuffer(_I2CAddr, _buf4);
    }

    function set_pos(col: number = 0, page: number = 0) {
        cmd1(0xb0 | page)
        let c = col * (_ZOOM + 1)
        cmd1(0x00 | (c % 16))
        cmd1(0x10 | (c >> 4))
    }

    function clrbit(d: number, b: number): number {
        if (d & (1 << b))
            d -= (1 << b)
        return d
    }

    //% blockId="OLED12864_I2C_PIXEL" block="set pixel at x %x|y %y|color %color"
    //% weight=70 blockGap=8 parts=OLED12864_I2C trackArgs=0
    export function pixel(x: number, y: number, color: number = 1) {
        let page = y >> 3
        let shift_page = y % 8
        let ind = x * (_ZOOM + 1) + page * 128 + 1
        let b = (color) ? (_screen[ind] | (1 << shift_page)) : clrbit(_screen[ind], shift_page)
        _screen[ind] = b
        set_pos(x, page)
        if (_ZOOM) {
            _screen[ind + 1] = b
            _buf3[0] = 0x40
            _buf3[1] = _buf3[2] = b
            pins.i2cWriteBuffer(_I2CAddr, _buf3)
        } else {
            _buf2[0] = 0x40
            _buf2[1] = b
            pins.i2cWriteBuffer(_I2CAddr, _buf2)
        }
    }

    //% blockId="OLED12864_I2C_SHOWSTRING" block="show string at x %x|y %y|text %s|color %color"
    //% weight=80 blockGap=8 parts=OLED12864_I2C trackArgs=0
    export function showString(x: number, y: number, s: string, color: number = 1) {
        let col = 0
        let p = 0
        let ind = 0
        for (let n = 0; n < s.length; n++) {
            p = font[s.charCodeAt(n)]
            for (let i = 0; i < 5; i++) {
                col = 0
                for (let j = 0; j < 5; j++) {
                    if (p & (1 << (5 * i + j)))
                        col |= (1 << (j + 1))
                }
                ind = (x + n) * 5 * (_ZOOM + 1) + y * 128 + i * (_ZOOM + 1) + 1
                if (color == 0)
                    col = 255 - col
                _screen[ind] = col
                if (_ZOOM)
                    _screen[ind + 1] = col
            }
        }
        set_pos(x * 5, y)
        let ind0 = x * 5 * (_ZOOM + 1) + y * 128
        let buf = _screen.slice(ind0, ind + 1)
        buf[0] = 0x40
        pins.i2cWriteBuffer(_I2CAddr, buf)
    }

    //% blockId="OLED12864_I2C_NUMBER" block="show a Number at x %x|y %y|number %num|color %color"
    //% weight=80 blockGap=8 parts=OLED12864_I2C trackArgs=0
    export function showNumber(x: number, y: number, num: number, color: number = 1) {
        showString(x, y, num.toString(), color)
    }

    //% blockId="OLED12864_I2C_HLINE" block="draw a horizontal line at x %x|y %y|number %len|color %color"
    //% weight=71 blockGap=8 parts=OLED12864_I2C trackArgs=0
    export function hline(x: number, y: number, len: number, color: number = 1) {
        for (let i = x; i < (x + len); i++)
            pixel(i, y, color)
    }

    //% blockId="OLED12864_I2C_VLINE" block="draw a vertical line at x %x|y %y|number %len|color %color"
    //% weight=72 blockGap=8 parts=OLED12864_I2C trackArgs=0
    export function vline(x: number, y: number, len: number, color: number = 1) {
        for (let i = y; i < (y + len); i++)
            pixel(x, i, color)
    }

    //% blockId="OLED12864_I2C_RECT" block="draw a rectangle at x1 %x1|y1 %y1|x2 %x2|y2 %y2|color %color"
    //% weight=73 blockGap=8 parts=OLED12864_I2C trackArgs=0
    export function rect(x1: number, y1: number, x2: number, y2: number, color: number = 1) {
        if (x1 > x2) x1 = [x2, x2 = x1][0];
        if (y1 > y2) y1 = [y2, y2 = y1][0];
        hline(x1, y1, x2 - x1 + 1, color)
        hline(x1, y2, x2 - x1 + 1, color)
        vline(x1, y1, y2 - y1 + 1, color)
        vline(x2, y1, y2 - y1 + 1, color)
    }

    //% blockId="OLED12864_I2C_INVERT" block="invert display %d"
    //% weight=65 blockGap=8 parts=OLED12864_I2C trackArgs=0
    export function invert(d: boolean = true) {
        let n = (d) ? 0xA7 : 0xA6
        cmd1(n)
    }

    //% blockId="OLED12864_I2C_DRAW" block="draw"
    //% weight=64 blockGap=8 parts=OLED12864_I2C trackArgs=0
    export function draw() {
        set_pos()
        pins.i2cWriteBuffer(_I2CAddr, _screen)
    }

    //% blockId="OLED12864_I2C_CLEAR" block="clear"
    //% weight=63 blockGap=8 parts=OLED12864_I2C trackArgs=0
    export function clear() {
        _screen.fill(0)
        _screen[0] = 0x40
        draw()
    }

    //% blockId="OLED12864_I2C_ON" block="turn on"
    //% weight=62 blockGap=8 parts=OLED12864_I2C trackArgs=0
    export function on() {
        cmd1(0xAF)
    }

    //% blockId="OLED12864_I2C_OFF" block="turn off"
    //% weight=61 blockGap=8 parts=OLED12864_I2C trackArgs=0
    export function off() {
        cmd1(0xAE)
    }

    //% blockId="OLED12864_I2C_ZOOM" block="zoom %d"
    //% weight=60 blockGap=8 parts=OLED12864_I2C trackArgs=0
    export function zoom(d: boolean = true) {
        _ZOOM = (d) ? 1 : 0
        cmd2(0xd6, _ZOOM)
    }

    //% blockId="OLED12864_I2C_init" block="init OLED with addr %addr"
    //% weight=100 blockGap=8 parts=OLED12864_I2C trackArgs=0
    export function init(addr: number) {
        _I2CAddr = addr;
        cmd1(0xAE)       // SSD1306_DISPLAYOFF
        cmd1(0xA4)       // SSD1306_DISPLAYALLON_RESUME
        cmd2(0xD5, 0xF0) // SSD1306_SETDISPLAYCLOCKDIV
        cmd2(0xA8, 0x3F) // SSD1306_SETMULTIPLEX
        cmd2(0xD3, 0x00) // SSD1306_SETDISPLAYOFFSET
        cmd1(0 | 0x0)    // line #SSD1306_SETSTARTLINE
        cmd2(0x8D, 0x14) // SSD1306_CHARGEPUMP
        cmd2(0x20, 0x00) // SSD1306_MEMORYMODE
        cmd3(0x21, 0, 127) // SSD1306_COLUMNADDR
        cmd3(0x22, 0, 63)  // SSD1306_PAGEADDR
        cmd1(0xa0 | 0x1) // SSD1306_SEGREMAP
        cmd1(0xc8)       // SSD1306_COMSCANDEC
        cmd2(0xDA, 0x12) // SSD1306_SETCOMPINS
        cmd2(0x81, 0xCF) // SSD1306_SETCONTRAST
        cmd2(0xd9, 0xF1) // SSD1306_SETPRECHARGE
        cmd2(0xDB, 0x40) // SSD1306_SETVCOMDETECT
        cmd1(0xA6)       // SSD1306_NORMALDISPLAY
        cmd2(0xD6, 1)    // zoom on
        cmd1(0xAF)       // SSD1306_DISPLAYON
        clear()
        _ZOOM = 1
    }
}

// =========================================================================
// CZĘŚĆ 2: Przestrzeń nazw OLED (z drugiego pliku)
// =========================================================================

//% color=#27b0ba icon="\uf26c"
namespace OLED {
    let font: Buffer;

    const SSD1306_SETCONTRAST = 0x81
    const SSD1306_SETCOLUMNADRESS = 0x21
    const SSD1306_SETPAGEADRESS = 0x22
    const SSD1306_DISPLAYALLON_RESUME = 0xA4
    const SSD1306_DISPLAYALLON = 0xA5
    const SSD1306_NORMALDISPLAY = 0xA6
    const SSD1306_INVERTDISPLAY = 0xA7
    const SSD1306_DISPLAYOFF = 0xAE
    const SSD1306_DISPLAYON = 0xAF
    const SSD1306_SETDISPLAYOFFSET = 0xD3
    const SSD1306_SETCOMPINS = 0xDA
    const SSD1306_SETVCOMDETECT = 0xDB
    const SSD1306_SETDISPLAYCLOCKDIV = 0xD5
    const SSD1306_SETPRECHARGE = 0xD9
    const SSD1306_SETMULTIPLEX = 0xA8
    const SSD1306_SETLOWCOLUMN = 0x00
    const SSD1306_SETHIGHCOLUMN = 0x10
    const SSD1306_SETSTARTLINE = 0x40
    const SSD1306_MEMORYMODE = 0x20
    const SSD1306_COMSCANINC = 0xC0
    const SSD1306_COMSCANDEC = 0xC8
    const SSD1306_SEGREMAP = 0xA0
    const SSD1306_CHARGEPUMP = 0x8D
    const chipAdress = 0x3C
    const xOffset = 0
    const yOffset = 0
    let charX = 0
    let charY = 0
    let displayWidth = 128
    let displayHeight = 64 / 8
    let screenSize = 0
    let loadStarted: boolean;
    let loadPercent: number;

    function command(cmd: number) {
        let buf = pins.createBuffer(2)
        buf[0] = 0x00
        buf[1] = cmd
        pins.i2cWriteBuffer(chipAdress, buf, false)
    }

    //% block="clear OLED display"
    //% weight=3
    export function clear() {
        loadStarted = false
        loadPercent = 0
        command(SSD1306_SETCOLUMNADRESS)
        command(0x00)
        command(displayWidth - 1)
        command(SSD1306_SETPAGEADRESS)
        command(0x00)
        command(displayHeight - 1)
        let data = pins.createBuffer(17);
        data[0] = 0x40;
        for (let i = 1; i < 17; i++) {
            data[i] = 0x00
        }
        for (let i = 0; i < screenSize; i += 16) {
            pins.i2cWriteBuffer(chipAdress, data, false)
        }
        charX = xOffset
        charY = yOffset
    }

    function drawLoadingFrame() {
        command(SSD1306_SETCOLUMNADRESS)
        command(0x00)
        command(displayWidth - 1)
        command(SSD1306_SETPAGEADRESS)
        command(0x00)
        command(displayHeight - 1)
        let data = pins.createBuffer(17);
        data[0] = 0x40;
        let i = 1
        for (let page = 0; page < displayHeight; page++) {
            for (let col = 0; col < displayWidth; col++) {
                if (page === 3 && col > 12 && col < displayWidth - 12) {
                    data[i] = 0x60
                } else if (page === 5 && col > 12 && col < displayWidth - 12) {
                    data[i] = 0x06
                } else if (page === 4 && (col === 12 || col === 13 || col === displayWidth - 12 || col === displayWidth - 13)) {
                    data[i] = 0xFF
                } else {
                    data[i] = 0x00
                }
                if (i === 16) {
                    pins.i2cWriteBuffer(chipAdress, data, false)
                    i = 1
                } else {
                    i++
                }
            }
        }
        charX = 30
        charY = 2
        writeString("Loading:")
    }

    function drawLoadingBar(percent: number) {
        charX = 78
        charY = 2
        let num = Math.floor(percent)
        writeNum(num)
        writeString("%")
        let width = displayWidth - 14 - 13
        let lastStart = width * (loadPercent / displayWidth)
        command(SSD1306_SETCOLUMNADRESS)
        command(14 + lastStart)
        command(displayWidth - 13)
        command(SSD1306_SETPAGEADRESS)
        command(4)
        command(5)
        let data = pins.createBuffer(2);
        data[0] = 0x40;
        data[1] = 0x7E
        for (let i = lastStart; i < width * (Math.floor(percent) / 100); i++) {
            pins.i2cWriteBuffer(chipAdress, data, false)
        }
        loadPercent = num
    }

    //% block="draw loading bar at $percent percent"
    //% percent.min=0 percent.max=100
    //% weight=2
    export function drawLoading(percent: number) {
        if (loadStarted) {
            drawLoadingBar(percent)
        } else {
            drawLoadingFrame()
            drawLoadingBar(percent)
            loadStarted = true
        }
    }

    //% block="show (without newline) string $str"
    //% weight=6
    export function writeString(str: string) {
        for (let i = 0; i < str.length; i++) {
            if (charX > displayWidth - 6) {
                newLine()
            }
            drawChar(charX, charY, str.charAt(i))
            charX += 6
        }
    }

    //% block="show (without newline) number $n"
    //% weight=5
    export function writeNum(n: number) {
        let numString = n.toString()
        writeString(numString)
    }

    //% block="show string $str"
    //% weight=8
    export function writeStringNewLine(str: string) {
        writeString(str)
        newLine()
    }

    //% block="show number $n"
    //% weight=7
    export function writeNumNewLine(n: number) {
        writeNum(n)
        newLine()
    }

    //% block="insert newline"
    //% weight=4
    export function newLine() {
        charY++
        charX = xOffset
    }

    function drawChar(x: number, y: number, c: string) {
        command(SSD1306_SETCOLUMNADRESS)
        command(x)
        command(x + 5)
        command(SSD1306_SETPAGEADRESS)
        command(y)
        command(y + 1)
        let line = pins.createBuffer(2)
        line[0] = 0x40
        for (let i = 0; i < 6; i++) {
            if (i === 5) {
                line[1] = 0x00
            } else {
                let charIndex = c.charCodeAt(0)
                let charNumber = font.getNumber(NumberFormat.UInt8BE, 5 * charIndex + i)
                line[1] = charNumber
            }
            pins.i2cWriteBuffer(chipAdress, line, false)
        }
    }

    function drawShape(pixels: Array<Array<number>>) {
        let x1 = displayWidth
        let y1 = displayHeight * 8
        let x2 = 0
        let y2 = 0
        for (let i = 0; i < pixels.length; i++) {
            if (pixels[i][0] < x1) x1 = pixels[i][0]
            if (pixels[i][0] > x2) x2 = pixels[i][0]
            if (pixels[i][1] < y1) y1 = pixels[i][1]
            if (pixels[i][1] > y2) y2 = pixels[i][1]
        }
        let page1 = Math.floor(y1 / 8)
        let page2 = Math.floor(y2 / 8)
        let line = pins.createBuffer(2)
        line[0] = 0x40
        for (let x = x1; x <= x2; x++) {
            for (let page = page1; page <= page2; page++) {
                line[1] = 0x00
                for (let i = 0; i < pixels.length; i++) {
                    if (pixels[i][0] === x) {
                        if (Math.floor(pixels[i][1] / 8) === page) {
                            line[1] |= Math.pow(2, (pixels[i][1] % 8))
                        }
                    }
                }
                if (line[1] !== 0x00) {
                    command(SSD1306_SETCOLUMNADRESS)
                    command(x)
                    command(x + 1)
                    command(SSD1306_SETPAGEADRESS)
                    command(page)
                    command(page + 1)
                    pins.i2cWriteBuffer(chipAdress, line, false)
                }
            }
        }
    }

    //% block="draw line from:|x: $x0 y: $y0 to| x: $x1 y: $y1"
    //% x0.defl=0 y0.defl=0 x1.defl=20 y1.defl=20
    //% weight=1
    export function drawLine(x0: number, y0: number, x1: number, y1: number) {
        let pixels: Array<Array<number>> = []
        let kx: number, ky: number, c: number, i: number, xx: number, yy: number, dx: number, dy: number;
        let targetX = x1
        let targetY = y1
        x1 -= x0; kx = 0; if (x1 > 0) kx = +1; if (x1 < 0) { kx = -1; x1 = -x1; } x1++;
        y1 -= y0; ky = 0; if (y1 > 0) ky = +1; if (y1 < 0) { ky = -1; y1 = -y1; } y1++;
        if (x1 >= y1) {
            c = x1
            for (i = 0; i < x1; i++ , x0 += kx) {
                pixels.push([x0, y0])
                c -= y1; if (c <= 0) { if (i != x1 - 1) pixels.push([x0 + kx, y0]); c += x1; y0 += ky; if (i != x1 - 1) pixels.push([x0, y0]); }
                if (pixels.length > 20) {
                    drawShape(pixels)
                    pixels = []
                    drawLine(x0, y0, targetX, targetY)
                    return
                }
            }
        } else {
            c = y1
            for (i = 0; i < y1; i++ , y0 += ky) {
                pixels.push([x0, y0])
                c -= x1; if (c <= 0) { if (i != y1 - 1) pixels.push([x0, y0 + ky]); c += y1; x0 += kx; if (i != y1 - 1) pixels.push([x0, y0]); }
                if (pixels.length > 20) {
                    drawShape(pixels)
                    pixels = []
                    drawLine(x0, y0, targetX, targetY)
                    return
                }
            }
        }
        drawShape(pixels)
    }

    //% block="draw rectangle from:|x: $x0 y: $y0 to| x: $x1 y: $y1"
    //% x0.defl=0 y0.defl=0 x1.defl=20 y1.defl=20
    //% weight=0
    export function drawRectangle(x0: number, y0: number, x1: number, y1: number) {
        drawLine(x0, y0, x1, y0)
        drawLine(x0, y1, x1, y1)
        drawLine(x0, y0, x0, y1)
        drawLine(x1, y0, x1, y1)
    }

    //% block="draw circle at x: $x y: $y radius: $r"
    //% x.defl=64 y.defl=32 r.defl=10
    //% weight=0
    export function drawCircle(x: number, y: number, r: number) {
        let theta = 0;
        let step = Math.PI / 90;
    