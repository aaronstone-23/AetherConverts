import { CATEGORIES } from "../data/units";
export const FRENZY_CHANCE = 0.4;

export function convert(value, category, from, to, frenzy){
    const units = CATEGORIES[category].units;
    let actualTo = to;
    let messedUp = false;
    
    if(frenzy && Math.random() < FRENZY_CHANCE){
        const others = Object.keys(units).filter((u) => u !== to);
        actualTo = others[Math.floor(Math.random() * others.length)];
        messedUp = true;
    }
    const result = units[actualTo].fromBase(units[from].toBase(value));
    return {result, messedUp, actualTo};
}
export function formatNumber(n){
    if(!isFinite(n)) return "-";
    if (n !== 0 && (Math.abs(n)>= 1e9 || Math.abs(n) < 1e-4)) return n.toExponential(4);
    return Number(n.toPrecision(8)).toLocaleString(undefined, { maximumFractionDigits: 8 });
}