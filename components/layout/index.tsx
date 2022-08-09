import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';

import { NAVIGATION } from '../../common/const';

// import Logo from './icons/icon-logo';
import Footer from '../footer';

type Props = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
  fixed?: boolean;
  headerBgCls?: string;
  extra?: React.ReactNode;
};

export default function Layout({
  children,
  className,
  hideNav,
  layoutStyles,
  fixed = false,
  headerBgCls,
  extra,
}: Props) {
  const router = useRouter();
  const activeRoute = router.asPath;
  const t = useTranslations('navigation');

  return (
    <>
      <div className={cn('min-h-screen', 'w-full')}>
        <div
          className={cn(headerBgCls, 'h-24', {
            'fixed-center': fixed,
          })}
          style={{ zIndex: 1 }}
        >
          {!hideNav && (
            <header className={cn('main-content flex h-full items-center justify-center')}>
              <div className="flex flex-grow items-center">
                <Link href="/">
                  <img className="h-16 w-16 cursor-pointer" src="/images/logo.png" />
                </Link>
              </div>
              <div className="hidden flex-grow items-center lg:flex ">
                {NAVIGATION.map(({ name, route }) => (
                  <Link key={name} href={route}>
                    <span
                      className={cn(
                        'cursor-pointer rounded-3xl py-2 px-6 text-xl hover:underline',
                        {
                          'bg-white bg-opacity-20': activeRoute.startsWith(route),
                          'text-gray-500 text-opacity-70	': activeRoute.startsWith(route),
                          'text-gray-500': !activeRoute.startsWith(route),
                        },
                      )}
                    >
                      {t(name)}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="flex flex-grow justify-end">{extra}</div>
            </header>
          )}
        </div>

        <div>
          <main style={layoutStyles}>
            <SkipNavContent />
            <div className={className}>{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
