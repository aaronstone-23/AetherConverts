import { useState, useEffect } from "react";
import { CATEGORIES } from "../data/units";
import { convert, formatNumber } from "../utils/convert";

export default function Converter({frenzy}) {
    const [category, setCategory] = useState("length");
    const [value, setValue] = useState(1);
    const unikeys = Object.keys(CATEGORIES[category].units);
    const [from, setFrom] = useState(unikeys[0]);
    const [to, setTo] = useState(unikeys[1]);
    const [out, setOut] = useState({result: 0, messedUp: false});
    const [tick, setTick] = useState(0); //uhhhh... will lets the result re-roll on demand okay!! ALSO THIS B***HY CO-PILOT IN VS CODE IS ANNNOYING!!

    const changeCategory = (c) => {
        const keys = Object.keys(CATEGORIES[c].units);
        setCategory(c);
        setFrom(keys[0]);
        setTo(keys[1]);
    };

    const swap = () => { setFrom(to); setTo(from); };

    useEffect(() => {
        const v = parseFloat(value);
        if(!isNaN(v)) return setOut({ result: NaN, messedUp: false });
        setOut(convert(v, category, from, to, frenzy));
    }, [value, category, from, to, frenzy, tick]);

    const units = CATEGORIES[category].units;

    return (
        <div className="card">
            <div className = "tabs">
                {Object.keys(CATEGORIES).map(([key,c]) => (
                    <button
                        key={key}
                        className={`tab ${key === category ? "tab--active" : ""}`}
                        onClick={() => changeCategory(key)}>
                            <span>{c.icon}</span> {c.label}
                    </button>
                ))}
             </div>
             <div className = "row">
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <select className = "select" value={from} onChange={(e) => setFrom(e.target.value)}>
                    {Object.entries(units).map(([k, u]) => (
                        <option key={k} value={k}>{u.name}</option>
                    ))}
                 </select>
             </div>
             <button className = "swap" onClick={swap} aria-label="Swap units">⇅</button>
            
            <div className = "row">
                <div
                key = {tick + String(out.result)}
                className = {`output ${out.messedUp ? "output--glitch" : ""}`}
                onClick = {() => frenzy && setTick((t) => t + 1)}
                title = {frenzy ? "Click to re-roll": ""}
                >
                    {formatNumber(out.result)}
                </div>
                <select className = "select" value ={to} onChange={(e) => setTo(e.target.value)}>
                    {Object.entries(units).map(([k, u]) => (
                        <option key={k} value={k}>{u.name} ({k})</option>
                    ))}
                    {/* I ABSOLUTELY HATE BRACKETS NOWWW T_T IN BOTH MATHS AND REACT!!!! */}
                </select>
            </div>
            {frenzy && <p className = "hint"> 40% of the time you would be gaslighted~ （￣︶￣）↗　 </p>}
        </div>
    );
}