import { APP_NAME } from '@/app/globalConstant';
import React from 'react';
import styles from './header.module.css';
import Link from 'next/link';
import { MY_URLS_PAGE } from '@/app/urlPath';
const { header, wrapper, logo, link } = styles;

const Header = () => {
  return (
    <div className={header}>
      <div className={wrapper}>
        <Link className={logo} href={'/'}>
          {APP_NAME}
        </Link>
        <ul >
          <Link className={link} href={MY_URLS_PAGE}>My URLs</Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
