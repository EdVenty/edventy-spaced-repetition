import { Button } from './Button';

import './header.css';
import { ButtonGroup } from './ButtonGroup';
import { Typography } from './Typography';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

type User = {
  name: string;
};

type Path = {
  text: string;
  value: string;
}

export interface HeaderProps {
  user?: User;
  primary?: boolean;
  pages?: Path[];
  current?: string;

  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
  onNavClick?: (p: string) => void;
}

export const Header = ({ 
  primary = false,
  user, 
  pages,
  current,
  onLogin, 
  onLogout, 
  onCreateAccount,
  onNavClick,
  ...props
}: HeaderProps & React.HTMLProps<HTMLElement> & React.HTMLAttributes<HTMLElement>) => {
  const headerRef = React.useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  
  React.useEffect(() => {
    const handleResize = () => {
      if(headerRef.current) setIsMobile(headerRef.current.clientWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [headerRef.current]);

  const currentPage = pages?.find(v => v.value === current);

  return <header ref={headerRef} {...props} className={[`${primary ? 'header-primary' : 'header-secondary'}`, props.className].join(' ')}>
    <div className="storybook-header">
      <div className="header-brand">
        {primary ? <OutlinedLogo className="header-icon"/> : <PrimaryLogo className="header-icon"/>}
        {isMobile ? null : <div className="header-brandname-container">
          <Typography.Heading1 className="header-brandname">ELP</Typography.Heading1>
        </div>}
      </div>
      {pages ? <ButtonGroup items={isMobile ? (currentPage ? [currentPage] : []) : pages} buttonColor={primary ? 'white' : undefined} onClick={(v) => onNavClick?.(v)}/> : null}
      <div>
        {user ? (
          <>
            <Button size="small" onClick={onLogout} label="Log out" variant={primary ? 'outlined' : 'primary'}/>
          </>
        ) : (
          <div className='header-actions'>
            <Button size="small" onClick={onLogin} label="Log in" variant={primary ? 'outlined' : 'primary'}/>
            {isMobile ? null : <Button size="small" onClick={onCreateAccount} label="Sign up" variant={primary ? 'primary' : 'outlined'}/>}
          </div>
        )}
      </div>
    </div>
  </header>
};

const PrimaryLogo = ({...props}) => {
  return <svg width="99" height="65" viewBox="0 0 99 65" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1.55939 52.5661C0.767509 52.8094 0.32283 53.6486 0.566172 54.4405C0.809514 55.2324 1.64873 55.6771 2.44061 55.4337L1.55939 52.5661ZM20 50L20.0902 48.5027L20 50ZM33.5 56.4438C33.5 60.8621 37.0817 64.4438 41.5 64.4438C45.9183 64.4438 49.5 60.8621 49.5 56.4438C49.5 52.0256 45.9183 48.4438 41.5 48.4438C37.0817 48.4438 33.5 52.0256 33.5 56.4438ZM2.44061 55.4337C4.38443 54.8364 7.52758 53.7802 10.8715 52.8971C14.251 52.0045 17.5963 51.3579 19.9098 51.4972L20.0902 48.5027C17.25 48.3315 13.4901 49.1026 10.1054 49.9965C6.68505 50.8999 3.40504 51.9989 1.55939 52.5661L2.44061 55.4337ZM19.9098 51.4972C20.4704 51.531 20.72 51.6718 20.8521 51.7784C21.0052 51.902 21.162 52.1111 21.343 52.5299C21.5499 53.0086 21.6661 53.4335 21.9298 54.1563C22.1647 54.8004 22.4789 55.551 22.9885 56.2715C24.0737 57.8058 25.8326 58.9141 28.7943 59.2732C31.6803 59.6232 35.8039 59.2788 41.8329 57.9064L41.1671 54.9812C35.2593 56.326 31.5323 56.5832 29.1554 56.2951C26.8542 56.016 25.9381 55.2465 25.4378 54.5391C25.1546 54.1388 24.9484 53.6775 24.7481 53.1282C24.5764 52.6577 24.3423 51.9077 24.0968 51.3397C23.8254 50.7116 23.4275 50.0018 22.7364 49.444C22.0242 48.8692 21.1401 48.5659 20.0902 48.5027L19.9098 51.4972Z" fill="#C2ACF2"/>
    <path d="M94 16.5753H37C35.067 16.5753 33.5 18.1423 33.5 20.0753C33.5 22.0083 35.067 23.5753 37 23.5753H94C95.933 23.5753 97.5 22.0083 97.5 20.0753C97.5 18.1423 95.933 16.5753 94 16.5753Z" stroke="#C2ACF2" stroke-width="3"/>
    <path d="M94 32.5753H37C35.067 32.5753 33.5 34.1423 33.5 36.0753C33.5 38.0083 35.067 39.5753 37 39.5753H94C95.933 39.5753 97.5 38.0083 97.5 36.0753C97.5 34.1423 95.933 32.5753 94 32.5753Z" stroke="#C2ACF2" stroke-width="3"/>
    <path d="M78.938 5.31589L46.0385 43.2359M78.938 5.31589L87.4434 12.6952M78.938 5.31589L79.8604 4.25271C81.8981 1.904 85.4541 1.65192 87.8028 3.68966V3.68966C90.1515 5.72741 90.4036 9.28333 88.3658 11.632L87.4434 12.6952M46.0385 43.2359L54.5439 50.6152M46.0385 43.2359L42.3932 54.6263C42.1252 55.4636 42.9905 56.2144 43.7817 55.8309L54.5439 50.6152M54.5439 50.6152L87.4434 12.6952" stroke="black" stroke-width="3"/>
  </svg>;
}

const OutlinedLogo = ({...props}) => {
  return <svg width="99" height="65" viewBox="0 0 99 65" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1.55939 52.5661C0.767509 52.8095 0.32283 53.6487 0.566172 54.4406C0.809514 55.2325 1.64873 55.6771 2.44061 55.4338L1.55939 52.5661ZM20 50L20.0902 48.5027L20 50ZM33.5 56.4439C33.5 60.8622 37.0817 64.4439 41.5 64.4439C45.9183 64.4439 49.5 60.8622 49.5 56.4439C49.5 52.0256 45.9183 48.4439 41.5 48.4439C37.0817 48.4439 33.5 52.0256 33.5 56.4439ZM2.44061 55.4338C4.38443 54.8365 7.52758 53.7803 10.8715 52.8971C14.251 52.0046 17.5963 51.3579 19.9098 51.4973L20.0902 48.5027C17.25 48.3316 13.4901 49.1027 10.1054 49.9966C6.68505 50.8999 3.40504 51.999 1.55939 52.5661L2.44061 55.4338ZM19.9098 51.4973C20.4704 51.5311 20.72 51.6718 20.8521 51.7784C21.0052 51.902 21.162 52.1111 21.343 52.5299C21.5499 53.0087 21.6661 53.4336 21.9298 54.1564C22.1647 54.8005 22.4789 55.551 22.9885 56.2715C24.0737 57.8059 25.8326 58.9142 28.7943 59.2733C31.6803 59.6232 35.8039 59.2789 41.8329 57.9065L41.1671 54.9813C35.2593 56.3261 31.5323 56.5833 29.1554 56.2951C26.8542 56.0161 25.9381 55.2466 25.4378 54.5392C25.1546 54.1388 24.9484 53.6775 24.7481 53.1283C24.5764 52.6578 24.3423 51.9078 24.0968 51.3397C23.8254 50.7117 23.4275 50.0019 22.7364 49.444C22.0242 48.8692 21.1401 48.566 20.0902 48.5027L19.9098 51.4973Z" fill="white"/>
    <path d="M94 16.5753H37C35.067 16.5753 33.5 18.1423 33.5 20.0753C33.5 22.0083 35.067 23.5753 37 23.5753H94C95.933 23.5753 97.5 22.0083 97.5 20.0753C97.5 18.1423 95.933 16.5753 94 16.5753Z" stroke="white" stroke-width="3"/>
    <path d="M94 32.5753H37C35.067 32.5753 33.5 34.1423 33.5 36.0753C33.5 38.0083 35.067 39.5753 37 39.5753H94C95.933 39.5753 97.5 38.0083 97.5 36.0753C97.5 34.1423 95.933 32.5753 94 32.5753Z" stroke="white" stroke-width="3"/>
    <path d="M78.938 5.31589L46.0385 43.2359M78.938 5.31589L87.4434 12.6952M78.938 5.31589L79.8604 4.25271C81.8981 1.904 85.4541 1.65192 87.8028 3.68966V3.68966C90.1515 5.72741 90.4036 9.28333 88.3658 11.632L87.4434 12.6952M46.0385 43.2359L54.5439 50.6152M46.0385 43.2359L42.3932 54.6263C42.1252 55.4636 42.9905 56.2144 43.7817 55.8309L54.5439 50.6152M54.5439 50.6152L87.4434 12.6952" stroke="black" stroke-width="3"/>
  </svg>;
}