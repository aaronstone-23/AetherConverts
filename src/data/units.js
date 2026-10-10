const lin = (factor) => ({
    toBase: (v) => v * factor,
    fromBase: (v) => v / factor,
});

export const CATEGORIES = {
    length: {
        label:"Length", icon: "📏",
        units: {
            mm: {name: "Millimeter", ...lin(0.001) },
            cm: {name: "Centimeter", ...lin(0.01) },
            m: {name: "Meter", ...lin(1) },
            km: {name: "Kilometer", ...lin(1000) },
            in: {name: "Inch", ...lin(0.0254) },
            ft: {name: "Foot", ...lin(0.3048) },
            yd: {name: "Yard", ...lin(0.9144)},
            mi: {name: "Mile", ...lin(1609.344)},
            nmi: {name: "Nautical Mile", ...lin(1852) },
            Au: {name: "Astronomical Unit", ...lin(149597870700) },
            Ly: {name: "Light Year", ...lin(9460730472580800) },
            um: {name: "Micrometer", ...lin(0.000001) },
            nm: {name: "Nanometer", ...lin(0.000000001) },
            A: {name: "Angstrom", ...lin(0.0000000001) },
            pm: {name: "Picometer", ...lin(0.000000000001) },

        },
    },
    mass:{
        label: "Mass", icon: "⚖️",
        units: {
            mg: {name: "Milligram", ...lin(0.000001) },
            g: {name: "Gram", ...lin(0.001) },
            kg: {name: "Kilogram", ...lin(1) },
            t: {name: "Tonne", ...lin(1000) },
            oz: {name: "Ounce", ...lin(0.0283495) },
            lb: {name: "Pound", ...lin(0.453592) },
            st: {name: "Stone", ...lin(6.35029) },
            Sm: {name: "Solar Mass", ...lin(1.98847e30) },
        },
    },
    temperature: {
        label: "Temperature", icon: "🌡️",
        units: {
            C: {name: "Celsius",
                toBase: (v) => v,
                fromBase: (v) => v,
            },
            F: {name: "Fahrenheit",
                toBase: (v) => (v - 32) * 5/9,
                fromBase: (v) => v * 9/5 + 32,
            },
            K: {name: "Kelvin",
                toBase: (v) => v - 273.15,
                fromBase: (v) => v + 273.15,
            },
        },
    },
    volume: {
        label: "Volume", icon: "🧪",
        units: {
            ml: {name: "Milliliter", ...lin(0.001) },
            l: {name: "Liter", ...lin(1) },
            tsp: {name: "Teaspoon", ...lin(0.00492892) },
            tbsp: {name: "Tablespoon", ...lin(0.0147868) },
            cup: {name: "Cup", ...lin(0.24) },
            pt: {name: "Pint", ...lin(0.473176) },
            gal: {name: "Gallon", ...lin(3.78541) },
        },
    },
    time: {
        label: "Time", icon: "⏱️",
        units: {
            s: {name: "Second", ...lin(1) },
            min: {name: "Minute", ...lin(60) },
            h: {name: "Hour", ...lin(3600) },
            d: {name: "Day", ...lin(86400) },
            wk: {name: "Week", ...lin(604800) },
            mo: {name: "Month", ...lin(2629800) },
            yr: {name: "Year", ...lin(31557600) },
        },
    },
    speed: {
        label: "Speed", icon: "🏎️",
        units: {
            "m/s": {name: "Meters / sec", ...lin(1) },
            "km/h": {name: "Kilometers / hour", ...lin(0.277778) },
            mph: {name: "Miles / hour", ...lin(0.44704) },
            kn: {name: "Knots", ...lin(0.514444) },
            mach: {name: "Mach", ...lin(343) },
        }
    },
    data: {
        label: "Data", icon: "💾",
        units: {
            B: {name: "Byte", ...lin(1) },
            KB: {name: "Kilobyte", ...lin(1024) },
            MB: {name: "Megabyte", ...lin(1048576) },
            GB: {name: "Gigabyte", ...lin(1073741824) },
            TB: {name: "Terabyte", ...lin(1099511627776) },
            GiB: {name: "Gibibyte", ...lin(1073741824) },
        }
    },
};