import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(RelativeTime);

export const formatRelativeTime = (value?: number) => (value ? dayjs().to(dayjs.unix(value)) : '');
export const formatRelativeTime1 = (value?: number) => {
  return value ? dayjs().to(value) : '';
};

export const formatNumber = (value: number, decimal: number, locale = 'en') =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  }).format(value);

export const formatCurrency = (value: number) => formatNumber(value, 2);

export const formatDateTime = (date: string, format: string) => dayjs(date).format(format);

export const timeNow = () => dayjs().format();

export function formatAddress(address: string) {
  if (!address) {
    return '';
  }
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}