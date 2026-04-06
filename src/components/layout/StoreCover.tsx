"use client";
import styled from "styled-components";
import { Store } from "@/lib/types";
import { down, up } from "@/lib/breakpoints";

const Cover = styled.div`
  position: relative;
  height: 140px;
  overflow: hidden;
  background: ${({ theme }) => theme.gradients.cover};

  ${up.sm}  { height: 160px; }
  ${up.lg}  { height: 180px; }
`;

const Emojis = styled.div`
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 52px; letter-spacing: 10px;
  opacity: .3; filter: blur(2px); user-select: none;

  ${up.sm}  { font-size: 64px; letter-spacing: 14px; }
`;

const Overlay = styled.div`
  position: absolute; inset: 0; background: rgba(0,0,0,.16);
`;

const ProfileWrap = styled.div`
  padding: 0 1rem 1rem;
  position: relative;
  background: ${({ theme }) => theme.colors.surface};

  ${up.sm}  { padding: 0 1.25rem 1rem; }
`;

const AvatarRing = styled.div`
  position: absolute;
  top: -24px; left: 1rem;
  width: 52px; height: 52px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradients.ig};
  padding: 3px;

  ${up.sm}  { top: -28px; left: 1.25rem; width: 58px; height: 58px; }
`;

const AvatarInner = styled.div`
  width: 100%; height: 100%; border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;

  ${up.sm}  { font-size: 26px; }
`;

const Info = styled.div`padding-top: 33px; ${up.sm} { padding-top: 38px; }`;

const StoreName = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 18px; font-weight: 800; margin-bottom: 3px;

  ${up.sm}  { font-size: 20px; }
  ${up.lg}  { font-size: 22px; }
`;

const Meta = styled.div`
  display: flex; align-items: center; gap: 5px; flex-wrap: wrap;
  font-size: 12px; color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 4px;

  ${up.sm} { gap: 6px; }
`;

const MetaDot = styled.span`color: ${({ theme }) => theme.colors.border2};`;

const MoreInfo = styled.span`
  color: #185FA5; cursor: pointer;
  &:hover { text-decoration: underline; }
`;

const OpenBadge = styled.span`
  font-size: 12px; font-weight: 500;
  color: ${({ theme }) => theme.colors.success};
`;

const Actions = styled.div`
  display: flex; gap: 8px; margin-top: .75rem;
`;

const WaBtn = styled.a`
  flex: 1; display: flex; align-items: center; justify-content: center;
  gap: 7px; padding: 9px 12px; border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.whatsapp};
  color: #fff; font-size: 13px; font-weight: 500;
  transition: opacity .2s; white-space: nowrap;
  &:hover { opacity: .88; }

  ${down.sm} { font-size: 12px; padding: 8px 10px; }
`;

const ShareBtn = styled.button`
  padding: 9px 16px; border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.border2};
  font-size: 13px; color: ${({ theme }) => theme.colors.ink};
  transition: background .2s; white-space: nowrap;
  &:hover { background: ${({ theme }) => theme.colors.surface2}; }

  ${down.sm} { font-size: 12px; padding: 8px 12px; }
`;

interface Props { store: Store; }

export default function StoreCover({ store }: Props) {
  const handleShare = () => {
    if (navigator.share) navigator.share({ title: store.name, url: window.location.href });
    else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado!");
    }
  };

  return (
    <>
      <Cover>
        <Emojis>{store.coverEmojis}</Emojis>
        <Overlay />
      </Cover>
      <ProfileWrap>
        <AvatarRing><AvatarInner>{store.logoEmoji}</AvatarInner></AvatarRing>
        <Info>
          <StoreName>{store.name}</StoreName>
          <Meta>
            <span>📍 {store.location}</span>
            <MetaDot>•</MetaDot>
            <MoreInfo>Mais informações</MoreInfo>
          </Meta>
          <OpenBadge>{store.open}</OpenBadge>
          <Actions>
            <WaBtn href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Falar no WhatsApp
            </WaBtn>
            <ShareBtn onClick={handleShare}>Compartilhar</ShareBtn>
          </Actions>
        </Info>
      </ProfileWrap>
    </>
  );
}
