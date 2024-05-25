import React from 'react'
import Navlink from './navlink'

function AppMenu() {
  const menus = [
    {
      title: 'Home',
      href: '/'
    },
    {
      title: 'Explore',
      href: '/explore'
    },
    {
      title: 'About',
      href: '/about'
    },
    {
      title: 'Contact',
      href: '/contact'
    }
  ]
  return (
    <>
      {menus.map((menu) => (
        <li className="list-none" key={menu.href}>
          <Navlink href={menu.href} title={menu.title} />
        </li>
      ))}
    </>
  )
}

export default AppMenu
