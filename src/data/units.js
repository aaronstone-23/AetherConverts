import {
    Ruler,
    Scale,
    Thermometer,
    FlaskConical,
    Hourglass,
    Gauge,
    HardDrive,
    Sparkles,
} from "lucide-react";

// Linear units: multiply by `factor` to get the base unit
const lin = (factor) => ({
    toBase: (v) => v * factor,
    fromBase: (v) => v / factor,
});

export const CATEGORIES = {
    length: {
        label: "Length",
        icon: Ruler,
        units: {
            pm: { name: "Picometer", ...lin(1e-12) },
            A: { name: "Angstrom", ...lin(1e-10) },
            nm: { name: "Nanometer", ...lin(1e-9) },
            um: { name: "Micrometer", ...lin(1e-6) },
            mm: { name: "Millimeter", ...lin(0.001) },
            cm: { name: "Centimeter", ...lin(0.01) },
            m: { name: "Meter", ...lin(1) },
            km: { name: "Kilometer", ...lin(1000) },
            in: { name: "Inch", ...lin(0.0254) },
            ft: { name: "Foot", ...lin(0.3048) },
            yd: { name: "Yard", ...lin(0.9144) },
            mi: { name: "Mile", ...lin(1609.344) },
            nmi: { name: "Nautical Mile", ...lin(1852) },
            au: { name: "Astronomical Unit", ...lin(149597870700) },
            ly: { name: "Light Year", ...lin(9.4607304725808e15) },
        },
    },

    mass: {
        label: "Mass",
        icon: Scale,
        units: {
            mg: { name: "Milligram", ...lin(1e-6) },
            g: { name: "Gram", ...lin(0.001) },
            kg: { name: "Kilogram", ...lin(1) },
            t: { name: "Tonne", ...lin(1000) },
            oz: { name: "Ounce", ...lin(0.028349523) },
            lb: { name: "Pound", ...lin(0.45359237) },
            st: { name: "Stone", ...lin(6.35029318) },
            Msun: { name: "Solar Mass", ...lin(1.98847e30) },
        },
    },

    temperature: {
        label: "Temperature",
        icon: Thermometer,
        units: {
            C: { name: "Celsius", toBase: (v) => v, fromBase: (v) => v },
            F: {
                name: "Fahrenheit",
                toBase: (v) => ((v - 32) * 5) / 9,
                fromBase: (v) => (v * 9) / 5 + 32,
            },
            K: {
                name: "Kelvin",
                toBase: (v) => v - 273.15,
                fromBase: (v) => v + 273.15,
            },
        },
    },

    volume: {
        label: "Volume",
        icon: FlaskConical,
        units: {
            ml: { name: "Milliliter", ...lin(0.001) },
            l: { name: "Liter", ...lin(1) },
            tsp: { name: "Teaspoon", ...lin(0.00492892) },
            tbsp: { name: "Tablespoon", ...lin(0.0147868) },
            cup: { name: "Cup (US)", ...lin(0.236588) },
            pt: { name: "Pint (US)", ...lin(0.473176) },
            gal: { name: "Gallon (US)", ...lin(3.78541) },
        },
    },

    time: {
        label: "Time",
        icon: Hourglass,
        units: {
            s: { name: "Second", ...lin(1) },
            min: { name: "Minute", ...lin(60) },
            h: { name: "Hour", ...lin(3600) },
            d: { name: "Day", ...lin(86400) },
            wk: { name: "Week", ...lin(604800) },
            mo: { name: "Month", ...lin(2629800) },
            yr: { name: "Year", ...lin(31557600) },
        },
    },

    speed: {
        label: "Speed",
        icon: Gauge,
        units: {
            "m/s": { name: "Meters / sec", ...lin(1) },
            "km/h": { name: "Kilometers / hour", ...lin(1 / 3.6) },
            mph: { name: "Miles / hour", ...lin(0.44704) },
            kn: { name: "Knots", ...lin(0.514444) },
            mach: { name: "Mach", ...lin(343) },
        },
    },

    data: {
        label: "Data",
        icon: HardDrive,
        units: {
            B: { name: "Byte", ...lin(1) },
            KB: { name: "Kilobyte", ...lin(1e3) },
            MB: { name: "Megabyte", ...lin(1e6) },
            GB: { name: "Gigabyte", ...lin(1e9) },
            TB: { name: "Terabyte", ...lin(1e12) },
            KiB: { name: "Kibibyte", ...lin(1024) },
            MiB: { name: "Mebibyte", ...lin(1024 ** 2) },
            GiB: { name: "Gibibyte", ...lin(1024 ** 3) },
            TiB: { name: "Tebibyte", ...lin(1024 ** 4) },
        },
    },

    //   Absurdddd lengghts, Base unit -->meter, each num-->how many meters?
    // The first two units listedn became the default "from" and "to" when you click the tab.
    chaos: {
        label: "Chaos",
        icon: Sparkles,
        units: {
            m: { name: "Meter", ...lin(1) },
            banana: { name: "Banana", ...lin(0.18) },
            cat: { name: "Average Cat", ...lin(0.46) },
            bus: { name: "School Bus", ...lin(12) },
            whale: { name: "Blue Whale", ...lin(25) },
            field: { name: "Football Field", ...lin(109.7) },
            eiffel: { name: "Eiffel Tower", ...lin(330) },
            km: { name: "kilometer", ...lin(1000) },
            ft: { name: "foot", ...lin(0.3048) },
        },
    },
};