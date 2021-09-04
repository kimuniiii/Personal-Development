## ガントチャート

[Notion | 個人開発](https://www.notion.so/51c38e11e05243e4b604f99577747392?v=79ae887da5784033bdb008443939c7b9)

## システム全体図

<img width="752" alt="システム全体図" src="https://user-images.githubusercontent.com/59758368/130311652-5fdd73b9-368e-4a55-b37f-0bb999c4f3e6.png">

## 環境変数

環境変数は 3 つ用意する

| 環境名           | 環境変数    | 説明             | ブランチ     |
| ---------------- | ----------- | ---------------- | ------------ |
| 本番環境         | production  | 本番環境         | master       |
| ステージング環境 | staging     | ステージング環境 | develop      |
| 開発環境         | development | ローカル開発環境 | feature/〇〇 |

## ステージング環境・本番環境の URL

| 環境名           | URL                                                      |
| ---------------- | -------------------------------------------------------- |
| 本番環境         | https://www.riot-ec-site.com/                            |
| ステージング環境 | develop ブランチに push する毎に新しいドメインを発行する |

## Storybook のデプロイ環境

- Storybook の Github Pages へ自動デプロイを設定
- GitHub に push と同時に生成された Storybook の静的ファイルが gh-pages ブランチに自動デプロイされる
- なので、常に最新の状態の Storybook が下記 URL で確認できる

[Storybook | デプロイ環境](https://kimuniiii.github.io/Personal-Development/?path=/story/common-button--basic)

## フロントエンドのデプロイ環境

- フロントエンドのデプロイ先は「Vercel」を選択
- Vercel は ZEIT 社が提供するフロントエンド向けのホスティングサービスです

[フロントエンド | デプロイ環境](https://personal-development-client-kzbe79r2h-kimuniiii.vercel.app/top)

## バックエンドのローカル環境

- Hasura を Docker で立ち上げている
- Docker Desktop を ON にした上で以下のコマンドを叩く

```bash
# コンテナを立ち上げて起動する
yarn server start

# コンテナが起動しているか確認する
yarn server ps
```

### Hasura GraphQL Engine を Docker コンテナ環境で動かす

[バックエンド | ローカル環境](http://localhost:8080/console)

上記工程で、ローカル環境上で Hasura のコンソール画面を見ることができます

## バックエンドのデプロイ環境

- バックエンドのデプロイ先は「Heroku」を選択（予定）
- Heroku は Salesforce 社が提供する「インフラ管理が不要な PaaS」です

## 技術選定（暫定）

### Backend

- TypeScript
- NestJS
- Prisma
- GraphQL
- Hasura

### Frontend

- React
- TypeScript
- Next.js
- GraphQL Code Generator
- Apollo Client
- Emotion

### Other

- yarn workspace
- Storybook
- GitHub Actions
- ESLint / Prettier / husky
- Docker / Docker Compose
- Vercel
- Heroku
