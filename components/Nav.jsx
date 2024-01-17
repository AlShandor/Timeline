"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Nav = () => {
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/logo.svg" alt="timeline logo" width={50} height={50} className="object-contain" />
                <p className="logo_text">Timeline</p>
            </Link>
        </nav>
    )
};

export default Nav;