import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import matchIcon from '@/assets/match.svg';
import clubIcon from '@/assets/club.svg';
import profileIcon from '@/assets/profile.svg';
import guestIcon from '@/assets/guest.svg';
import settingsIcon from '@/assets/settings.svg';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  position: absolute; /* Always fixed at the bottom */
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000; /* High z-index to stay on top of other content */

  /*@media (max-width: 768px) {
    padding-right: 10px;
  }

  @media (max-width: 480px) {
    padding-right: 10px;
  }*/
`;

const isClubPathActive = () => {
  const currentPath = window.location.pathname; // 현재 경로를 가져옴.
  return currentPath.startsWith('/club');
};

const FooterItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 0.9rem;

  &:hover {
    color: #16C79A;
  }
`;

const FooterIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 5px;
  filter: ${({ active }) =>
    active
      ? 'brightness(0) saturate(100%) invert(64%) sepia(13%) saturate(510%) hue-rotate(68deg) brightness(92%) contrast(91%)'
      : 'none'};
`;

const FooterText = styled.span`
  font-size: 0.75rem;
  color: ${({ active }) => (active ? '#16C79A' : '#000')};

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;
const Footer = () => {
  const location = useLocation();

  const isActive = (...paths) => paths.includes(location.pathname);

  return (
    <FooterContainer>
      <FooterItem to="/match">
        <FooterIcon src={matchIcon} alt="경기" active={isActive('/match', '/match/enroll')} />
        <FooterText active={isActive('/match', '/match/enroll')}>경기</FooterText>
      </FooterItem>

      <FooterItem to="/clublist">
        <FooterIcon src={clubIcon} alt="구단" active={isActive('/clublist')} />
        <FooterText active={isClubPathActive()}
          >구단</FooterText>
      </FooterItem>

      <FooterItem to="/profile">
        <FooterIcon src={profileIcon} alt="프로필" active={isActive('/profile')} />
        <FooterText active={isActive('/profile')}>프로필</FooterText>
      </FooterItem>

      <FooterItem to="/mercenary">
        <FooterIcon 
          src={guestIcon} 
          alt="용병" 
          active={isActive(
            '/mercenary',
            '/mercenary/app-list', 
            '/mercenary/rec-list',
            '/mercenary/enroll-app',
            '/mercenary/enroll-rec'
          )} 
        />
        <FooterText 
          active={isActive(
            '/mercenary',
            '/mercenary/app-list', 
            '/mercenary/rec-list',
            '/mercenary/enroll-app',
            '/mercenary/enroll-rec'
          )}
        >
          용병
        </FooterText>
      </FooterItem>

      <FooterItem to="/settings">
        <FooterIcon src={settingsIcon} alt="설정" active={isActive('/settings')} />
        <FooterText active={isActive('/settings')}>설정</FooterText>
      </FooterItem>
    </FooterContainer>
  );
};


export default Footer;