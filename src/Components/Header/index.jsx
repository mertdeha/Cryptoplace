import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdArrowOutward } from "react-icons/md";
import { CoinContext } from '../../context/CoinContext';

const Header = () => {
    const { setCurrency } = useContext(CoinContext)

    const currencyHandler = (e) => {
        // select alanındaki değişim sonucunde elde edilen değeri al
        const selectedCurrency = e.target.value

        switch (selectedCurrency) {
            case "usd":
                setCurrency({ name: "usd", symbol: "$" })
                break;
            case "eur":
                setCurrency({ name: "eur", symbol: "€" })
                break;

            default:
                setCurrency({ name: "usd", symbol: "$" })
                break;

        }

    }
    return (
        <header className='flex items-center justify-between px-[10%] py-5 border-b-2 border-[#3c3c3c] bg-[#1a1a40]'>
            <Link to={"/"}>
                <img src="/logo.png" className='min-w-[120px] md:w-[200px]' alt="logo" />
            </Link>


            {/* Nav */}
            <ul className='hidden md:flex gap-10 ml-[50px] lg:ml-0'>
                <NavLink to="/" className='cursor-pointer hover:text-[#ffde4d] transition'>Home</NavLink>
                <NavLink to="/" className='cursor-pointer hover:text-[#ffde4d] transition'>Features</NavLink>
                <NavLink to="/" className='cursor-pointer hover:text-[#ffde4d] transition'>Pricing</NavLink>
                <NavLink to="/" className='cursor-pointer hover:text-[#ffde4d] transition'>Blog</NavLink>
            </ul>


            {/* Select & Buttton */}

            <div className='flex items-center gap-3 px-5 md:pl-10 lg:px-0'>
                <select onChange={currencyHandler} className='p-[5px_8px] rounded-md border-2 border-white bg-transparent'>
                    <option className='text-black' value="usd">USD</option>
                    <option className='text-black' value="eur">EUR</option>
                </select>

                <button className='max-lg:hidden flex items-center gap-2 md:gap-5 px-4 py-1 whitespace-normal rounded-[20px] bg-white text-[15px] text-black cursor-pointer hover:bg-[#ffde4d] transition'>
                    <span className='whitespace-pre'>Sign up</span>
                    <MdArrowOutward className='size-8' /></button>
            </div>
        </header>
    )
}

export default Header