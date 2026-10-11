import { useState, useEffect } from "react";
import { ArrowUpDown, ArrowRight, ShieldCheck, ShieldAlert } from "lucide-react";
import { CATEGORIES } from "../data/units";
import { convert, formatNumber, LIE_LABELS } from "../utils/convert";
import "../game.css";

export default function Converter({ frenzy }) {
    // ------STATEEEE---------
    // it is the app memory. when any of these changes react redraws the screen!!
    const [category, setCategory] = useState("length");
    const [value, setValue] = useState(1);
    const unitKeys = Object.keys(CATEGORIES[category].units);
    const [from, setFrom] = useState(unitKeys[0]);
    const [to, setTo] = useState(unitKeys[1]);
    const [out, setOut] = useState({ result: 0, correct: 0, messedUp: false, lieType: null });
    const [tick, setTick] = useState(0); // lets the result re-roll on demand

    // ---------GAMEEEE STATEEEE--------------
    const [guess, setGuess] = useState(null); // null= no guess, otherwise "legit" or "liar"
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    // the best streak will be stored (localstroage) so it survives a refresh T-T and doesn't go extinct

    const [bestStreak, setBestStreak] = useState(
        () => Number(localStorage.getItem("beststreak")) || 0

    );

    // ------- DERIVED VALUESS--------
    const revealed = guess !== null;
    const wasRight = revealed && (guess === "liar") == out.messedUp;
    const canPlay = frenzy && Number.isFinite(out.result);
    const units = CATEGORIES[category].units;

    // -------ACTIONS--------


    const changeCategory = (c) => {
        const keys = Object.keys(CATEGORIES[c].units);
        setCategory(c);
        setFrom(keys[0]);
        setTo(keys[1]);
    };

    const swap = () => {
        setFrom(to);
        setTo(from);
    };

    const handleGuess = (g) => {
        if (guess != null) return;
        const right = (g === "liar") === out.messedUp;
        setGuess(g)

        if (right) {
            const next = streak + 1;
            setScore((s) => s + 1);
            setStreak(next);
            if (next > bestStreak) {
                setBestStreak(next);
                localStorage.setItem("bestStreak", String(next));
            }
        } else {
            setStreak(0);
        }
    };

    // -------- CONVERSIONNNNNN-----------


    useEffect(() => {
        const v = parseFloat(value);
        if (isNaN(v)) {
            setOut({ result: NaN, correct: NaN, messedUp: false, lieType: null });
        } else {
            setOut(convert(v, category, from, to, frenzy));
        }
        setGuess(null); // new round, so forget the old guess
    }, [value, category, from, to, frenzy, tick]);

    // --------What to seee---------

    return (
        <div className={`card ${revealed && !wasRight ? "card--shake" : ""}`}>
            <div className="tabs">
                {Object.entries(CATEGORIES).map(([key, c]) => {
                    const Icon = c.icon;
                    return (
                        <button
                            key={key}
                            className={`tab ${key === category ? "tab--active" : ""}`}
                            onClick={() => changeCategory(key)}
                        >
                            <Icon size={16} strokeWidth={2} />
                            {c.label}
                        </button>
                    );
                })}
            </div>

            <div className="row">
                <input
                    className="input"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <select className="select" value={from} onChange={(e) => setFrom(e.target.value)}>
                    {Object.entries(units).map(([k, u]) => (
                        <option key={k} value={k}>{u.name} ({k})</option>
                    ))}
                </select>
            </div>

            <button className="swap" onClick={swap} aria-label="Swap units">
                <ArrowUpDown size={20} />
            </button>

            <div className="row">
                {/* The glitch animation only plays AFTER the reveal, otherwise it would give the lie away */}
                <div
                    key={tick + String(out.result)}
                    className={`output ${revealed && out.messedUp ? "output--glitch" : ""} ${wasRight ? "output--right" : ""}`}
                    onClick={() => frenzy && setTick((t) => t + 1)}
                    title={frenzy ? "Click to re-roll" : ""}
                >
                    {formatNumber(out.result)}
                </div>
                <select className="select" value={to} onChange={(e) => setTo(e.target.value)}>
                    {Object.entries(units).map(([k, u]) => (
                        <option key={k} value={k}>{u.name} ({k})</option>
                    ))}
                </select>
            </div>

            {frenzy && <p className="hint">40% of the time you would be gaslighted~ （￣︶￣）↗</p>}

            {/* Spot the lie panel!! */}
            {canPlay && (
                <div className="game">
                    <div className="game__stats">
                        <span><b>{score}</b>Score</span>
                        <span><b>{streak}</b>Streak</span>
                        <span><b>{bestStreak}</b>Best</span>
                    </div>

                    {!revealed ? (
                        <div className="game__buttons">
                            <button className="game__btn game__btn--legit" onClick={() => handleGuess("legit")}>
                                <ShieldCheck size={18} /> Legit
                            </button>
                            <button className="game__btn game__btn--liar" onClick={() => handleGuess("liar")}>
                                <ShieldAlert size={18} /> Liar!
                            </button>
                        </div>
                    ) : (
                        <div className="game__reveal">
                            <p className="game__verdict">{wasRight ? "Nailed it!" : "Fooled you!"}</p>
                            <p>
                                {out.messedUp
                                    ? `${LIE_LABELS[out.lieType]}. Real answer: ${formatNumber(out.correct)} ${to}`
                                    : "That one was honest."}
                            </p>
                            <button className="game__btn" onClick={() => setTick((t) => t + 1)}>
                                Next round <ArrowRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}