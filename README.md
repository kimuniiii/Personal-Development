## Storybook のデプロイ環境

- Storybook の Github Pages へ自動デプロイを設定
- GitHub に push と同時に生成された Storybook の静的ファイルが gh-pages ブランチに自動デプロイされる
- なので、常に最新の状態の Storybook が下記 URL で確認できる

[Storybook | デプロイ環境](https://kimuniiii.github.io/Personal-Development/?path=/story/common-button--basic)

## フロントエンドのデプロイ環境

- フロントエンドのデプロイ先は「Vercel」を選択
- Vercel は ZEIT 社が提供するフロントエンド向けのホスティングサービスです

[フロントエンド | デプロイ環境](https://personal-development-client-kzbe79r2h-kimuniiii.vercel.app/top)

## バックエンドのデプロイ環境

- バックエンドのデプロイ先は「Heroku」を選択（予定）
- Heroku は Salesforce 社が提供する「インフラ管理が不要な PaaS」です

## 技術選定（暫定）

### Backend

- NestJS
- Prisma
- GraphQL
- Hasura

### Frontend

- React
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
