export function formatTime(date: string) {
  const DATE = new Date(date)
  const year = DATE.getFullYear()
  const month = DATE.getMonth() + 1
  const day = DATE.getDate()
  const hour = DATE.getHours()
  const minute = DATE.getMinutes()
  const second = DATE.getSeconds()

  return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n: number) => {
  let num = n.toString()
  return num[1] ? num : '0' + num
}