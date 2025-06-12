import { FunctionComponent } from 'react'

import {
  Cog6ToothIcon,
  HomeIcon,
  MapPinIcon,
  PlusIcon,
  UserIcon
} from '@heroicons/react/24/outline'

import MobileLayoutLink from './MobileLayoutLink'

const MobileLayout: FunctionComponent = () => {
  return (
    <div className="z-40 px-3 w-[95%] max-w-[360px] h-[75px] font-bold font-merryweather bg-white drop-shadow-md absolute bottom-3 left-1/2 -translate-x-1/2 rounded-sm flex items-center place-content-around gap-3">
      <MobileLayoutLink href="/" text={'Home'} icon={<HomeIcon className="w-6 h-6" />} />
      <MobileLayoutLink
        href="/administration"
        text={'Admin'}
        icon={<Cog6ToothIcon className="w-6 h-6" />}
      />
      <button className="flex items-center justify-center w-19 h-19 bg-mainGreen rounded-full border-2 border-white drop-shadow-md -translate-y-1/3 cursor-pointer">
        <PlusIcon className="w-12 h-12 text-white" />
      </button>
      <MobileLayoutLink href="/map" text={'Map'} icon={<MapPinIcon className="w-6 h-6" />} />
      <MobileLayoutLink
        href="/profile"
        text={'Profile'}
        icon={<UserIcon className="w-6 h-6" />}
      />
    </div>
  )
}

export default MobileLayout
