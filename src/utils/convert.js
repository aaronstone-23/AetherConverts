import { CATEGORIES } from "../data/units";

// difficulty

export const FRENZY_CHANCE = 0.4;

// Every kind of lie the app can tell. The left side is the lie's ID,
// the right side is the text shown to the player when the lie is revealed.
// To add a new lie: add a line here AND a matching "else if" in convert() below.

export const LIE_LABELS = {
    wrongUnit: "It secretly converted into a different unit",
    powerOfTen: "The decimal point slid around (x10, x100, /10...)",
    shuffle: "The digits got scrambled",
    signFlip: "The sign got flipped",
    sneaky: "It was nudged by a few percent. Sneaky~"
};


// Pick one random item from that list pleaseeee
const pick = (list) => list[Math.floor(Math.random() * list.length)];


// Takes a number and then scrambles it digits lol
function shuffleDigits(n) {
    const text = String(Number(n.toPrecision(6)));
    if (text.includes("e")) return null;
    //how would u even scramble exponents lol 

    const chars = text.split("");
    // finding where the digits are
    const spots = [];
    chars.forEach((c, i) => {
        if (/\d/.test(c)) spots.push(i);
    });

    const digits = spots.map((i) => chars[i]);
    for (let i = digits.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    spots.forEach((spot, i) => {
        chars[spot] = digits[i];
    });

    const result = Number(chars.join(""));
    return Number.isNaN(result) ? null : result;
}


export function convert(value, category, from, to, frenzy) {
    const units = CATEGORIES[category].units;

    // lets do the real conversion here
    const base = units[from].toBase(value);
    const correct = units[to].fromBase(base);
    const honest = {
        result: correct, correct, messedUp: false, lieType: null
    };

    // if frenzy is off or the dice is honest, we done
    if (!frenzy || Math.random() >= FRENZY_CHANCE) return honest;

    // otherwise pick a lie and apply it
    const lieType = pick(Object.keys(LIE_LABELS));
    let lied;

    if (lieType === "wrongUnit") {
        const others = Object.keys(units).filter((u) => u !== to);
        lied = units[pick(others)].fromBase(base);
    } else if (lieType === "powerOfTen") {
        lied = correct * pick([10, 100, 0.1, 0.01]);
    } else if (lieType === "shuffle") {
        lied = shuffleDigits(correct) ?? correct * 1.05;
    } else if (lieType === "signFlip") {
        lied = -correct;
    } else {
        // sneaky--> off my 2% or 8% up or down lol
        lied = correct * (1 + pick([-1, 1]) * (0.02 + Math.random() * 0.06));
    }

    // if lie accidentally equals the truth, then dont count because we dont want anything unfair
    const same =
        lied == null ||
        !isFinite(lied) ||
        Math.abs(lied - correct) <= Math.abs(correct) * 1e-9;
    if (same) return honest;

    return { result: lied, correct, messedUp: true, lieType };

}


// makes numbers look prettyyyy
export function formatNumber(n) {
    if (!isFinite(n)) return "-";
    if (n !== 0 && (Math.abs(n) >= 1e9 || Math.abs(n) < 1e-4)) return n.toExponential(4);
    return Number(n.toPrecision(8)).toLocaleString(undefined, { maximumFractionDigits: 8 });
}