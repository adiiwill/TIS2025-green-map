import { useTranslation } from 'react-i18next'

import { DateTime } from 'luxon'

const Calendar = () => {
  const { i18n } = useTranslation()

  // Set the locale for Luxon based on the current i18n language
  const locale = i18n.language === 'hu' ? 'hu' : 'en'

  const startOfWeek = DateTime.now().setLocale(locale).startOf('week')

  const week = Array.from({ length: 7 }, (_, i) => startOfWeek.plus({ days: i }))

  const currentDate = DateTime.now().setLocale(locale).toFormat('dd LLL')
  const currentTime = DateTime.now().setLocale(locale).toFormat('HH:mm')

  return (
    <div className="flex flex-col justify-center items-center xl:items-baseline w-full gap-2">
      <p className="text-6xl font-bold">{currentDate}</p>
      <p className="text-2xl text-gray-500 mt-1">{currentTime}</p>
      <div className="flex gap-2 mt-6">
        {week.map((day) => (
          <Day day={day} key={day.toISODate()} locale={locale} />
        ))}
      </div>
    </div>
  )
}

const Day = ({
  day,
  className,
  locale
}: {
  day: DateTime
  className?: string
  locale: string
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <p
        className={
          day.toISODate() === DateTime.now().toISODate() ? 'text-mainGreen' : 'text-[#cbcbcb]'
        }
      >
        {day.setLocale(locale).toFormat('ccc')}
      </p>
      <p
        className={
          day.toISODate() === DateTime.now().toISODate()
            ? 'bg-mainGreen rounded-full h-8 w-8 md:w-12 md:h-12 flex items-center justify-center text-white font-bold text-xl'
            : 'bg-[#cbcbcb] rounded-full h-8 w-8 md:w-12 md:h-12 flex items-center justify-center text-black font-bold text-lg'
        }
      >
        {day.setLocale(locale).toFormat('dd')}
      </p>
    </div>
  )
}

export default Calendar
