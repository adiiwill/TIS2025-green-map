import { useTranslation } from 'react-i18next'

import { Avatar, Button, Select, SelectItem, Switch } from '@heroui/react'
import { ArrowLeftStartOnRectangleIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'

import Layout from '../components/layout/Layout'
import { useAuthStore } from '../store/authStore'
import { useSettingStore } from '../store/settingStore'

const Profile = () => {
  const { t } = useTranslation()
  const { email, authReset } = useAuthStore()
  const { language, theme, toggleLanguage, toggleTheme } = useSettingStore()
  const username = email?.split('@')[0] || t('profile.unknown')

  return (
    <Layout title={t('profile.title')}>
      <div className="bg-fgWhite dark:bg-bgDark dark:text-white min-h-screen lg:min-h-[calc(100vh-80px)] p-4 sm:p-8 sm:pb-32 md:p-24 md:pb-32 lg:p-16 pb-20 lg:pb-36">
        <div className="flex gap-6 sm:gap-8 md:gap-12 lg:gap-28 mb-8 sm:mb-12 md:mb-16 lg:mb-18 flex-col md:flex-row items-center">
          <div className="h-24 w-24 sm:h-32 sm:w-32 md:w-40 md:h-40 lg:w-52 lg:h-52 aspect-square bg-[#d9d9d9] rounded-full flex items-center justify-center border-[#3F3D56] border-2">
            <span className="font-merryweather text-black text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold">
              {username[0].toUpperCase()}
            </span>
          </div>
          <div className="font-merryweather flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-14 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold self-start">
            <div>
              <span className="text-[#70757A] text-sm sm:text-base md:text-lg lg:text-xl">
                {t('profile.username')}
              </span>
              <p className="mt-1 sm:mt-2 capitalize text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                {username}
              </p>
            </div>
            <div>
              <span className="text-[#70757A] text-sm sm:text-base md:text-lg lg:text-xl">
                {t('profile.email')}
              </span>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                {email}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14">
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-mainGray dark:text-white font-merryweather font-bold">
            {t('profile.settings')}
          </span>
          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="text-[#70757A] font-merryweather text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              {t('profile.language')}
            </span>
            <Select
              value={language}
              onChange={() => toggleLanguage()}
              defaultSelectedKeys={[language]}
              variant="faded"
              radius="sm"
              className="max-w-[500px] w-full"
              classNames={{
                trigger: 'text-sm sm:text-base md:text-lg',
                value: 'text-sm sm:text-base md:text-lg'
              }}
              startContent={
                <Avatar
                  alt={language}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  src={language === 'English' ? '/EN_flag.svg' : '/HU_flag.svg'}
                />
              }
            >
              <SelectItem
                key="English"
                className="text-sm sm:text-base md:text-lg"
                startContent={
                  <Avatar
                    alt={t('profile.languages.english')}
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    src="/EN_flag.svg"
                  />
                }
              >
                {t('profile.languages.english')}
              </SelectItem>
              <SelectItem
                key="Hungarian"
                className="text-sm sm:text-base md:text-lg"
                startContent={
                  <Avatar
                    alt={t('profile.languages.hungarian')}
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    src="/HU_flag.svg"
                  />
                }
              >
                {t('profile.languages.hungarian')}
              </SelectItem>
            </Select>
          </div>
          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="text-[#70757A] font-merryweather text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              {t('profile.theme')}
            </span>
            <Switch
              defaultSelected={theme === 'dark'}
              isSelected={theme === 'dark'}
              onValueChange={() => toggleTheme()}
              color="secondary"
              size="lg"
              thumbIcon={({ isSelected }) =>
                isSelected ? (
                  <MoonIcon className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                ) : (
                  <SunIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                )
              }
            />
          </div>
          <div className="flex flex-col gap-2 sm:gap-3 lg:hidden">
            <Button
              color="danger"
              className="text-sm sm:text-base"
              startContent={
                <ArrowLeftStartOnRectangleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              }
              onPress={() => authReset()}
            >
              {t('profile.logout')}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
