import { ItemProps } from 'apis/getResultData.ts';
import { formatYYYYMMDD } from 'utils/date.ts';
import { css, Theme } from '@emotion/react';
import CardErrorImage from 'assets/img/card-error-image.jpg';
import Hashtag from 'components/Hashtag.tsx';
// import { useEffect, useState } from 'react';
// import Resizer from 'react-image-file-resizer';

interface CardProps {
  item: ItemProps;
}

export default function Card({ item }: CardProps) {
  // const [webpThumbnail, setWebpThumbnail] = useState<string>(CardErrorImage);
  //
  // useEffect(() => {
  //   async function createWebpImage() {
  //     if (!item.thumbnail) {
  //       setWebpThumbnail(CardErrorImage);
  //       return;
  //     }
  //
  //     try {
  //       const response = await fetch(item.thumbnail);
  //       const blob = await response.blob();
  //       const file = new File([blob], 'thumbnail', { type: blob.type });
  //
  //       Resizer.imageFileResizer(
  //         file,
  //         300, // 가로 최대 사이즈(px)
  //         160, // 세로 최대 사이즈(px)
  //         'WEBP', // 변환 포맷
  //         100, // 품질(0~100)
  //         0, // 회전 각도
  //         uri => {
  //           if (typeof uri === 'string') {
  //             setWebpThumbnail(uri);
  //           } else {
  //             setWebpThumbnail(CardErrorImage);
  //           }
  //         },
  //         'base64',
  //       );
  //     } catch (error) {
  //       setWebpThumbnail(CardErrorImage);
  //     }
  //   }
  //
  //   createWebpImage();
  // }, [item.thumbnail]);
  return (
    <div css={cardCss}>
      <a
        css={thumbnailCss}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.title} 상세 페이지로 이동`}
      >
        <img
          src={item.thumbnail || CardErrorImage}
          alt={`${item.title} 관련 이미지`}
          onError={e => (e.currentTarget.src = CardErrorImage)}
          loading="lazy"
        />
      </a>
      <div css={textCardCss}>
        <a css={detailAnchorCss} href={item.url} target="_blank" rel="noopener noreferrer">
          <div css={detailCss}>
            <h4 className={'title'}>{item.title}</h4>
            <div className={'content'}>{item.content}</div>
          </div>
        </a>
        <div>
          <div css={hashTagsCss}>
            {item.tags.map((tag, index) => {
              return <Hashtag key={index}>{tag}</Hashtag>;
            })}
          </div>
          <div css={dateCss}>{formatYYYYMMDD(item.date)}</div>
        </div>
      </div>
    </div>
  );
}

const cardCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 4px ${theme.color.boxShadow};
`;

const thumbnailCss = (theme: Theme) => css`
  width: inherit;
  height: 160px;
  overflow: hidden;
  background-color: ${theme.color.thumbnail};

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const textCardCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  gap: 10px;
  padding: 1.25rem;
  background-color: ${theme.color.white};
  box-shadow: 0 1px 4px ${theme.color.cardContentShadow} inset;
`;

const detailAnchorCss = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const detailCss = (theme: Theme) => css`
  ${theme.common.flex_column};
  gap: 10px;

  > .title {
    ${theme.typography.title3};
    color: ${theme.color.black};
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  > .content {
    ${theme.typography.body3};
    color: ${theme.color.subText};
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const hashTagsCss = css`
  display: flex;
  gap: 6px;
`;

const dateCss = (theme: Theme) => css`
  ${theme.typography.body3};
  color: ${theme.color.subText};
  padding-top: 10px;
`;
