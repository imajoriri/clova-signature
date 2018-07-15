# GitHub

https://github.com/imajoriri/clova-signature

# pemファイルのインストール（公式より)

以下よりインストールしアプリケーションのどっかにコピー

https://clova-cek-requests.line.me/.well-known/signature-public-key.pem

# 検証方法

applicationId(ExtensionID)とヘッダー情報で送られてくる`SignatureCEK`を検証します。
詳しくは[こちら](https://clova-developers.line.me/guide/#/CEK/References/CEK_API.md#RequestMessageValidation)

```
$ npm install --save clova-cek-requests
```

```js
var sig = require('clv-signature');

var params = {
  keyPath: './signature-public-key.pem',
  applicationId: "co.jp.tekitoo",
  requestBody: event.requestParameters,
  headerSignature: headerSignature,
}

sig.verify(params
```
