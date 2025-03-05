import { css, keyframes } from '@emotion/react';
import Space from 'components/Space.tsx';
import SectionHeader from 'components/SectionHeader.tsx';

export default function ResultContentLoading() {
  return (
    <>
      <Space size={50} />
      <SectionHeader
        title={'📑 분석 중...'}
        desc={'당신의 카카오톡에 담긴 링크들을 가져오고 있어요!'}
      />
      <Space size={20} />

      <div css={spinnerCss} />

      <Space size={30} />

      <div css={skeletonBoxCss} />
      <div css={skeletonBoxCss} />
      <div css={skeletonBoxCss} />
    </>
  );
}

const skeletonCss = css`
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const skeletonBoxCss = css`
  ${skeletonCss};
  height: 20px;
  width: 80%;
  margin: 10px auto;
`;

const spinnerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;

  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 5px solid #ddd;
    border-top-color: #007bff;
    border-radius: 50%;
    animation: ${spinAnimation} 1s linear infinite;
  }
`;
