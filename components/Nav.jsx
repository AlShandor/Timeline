"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Nav = () => {
    return (
        <nav className="flex-between w-full mb-4 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/images/logo.svg" alt="timeline logo" width={50} height={50} className="object-contain" />
                <p className="logo_text">Timeline</p>
            </Link>

            <div className="flex gap-3">
                <Link href="/create-element" className="inline-block">
                    <p className="outline_btn">Create</p>
                </Link>
                <Link href="/edit-element" className="inline-block">
                    <p className="outline_btn">Edit</p>
                </Link>
            </div>
        </nav>
    )
};

export default Nav;