import { FunctionComponent, ReactNode } from 'react'

import { NavLink } from 'react-router'

import { cn } from '@heroui/react'

interface MobileLayoutLinkProps {
  text: string
  href: string
  icon?: ReactNode
}

const MobileLayoutLink: FunctionComponent<MobileLayoutLinkProps> = ({ text, icon, href }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'flex flex-col justify-center items-center gap-0.5 cursor-pointer dark:text-white',
          isActive && 'text-mainGreen dark:text-mainGreen'
        )
      }
      to={href}
    >
      {icon} <span className="text-sm">{text}</span>
    </NavLink>
  )
}

export default MobileLayoutLink
