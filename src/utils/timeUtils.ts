import { Time } from '@internationalized/date'

export const parseTimeFormat = (timeStr: string): Time | null => {
  const match = timeStr.match(/(\d{1,2}):?(\d{2})?([ap]m)/i)
  if (!match) return null
  const [_, hours, minutes = '00', period] = match
  const hour =
    parseInt(hours) + (period.toLowerCase() === 'pm' && parseInt(hours) !== 12 ? 12 : 0)
  return new Time(hour, parseInt(minutes))
}

export const formatTime = (time: Time | null) => {
  if (!time) return ''
  const hours = time.hour % 12 || 12
  const period = time.hour >= 12 ? 'pm' : 'am'
  return `${hours}:${time.minute.toString().padStart(2, '0')}${period}`
}
