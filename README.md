開発サーバー
```
npm run dev
```

ビルド
```
NOD_ENV=production npm run build
```

デプロイ
```
aws s3 sync --delete --profile <profile> out s3://<bucket>/nagano_gomi_calendar_web
```