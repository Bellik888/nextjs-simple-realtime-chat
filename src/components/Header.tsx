'use client';

import React, { FC } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import path from 'path';

const Header = () => {
  const pathname = usePathname();
  return (
    <header>
      <div className="header_container">
        <ul className="header_list">
          <li className="header_item">
            <Link
              className={`header_link ${pathname === '/' ? 'active' : ''}`}
              href="/"
            >
              Home
            </Link>
          </li>
          <li className="header_item">
            <Link
              className={`header_link ${pathname === '/blog' ? 'active' : ''}`}
              href="/blog"
            >
              Blog
            </Link>
          </li>
          <li className="header_item">
            <Link
              className={`header_link ${
                pathname === '/account' ? 'active' : ''
              }`}
              href="/account"
            >
              Account
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
