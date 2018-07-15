var fs = require('fs');
const { createVerify} = require('crypto')

class Signature{
  verify(params){
    var { keyPath, applicationId, requestBody, headerSignature } = params;

    // applicationIdの検証
    this.checkApplicationId(requestBody, applicationId);

    // signatureの検証
    var certificateBody = this.getCertificateBody(keyPath);
    this.checkSignature(certificateBody, headerSignature, JSON.stringify(requestBody) );
  }

  // keypathファイルの中身をテキストで取得
  getCertificateBody(keyPath) {
    if(!keyPath){
      throw new Error('undefined keyPath');
    }
    var certificateBody = fs.readFileSync(keyPath, 'utf8');
    return certificateBody;
  }

  // applicationIDがあっているかの確認
  checkApplicationId(jsonRequestBody, applicationId) {
    if (jsonRequestBody.context.System.application.applicationId !== applicationId) {
      throw new Error('invaild applicationId');
    }
  }

  // signatureを検証
  checkSignature(certificateBody, headerSignature, requestBody) {
    const veri = createVerify('RSA-SHA256');
    veri.update(requestBody, 'utf8');

    if (!veri.verify(certificateBody, headerSignature, 'base64')) {
      throw new Error('invaild signature');
    }
  }
}

module.exports = new Signature();

