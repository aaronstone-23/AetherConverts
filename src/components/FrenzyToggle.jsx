export default function FrenzyToggle({on, setOn}) {
    return (
    <button
    className= {`frenzy ${on ? "frenzy-on" : ""}`}
    onClick={() => setOn(!on)}
    aria-pressed={on}
    >
        <span className="frenzy__knob"/>
        <span className="frenzy__label">{on ? "FRENZY MODE!!" :"Frenzy mode"} "</span>
    </button>
    );
}
