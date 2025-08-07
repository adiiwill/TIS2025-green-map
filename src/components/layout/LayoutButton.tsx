import { FunctionComponent, ReactNode } from 'react'

import { NavLink } from 'react-router'

import { cn } from '@heroui/react'

interface LayoutButtonProps {
  text: string
  href: string
  icon?: ReactNode
  collapsed?: boolean
}

const LayoutButton: FunctionComponent<LayoutButtonProps> = ({
  text,
  href,
  icon,
  collapsed
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'p-[25px] w-full flex items-baseline text-white hover:bg-mainGreen cursor-pointer gap-2',
          !collapsed && 'justify-center',
          isActive && 'bg-mainGreen'
        )
      }
      to={href}
    >
      <span className="w-6 h-6 self-center">{icon}</span> {collapsed && text}
    </NavLink>
  )
}

export default LayoutButton
