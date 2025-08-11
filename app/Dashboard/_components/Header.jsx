"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path = usePathname();
    useEffect(() => {
        console.log(path)
    }, [])

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm' >
            <Image src={"/logo.svg"} width={100} height={50} alt='logo' />
            <ul className='hidden md:flex gap-6'>
                <li>
                    <Link
                        href="/dashboard"
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/dashboard" && "text-primary font-bold"
                            }`}
                    >
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link
                        href="/dashboard/Questions"
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/dashboard/Questions" && "text-primary font-bold"
                            }`}
                    >
                        Questions
                    </Link>
                </li>

                <li>
                    <Link
                        href="/dashboard/Upgrade"
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/dashboard/Upgrade" && "text-primary font-bold"
                            }`}
                    >
                        Upgrade
                    </Link>
                </li>

                <li>
                    <Link
                        href="/dashboard/How"
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/dashboard/How" && "text-primary font-bold"
                            }`}
                    >
                        How it works
                    </Link>
                </li>
            </ul>
            <UserButton />
        </div>
    )
}

export default Header