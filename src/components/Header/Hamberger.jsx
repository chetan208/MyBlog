import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Menu from "./Menu";

export default function HamburgerMenu() {
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <>
        <button
            className="md:hidden text-2xl mr-3"
            onClick={() => setMenuOpen(!menuOpen)}
        >
            <GiHamburgerMenu size={30} />
        </button>

        <Menu menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
        />

        </>
    )
}