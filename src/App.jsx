import { useState } from "react";
import Converter from "./components/Converter";
import FrenzyToggle from "./components/FrenzyToggle";

export default function App() {
    const [frenzy, setFrenzy] = useState(false);

    return (
        <div className={`app ${frenzy ? "app--frenzy" : ""}`}>
            <div className="blob blob--1" />
            <div className="blob blob--2" />
            <main>
                <h1 className="title">Aether<span>Convert</span></h1>
                <p className = "subtitle">convert anything, trust nothing</p>
                <Converter frenzy = {frenzy} />
                <FrenzyToggle on = {frenzy} setOn = {setFrenzy} />
            </main>
        </div>
    );
}
