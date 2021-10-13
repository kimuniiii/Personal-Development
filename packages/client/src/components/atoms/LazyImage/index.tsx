import { css, keyframes, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import React, { VFC, useEffect, useRef, useState } from 'react';

import 'intersection-observer';

type LazyImageProps = {
  src: string;
  alt: string;
  width: `${number}px`;
  height: `${number}px`;
  borderRadius?: string;
  animation?: boolean;
};

/**
 * @概要 スクロールして特定の位置に来たら画像を読み込むコンポーネント
 */
export const LazyImage: VFC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  borderRadius,
  animation = true,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const imageRef = useRef<HTMLImageElement>(null!);
  const [imageSrc, setImageSrc] = useState('/images/white.png');

  let observer: IntersectionObserver;

  console.log('再レンダリング確認用');

  useEffect(() => {
    if (imageRef.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry) => {
            // 画像が画面内に入ってきたらpropsで渡したsrc属性に更新をかける
            // TODO : 画像が画面内に入ってきても画像が描画されない場合がある
            if (entry.intersectionRatio > 0 && entry.isIntersecting) {
              console.log('setImageSrcの前 | 画像が画面内に入ってきたらここの処理が走る');
              setImageSrc(src);
              console.log('setImageSrcの後 | 画像が画面内に入ってきたらsrcが更新される');
              // 交差を監視したい要素の「observe」を解除する
              // observer.unobserve(imageRef.current);
              // if (observer && observer.unobserve) {
              //   observer.unobserve(imageRef.current);
              // }
            }
          });
        },
        {
          rootMargin: '0px',
        },
      );
      // 交差を監視したい要素を「observe」する
      observer.observe(imageRef.current);
    }

    return (): void => {
      if (observer && observer.unobserve && imageRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(imageRef.current);
      }
    };
  }, [src, imageRef]);

  /**
   * @概要 画像が読み込まれた時にアニメーションを適用させるイベントハンドラ
   */
  const onImageLoad = (event: React.ChangeEvent<HTMLImageElement>): void => {
    event.target.classList.add('image-loaded');
  };

  return (
    <StImage
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      onLoad={onImageLoad}
      borderRadius={borderRadius}
      animation={animation}
    />
  );
};

const loaded = keyframes`
  0% {
      opacity: 0.1;
  }

  100% {
      opacity: 1.0;
  }
`;

const StImage = styled.img<Omit<LazyImageProps, 'src' | 'alt'>>`
  display: block;
  /* 画面幅に応じて画像がリサイズされるように設定 */
  width: ${({ width }): `${number}px` => width};
  height: ${({ height }): `${number}px` => height};
  object-fit: contain;
  border-radius: ${({ borderRadius }): string => borderRadius ?? '3px'};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  ${({ animation }): SerializedStyles | null => {
    return animation
      ? css`
          &.image-loaded {
            animation: ${loaded} 0.8s ease-out;
          }
        `
      : null;
  }}
`;
