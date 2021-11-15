import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import NavigationList from '@/components/NavigationList';
import Version from '@/components/Version';
import EqusLogoDark from '@/assets/EqusLogoDark.svg';
import { ReactComponent as IconFaceBook } from '../assets/IconFacebook.svg';
import { ReactComponent as IconTwitter } from '../assets/IconTwitter.svg';

export default function SubNav() {
  const { t } = useTranslation();

  const navigation = [
    {
      title: t('footer.products'),
      items: [
        {
          label: t('footer.consumer-app'),
          path: 'https://todo.consumer.app',
          external: true,
        },
        {
          label: t('footer.markets'),
          path: '/markets',
        },
        {
          label: t('footer.loyality-and-merchant-products'),
          path: '/products',
        },
      ],
    },
    {
      title: t('footer.digital-assets'),
      items: [
        {
          label: t('footer.digital-assets-overview'),
          path: '/assets',
        },
        {
          label: t('footer.cryptocurrency'),
          path: '/currency',
        },
        {
          label: t('footer.cash'),
          path: '/cash',
        },
        {
          label: t('footer.gift-cards'),
          path: '/giftcards',
        },
      ],
    },
    {
      title: t('footer.company'),
      items: [
        {
          label: t('footer.about-us'),
          path: '/about',
        },
        {
          label: t('footer.careers'),
          path: '/careers',
        },
        {
          label: t('footer.blog'),
          path: '/blog',
        },
        {
          label: t('footer.newsroom'),
          path: '/news',
        },
      ],
    },
    {
      title: t('footer.legal'),
      items: [
        {
          label: t('footer.tos'),
          path: '/terms',
        },
        {
          label: t('footer.privacy-policy'),
          path: '/privacy',
        },
        {
          label: t('footer.licence-and-disclosures'),
          path: '/license',
        },
        {
          label: t('footer.cookies'),
          path: '/cookies',
        },
        {
          label: t('footer.acceptable-use-policy'),
          path: '/acceptable-use',
        },
        {
          label: t('footer.esign-consent'),
          path: '/esign',
        },
        {
          label: t('footer.do-not-sell-personal-info'),
          path: '/personal-info',
        },
      ],
    },
  ];

  return (
    <footer className="flex bg-secondary-default">
      <div className="container mx-auto">
        <div>
          <div className="container flex flex-wrap mx-auto justify-evenly">
            <Link to="/" className="w-full md:w-auto">
              <img
                src={EqusLogoDark}
                alt="blockchains logo"
                className="mx-auto mt-6"
                style={{ height: '42px' }}
              />
            </Link>
            {navigation.map(entries => (
              <div className="p-8 text-sm" key={entries.title}>
                <h4 className="font-bold text-white">{entries.title}</h4>
                <NavigationList items={entries.items} />
              </div>
            ))}
            <div>
              <div className="flex justify-between mt-4 mb-16">
                <a
                  href="https://www.facebook.com/BlockchainsInc"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <IconFaceBook style={{ height: '1.5em' }} />
                </a>
                <a
                  href="https://twitter.com/BlockchainsInc"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <IconTwitter style={{ height: '1.5em' }} />
                </a>
              </div>
              <a
                href="https://play.google.com/store"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  src="/assets/GooglePlayBadge.png"
                  alt="Google Playstore Badge"
                  className="m-4"
                  style={{ width: '140px' }}
                />
              </a>
              <a
                href="https://www.apple.com/de/app-store/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  src="/assets/AppStoreBadge.svg"
                  alt="Appstore Badge"
                  className="m-4"
                  style={{ width: '128px' }}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="link-white">
          <Version />
        </div>
      </div>
    </footer>
  );
}
