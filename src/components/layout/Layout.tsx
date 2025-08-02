import { FunctionComponent, JSX, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import {
  Button,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal
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
import { debounce } from 'lodash'

import LayoutButton from './LayoutButton'
import MobileLayout from './MobileLayout'
import { useAuthStore } from '../../store/authStore'
import { usePOIStore } from '../../store/poiStore'
import { useSidebarStore } from '../../store/sidebarStore'
import PoiFormModal from '../admin/modals/PoiFormModal'

interface LayoutComponentProps {
  title: string
  children: JSX.Element
  extended?: boolean
}

const Layout: FunctionComponent<LayoutComponentProps> = ({ title, extended, children }) => {
  const { t } = useTranslation()
  const { searchPoi } = usePOIStore()

  const debouncedSearch = useCallback(
    debounce((value) => searchPoi(value), 800),
    [searchPoi]
  )

  const { isExpanded, toggle } = useSidebarStore()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const { email, authReset } = useAuthStore()
  const username = email?.split('@')[0] || t('layout.unknown')

  const navigate = useNavigate()

  const handleAddNew = () => {
    setIsAddModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
  }

  return (
    <>
      <div className="block lg:hidden">
        <MobileLayout extended={extended} />
        {children}
      </div>
      <div className="hidden lg:block">
        <div className="flex flex-row h-screen">
          <div
            className={cn(
              'w-[200px] min-h-screen bg-mainGray flex flex-col items-center font-merryweather gap-6 pt-6 shadow-lg',
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
              <img
                src="/street-map.png"
                alt={t('layout.altText.streetMap')}
                className="w-20"
              />
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
              <DropdownMenu aria-label={t('layout.dropdown.accountAriaLabel')}>
                <DropdownItem key="profile" showDivider isDisabled>
                  <div className="flex flex-col">
                    <span>{username}</span>
                    <span>{email}</span>
                  </div>
                </DropdownItem>
                <DropdownItem
                  startContent={<UserIcon className="w-5 h-5" />}
                  key="profile-btn"
                  onPress={() => navigate('/profile')}
                >
                  {t('layout.dropdown.profile')}
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
                  {t('layout.dropdown.logout')}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <span className="h-[2px] w-[80%] bg-white"></span>
            <span className="flex flex-col w-full">
              <LayoutButton
                href="/"
                text={t('layout.navigation.dashboard')}
                icon={<HomeIcon />}
                collapsed={!isExpanded}
              />
              <LayoutButton
                href="/map"
                text={t('layout.navigation.map')}
                icon={<MapPinIcon />}
                collapsed={!isExpanded}
              />
              <LayoutButton
                href="/administration"
                text={t('layout.navigation.administration')}
                icon={<Cog6ToothIcon />}
                collapsed={!isExpanded}
              />
            </span>
          </div>
          <div className="flex flex-col flex-1 h-screen overflow-hidden">
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
                      placeholder={t('layout.searchPlaceholder')}
                      className="max-w-[300px]"
                      variant="bordered"
                      startContent={<MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />}
                      radius="sm"
                      onChange={(e) => debouncedSearch(e.currentTarget.value)}
                    />
                    <Button
                      className="flex items-center gap-1 bg-mainGreen text-white px-12"
                      radius="sm"
                      onPress={handleAddNew}
                    >
                      <PlusIcon className="w-6 h-6" /> {t('layout.addNewButton')}
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div className="overflow-y-auto">{children}</div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        backdrop="blur"
        placement="center"
        radius="sm"
        size="3xl"
      >
        <PoiFormModal onClose={handleCloseAddModal} />
      </Modal>
    </>
  )
}

export default Layout
