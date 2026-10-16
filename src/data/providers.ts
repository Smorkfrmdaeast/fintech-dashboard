import { PaymentCategory } from '../types';

export const PROVIDERS: Record<PaymentCategory, string[]> = {
  Airtime: ['MTN', 'Airtel', 'Glo', '9mobile'],
  Data: ['MTN Data', 'Airtel Data', 'Glo Data', '9mobile Data'],
  Electricity: ['IKEDC', 'EEDC', 'PHED', 'IBEDC', 'AEDC', 'BEDC', 'KEDCO'],
  TV: ['DSTV', 'GOTV', 'Startimes'],
  Internet: ['Spectranet', 'Smile', 'IPNX', 'Swift Networks'],
  Bank: [
    'Access Bank',
    'GTBank',
    'Zenith Bank',
    'First Bank',
    'UBA',
    'Fidelity Bank',
    'Union Bank',
    'Sterling Bank',
    'Polaris Bank',
    'Wema Bank',
    'FCMB',
    'Stanbic IBTC',
    'Keystone Bank',
    'Jaiz Bank',
    'Titan Trust Bank',
    'Providus Bank',
    'Kuda Bank',
    'Opay',
    'PalmPay',
    'Moniepoint',
  ],
};

export const PROMO_SLIDES = [
  {
    id: 1,
    text: '🎉 50% Cashback on Airtime Today!',
    gradient: 'from-yellow-400 to-yellow-500',
    textColor: 'text-black',
  },
  {
    id: 2,
    text: '⚡ Pay Electricity Bills Instantly ⚡',
    gradient: 'from-green-500 to-emerald-600',
    textColor: 'text-white',
  },
  {
    id: 3,
    text: '💳 Send Money to Any Bank in Nigeria',
    gradient: 'from-blue-500 to-indigo-600',
    textColor: 'text-white',
  },
  {
    id: 4,
    text: '🚀 Fast Data Top-Up + Bonuses',
    gradient: 'from-pink-500 to-purple-600',
    textColor: 'text-white',
  },
];

export const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/smork_frmdaeast?igsh=MWwwMHowMGhvcmY0dg==',
    iconClass: 'fa-brands fa-instagram',
    textColor: 'text-pink-400',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/1DhHJPTRXL/',
    iconClass: 'fa-brands fa-facebook',
    textColor: 'text-blue-500',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/smorkfrmdaeast',
    iconClass: 'fa-brands fa-linkedin',
    textColor: 'text-blue-400',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Smorkfrmdaeast',
    iconClass: 'fa-brands fa-github',
    textColor: 'text-gray-300',
  },
  {
    name: 'Email',
    url: 'mailto:ifeanyinuels32@gmail.com',
    iconClass: 'fa-solid fa-envelope',
    textColor: 'text-yellow-400',
  },
];
