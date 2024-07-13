import React, {useState} from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { CgProfile } from "react-icons/cg";
import { logout } from '../../services/operations/authAPI';

const MobileSidebar = ({toggled, setToggled, subLinks, token}) => {
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
    <div className="h-full md:hidden">
        <Sidebar 
            onBackdropClick={() => setToggled(false)} 
            toggled={toggled} 
            breakPoint="always"
            backgroundColor="#161D29"
            ttb
        >
            <Menu 
                className="text-richblack-300"
            >

                {token !== null && 
                    <SubMenu 
                        icon={<CgProfile className='text-2xl'/>}
                    >
                        <MenuItem className='hover:bg-yellow-600'>
                            <Link to="/dashboard/my-profile">
                                <div className="flex w-full items-center gap-x-1 text-sm text-richblack-100">
                                    Dashboard
                                </div>
                            </Link>
                        </MenuItem>

                        <MenuItem>
                            <div 
                                className="flex w-full items-center gap-x-1 text-sm text-richblack-100"
                                onClick={() => {
                                    dispatch(logout(navigate))
                                  }}>
                                    Logout
                            </div>
                        </MenuItem>
                    </SubMenu>
                }

                {token === null && (
                    <MenuItem>
                        <Link to="/login">
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                Log in
                            </button>
                        </Link>

                        {token === null && (
                            <Link to="/signup">
                                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                    Sign up
                                </button>
                            </Link>
                        )}
                    </MenuItem>
                )}

                {
                    NavbarLinks.map((link, index) => (
                        link?.title === "Catalog" ? (
                            <SubMenu label="Catalog" key={index}>
                                {subLinks.length ? (
                                    subLinks
                                        .filter((subLink) => subLink?.courses?.length > 0)
                                        .map((subLink, i) => (
                                            <MenuItem key={i}>
                                                <Link
                                                    to={`/catalog/${subLink.name
                                                        .split(" ")
                                                        .join("-")
                                                        .toLowerCase()}`}
                                                    className="rounded-lg bg-transparent"
                                                >
                                                    <p>{subLink.name}</p>
                                                </Link>
                                            </MenuItem>
                                        ))
                                ) : (
                                    <p className="text-center">No Courses Found</p>
                                )}
                            </SubMenu>
                        ) : (
                            <MenuItem className='hover:bg-yellow-25' key={index}>
                                <Link to={link?.path}>
                                    <p>{link.title}</p>
                                </Link>
                            </MenuItem>
                        )
                    ))
                }

                {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                    <MenuItem>
                        <Link to="/dashboard/cart" className="relative">
                            {/* <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                                {totalItems > 0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                    {totalItems}
                                </span>
                            )} */}
                            Cart
                        </Link>
                    </MenuItem>
                )}
            </Menu>

        </Sidebar>
        <main style={{ display: 'flex', padding: 10 }}> 
            <div>
                <button className="sb-button" onClick={() => setToggled(!toggled)}>
                    <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                </button>
            </div>
        </main>
    </div>
  )
}

export default MobileSidebar
