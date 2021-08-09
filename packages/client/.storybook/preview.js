import * as nextImage from 'next/image';
import { useEffect, useState } from 'react';

Object.defineProperty(nextImage, 'default', {
  value: (props) => {
    const { width, height } = props;
    const quotient = height / width;
    const paddingTop = isNaN(quotient) ? '100%' : `${quotient * 100}%`;

    let wrapperStyle;
    let sizerStyle;
    let sizerSvg;
    let imgStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      boxSizing: 'border-box',
      padding: 0,
      border: 'none',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      minWidth: '100%',
      maxWidth: '100%',
      minHeight: '100%',
      maxHeight: '100%',
      objectFit: props.objectFit ? props.objectFit : undefined,
      objectPosition: props.objectPosition ? props.objectPosition : undefined,
    };

    const regex = new RegExp(/https?/);

    const [toBase64, setToBase64] = useState('');

    useEffect(() => {
      /**
       * 画像サイズ最適化
       */
      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = (e) => reject(e);
          img.src = src;
        });
      };
      loadImage(props.src)
        .then((res) => {
          sizerSvg = `<svg width="${res.width}" height="${res.height}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
          setToBase64(Buffer.from(sizerSvg).toString('base64'));
        })
        .catch(() => {
          throw new Error('画像読み込みエラー');
        });
    }, []);

    if (width !== undefined && height !== undefined && props.layout !== 'fill') {
      if (props.layout === 'responsive') {
        wrapperStyle = {
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          boxSizing: 'border-box',
          margin: 0,
        };
        sizerStyle = {
          display: 'block',
          boxSizing: 'border-box',
          paddingTop,
        };
      } else if (props.layout === 'intrinsic' || props.layout === undefined) {
        wrapperStyle = {
          display: 'inline-block',
          maxWidth: '100%',
          overflow: 'hidden',
          position: 'relative',
          boxSizing: 'border-box',
          margin: 0,
        };
        sizerStyle = {
          boxSizing: 'border-box',
          display: 'block',
          maxWidth: '100%',
        };
        sizerSvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
      } else if (props.layout === 'fixed') {
        wrapperStyle = {
          overflow: 'hidden',
          boxSizing: 'border-box',
          display: 'inline-block',
          position: 'relative',
          width,
          height,
        };
      }
    } else if (width === undefined && height === undefined && props.layout === 'fill') {
      wrapperStyle = {
        display: 'block',
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        boxSizing: 'border-box',
        margin: 0,
      };
    } else if (!regex.test(props.src)) {
      // importされた画像かのチェックsrcが相対パスの場合はエラーにしない
      wrapperStyle = {
        display: 'inline-block',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0,
      };
      sizerStyle = {
        boxSizing: 'border-box',
        display: 'block',
        maxWidth: '100%',
      };
      imgStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        boxSizing: 'border-box',
        padding: 0,
        border: 'none',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        minWidth: '100%',
        maxWidth: '100%',
        minHeight: '100%',
        maxHeight: '100%',
      };
      sizerSvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
    } else {
      throw new Error(
        `Image with src "${props.src}" must use "width" and "height" properties or "layout='fill'" property.`,
      );
    }

    return (
      <div style={wrapperStyle}>
        {sizerStyle ? (
          <div style={sizerStyle}>
            {sizerSvg ? (
              <img
                style={{ maxWidth: '100%', display: 'block' }}
                alt={props.alt}
                aria-hidden={true}
                role='presentation'
                src={`data:image/svg+xml;base64,${toBase64}`}
              />
            ) : null}
          </div>
        ) : null}
        <img {...props} decoding='async' style={imgStyle} />
      </div>
    );
  },
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
