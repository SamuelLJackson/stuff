import { DateUtils } from 'react-day-picker'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import { Locale } from 'date-fns'

function parseDate(str: string, format: string, locale: Locale | string) {
  const today = new Date()
  let parsed = undefined
  if (typeof locale === 'string') {
    parsed = dateFnsParse(str, format, today)
  } else {
    parsed = dateFnsParse(str, format, today, { locale })
  }

  if (DateUtils.isDate(parsed)) {
    return parsed
  } else {
    return undefined
  }
}

function formatDate(
  date: Date,
  format: string,
  locale?: Locale | string
): string {
  if (typeof locale === 'string') {
    return dateFnsFormat(date, format)
  } else {
    return dateFnsFormat(date, format, { locale })
  }
}

function formatDateDotNet(date: Date): string {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-') + 'T00:00:00'
}

const getTodayAsDateTime = () => {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  const hour = String(today.getHours() === 0 || today.getHours() === 12 ? 12 : today.getHours() % 12)
  const minutes = String(today.getMinutes())
  const period = today.getHours() > 11 ? 'PM' : 'AM'

  return `${mm}/${dd}/${yyyy} ${hour}:${minutes}${period}`
}

const FORMAT = 'MM/dd/yyyy'

export default {
  parseDate,
  formatDate,
  dateFnsFormat,
  formatDateDotNet,
  FORMAT,
  getTodayAsDateTime,
}
