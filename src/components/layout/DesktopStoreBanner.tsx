"use client";
import styled from "styled-components";
import { Store } from "@/lib/types";

const Banner = styled.div`
  position: relative; height: 260px; overflow: hidden;
  background: ${({ theme }) => theme.gradients.cover};
`;

const Emojis = styled.div`
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 96px; letter-spacing: 24px;
  opacity: .28; filter: blur(3px); user-select: none;
`;

const Overlay = styled.div`position: absolute; inset: 0; background: rgba(0,0,0,.32);`;

const Content = styled.div`
  position: absolute; inset: 0;
  max-width: 1280px; margin: 0 auto; padding: 0 2rem;
  display: flex; align-items: flex-end; padding-bottom: 2rem;
  gap: 1.25rem;
`;

const Avatar = styled.div`
  width: 72px; height: 72px; border-radius: 50%;
  background: ${({ theme }) => theme.gradients.ig};
  padding: 3px; flex-shrink: 0;
`;

const AvatarInner = styled.div`
  width: 100%; height: 100%; border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  display: flex; align-items: center; justify-content: center;
  font-size: 36px;
`;

const Info = styled.div`color: #fff;`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 28px; font-weight: 800; margin-bottom: 4px;
  text-shadow: 0 1px 4px rgba(0,0,0,.3);
`;

const Meta = styled.p`
  font-size: 14px; opacity: .85; font-weight: 300;
  display: flex; align-items: center; gap: 8px;
`;

const Open = styled.span`
  background: ${({ theme }) => theme.colors.success};
  color: #fff; font-size: 12px; font-weight: 500;
  padding: 2px 10px; border-radius: 999px;
`;

interface Props { store: Store; }

export default function DesktopStoreBanner({ store }: Props) {
  return (
    <Banner>
      <Emojis>{store.coverEmojis}</Emojis>
      <Overlay />
      <Content>
        <Avatar><AvatarInner>{store.logoEmoji}</AvatarInner></Avatar>
        <Info>
          <Name>{store.name}</Name>
          <Meta>
            📍 {store.location}
            <Open>{store.open}</Open>
          </Meta>
        </Info>
      </Content>
    </Banner>
  );
}
