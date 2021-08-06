import { css } from '@emotion/react';

export const GLOBAL_STYLE = css`
  /*
  ** 全ての要素に指定した width および height の中で「border」および「padding」を取るように設定
  */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    font-family: 'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', 'メイリオ', Meiryo, sans-serif;
    font-size: 16px;
    color: #222;
  }

  ol,
  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    margin: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    appearance: none;
  }

  input {
    margin: 0;
    border: 0;
    border-radius: 0;
  }

  /*
  ** <input type='number' />の上下の矢印ボタンを非表示にするCSS
  ** 上記と分けて記述しない場合EdgeでCSS Resetが効かなくなるので注意する
  */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    margin: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    appearance: none;
  }
`;
