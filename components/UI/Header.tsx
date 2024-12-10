'use client'

import React from 'react'
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'

import {
    Constructii,
    Electrice,
    Gradina,
    Metalurgice,
    Sanitare,
    Unelte
} from '@/public/data/DummyData'


import {CustomDropdown} from "@/components/Custom/CustomDropdown";



const Header = () => {


    return (
        <Navbar
            isBordered
            shouldHideOnScroll
            className="p-1 bg-gray-800  "

        >
            <NavbarContent className="sm:flex flex gap-4 w-full mx-auto bg-gray-800 p-4 overflow-x-auto max-w-none">
                <NavbarItem>
                    <CustomDropdown array={Gradina} name="Gradina"  />
                </NavbarItem>
                <NavbarItem>
                    <CustomDropdown array={Unelte} name="Unelte"  />
                </NavbarItem>
                <NavbarItem>
                    <CustomDropdown
                        array={Sanitare}
                        name="Sanitare"

                    />
                </NavbarItem>
                <NavbarItem>
                    <CustomDropdown
                        array={Electrice}
                        name="Electrice"

                    />
                </NavbarItem>
                <NavbarItem>
                    <CustomDropdown
                        array={Constructii}
                        name="Constructii"

                    />
                </NavbarItem>
                <NavbarItem>
                    <CustomDropdown
                        array={Metalurgice}
                        name="Metalurgice"

                    />
                </NavbarItem>
            </NavbarContent>


        </Navbar>
    )
}

export default Header
