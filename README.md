## 

claspを使ってGASプロジェクトを管理します。

## Set UP

### install
```bash
yarn install
```

### auth
```bash
yarn clasp login
```
ブラウザが開くのでgoogleアカウントで認証とアクセス許可をしてください。


### APIを有効にする
https://script.google.com/home/usersettings
にアクセスしてGoogle Apps Script APIをオンにする


### GAS projectを作成
```bash
yarn clasp create
```

### GASをアプリケーションとして設定
GASプロジェクトを開く
```
yarn clasp open
```


### .clasp.json を修正
```
{
  "scriptId": "<your_script_id>",
  "rootDir": "dist"
}
```
上記のようにrootDirを指定します


### Slack Incoming URL
.envのSlack Incoming URLを設定


### Slack Out Commint Token
.envのSLACK_OUT_GOING_TOKENを設定


### build
```
yarn build
```
