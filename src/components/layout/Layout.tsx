import { FunctionComponent, JSX } from 'react'

import { useNavigate } from 'react-router'

import {
  Button,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input
} from '@heroui/react'
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PlusIcon,
  UserIcon
} from '@heroicons/react/24/outline'

import LayoutButton from './LayoutButton'
import MobileLayout from './MobileLayout'
import { useAuthStore } from '../../store/authStore'
import { useSidebarStore } from '../../store/sidebarStore'

interface LayoutComponentProps {
  title: string
  children: JSX.Element
  extended?: boolean
}

const Layout: FunctionComponent<LayoutComponentProps> = ({ title, extended, children }) => {
  const { isExpanded, toggle } = useSidebarStore()

  const { email, authReset } = useAuthStore()
  const username = email?.split('@')[0] || 'Unknown'

  const navigate = useNavigate()

  return (
    <>
      <div className="block lg:hidden">
        <MobileLayout extended={extended} />
        {children}
      </div>
      <div className="hidden lg:block">
        <div className="flex flex-row">
          <div
            className={cn(
              'w-[200px] min-h-screen bg-mainGray flex flex-col items-center font-merryweather gap-6 pt-6 shadow-lg shadow-black/10',
              isExpanded && 'w-[100px]'
            )}
          >
            <button
              onClick={() => toggle()}
              className="w-8 h-8 bg-mainGreen border-white border-3 rounded-full flex justify-center items-center self-end translate-x-1/2 z-10 drop-shadow-md cursor-pointer"
            >
              {isExpanded ? (
                <ChevronRightIcon className="w-5 h-5" />
              ) : (
                <ChevronLeftIcon className="w-5 h-5" />
              )}
            </button>
            <div className="w-full px-5 flex items-center justify-center mb-6">
              <img src="/street-map.png" alt="Street map" className="w-20" />
            </div>
            <Dropdown className="w-full flex justify-center font-lato">
              <DropdownTrigger>
                <div className="flex flex-row justify-center gap-3 w-full cursor-pointer">
                  <span className="bg-[#d9d9d9] w-12 h-12 p-2 border-3 border-white text-mainGray font-bold text-md rounded-full aspect-square flex justify-center items-center">
                    {username.charAt(0).toUpperCase()}
                  </span>
                  {!isExpanded && (
                    <span className="self-center text-white text-md">{username}</span>
                  )}
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Account">
                <DropdownItem key={'profile'} showDivider isDisabled>
                  <div className="flex flex-col">
                    <span>{username}</span>
                    <span>{email}</span>
                  </div>
                </DropdownItem>
                <DropdownItem
                  startContent={<UserIcon className="w-5 h-5" />}
                  key={'profile-btn'}
                  onPress={() => navigate('/profile')}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  className="text-danger"
                  startContent={<ArrowLeftStartOnRectangleIcon className="w-5 h-5" />}
                  key={'logout'}
                  onPress={() => {
                    authReset()
                    navigate('/login')
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <span className="h-[2px] w-[80%] bg-white"></span>
            <span className="flex flex-col w-full">
              <LayoutButton
                href="/"
                text="Dashboard"
                icon={<HomeIcon />}
                collapsed={!isExpanded}
              />
              <LayoutButton
                href="/map"
                text="Map"
                icon={<MapPinIcon />}
                collapsed={!isExpanded}
              />
              <LayoutButton
                href="/administration"
                text="Administration"
                icon={<Cog6ToothIcon />}
                collapsed={!isExpanded}
              />
            </span>
          </div>
          <div className="flex flex-col w-full h-screen overflow-hidden">
            <div
              className={cn(
                'bg-white w-full h-20 drop-shadow-md flex flex-col p-6 font-merryweather font-bold text-2xl gap-6',
                extended && 'h-min'
              )}
            >
              <h1>{title}</h1>
              {extended && (
                <>
                  <span className="h-[1px] w-full bg-[#70757A]"></span>
                  <div className="flex flex-row place-content-between">
                    <Input
                      placeholder="Search for..."
                      className="max-w-[300px]"
                      variant="bordered"
                      startContent={<MagnifyingGlassIcon className="w-5 h-5" />}
                      radius="sm"
                    />
                    <Button
                      className="flex items-center gap-1 bg-mainGreen text-white px-12"
                      radius="sm"
                    >
                      <PlusIcon className="w-6 h-6" /> Add New
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div className="flex-1 h-1 -z-1 min-h-0">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
