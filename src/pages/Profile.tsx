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
      <div className="bg-fgWhite dark:bg-bgDark dark:text-white min-h-screen lg:min-h-[calc(100vh-80px)] p-16 pb-36">
        <div className="flex gap-12 md:gap-28 mb-18 flex-col md:flex-row items-center">
          <div className="w-52 h-52 aspect-square bg-[#d9d9d9] rounded-full flex items-center justify-center border-[#3F3D56] border-2">
            <span className="font-merryweather text-black text-8xl font-bold">
              {username[0].toUpperCase()}
            </span>
          </div>
          <div className="font-merryweather flex flex-col gap-14 text-3xl font-bold">
            <div>
              <span className="text-[#70757A]">{t('profile.username')}</span>
              <p className="mt-2 capitalize">{username}</p>
            </div>
            <div>
              <span className="text-[#70757A]">{t('profile.email')}</span>
              <p>{email}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-14">
          <span className="text-5xl text-mainGray dark:text-white font-merryweather font-bold">
            {t('profile.settings')}
          </span>
          <div className="flex flex-col gap-3">
            <span className="text-[#70757A] font-merryweather text-4xl">
              {t('profile.language')}
            </span>
            <Select
              value={language}
              onChange={() => toggleLanguage()}
              defaultSelectedKeys={[language]}
              variant="faded"
              radius="sm"
              className="max-w-[500px] w-full"
              startContent={
                <Avatar
                  alt={language}
                  className="w-6 h-6"
                  src={language === 'English' ? '/EN_flag.svg' : '/HU_flag.svg'}
                />
              }
            >
              <SelectItem
                key="English"
                startContent={
                  <Avatar
                    alt={t('profile.languages.english')}
                    className="w-6 h-6"
                    src="/EN_flag.svg"
                  />
                }
              >
                {t('profile.languages.english')}
              </SelectItem>
              <SelectItem
                key="Hungarian"
                startContent={
                  <Avatar
                    alt={t('profile.languages.hungarian')}
                    className="w-6 h-6"
                    src="/HU_flag.svg"
                  />
                }
              >
                {t('profile.languages.hungarian')}
              </SelectItem>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[#70757A] font-merryweather text-4xl">
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
                  <MoonIcon className="w-4 text-black" />
                ) : (
                  <SunIcon className="w-4" />
                )
              }
            />
          </div>
          <div className="flex flex-col gap-3 lg:hidden">
            <Button
              color="danger"
              startContent={<ArrowLeftStartOnRectangleIcon className="w-5 h-5" />}
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
