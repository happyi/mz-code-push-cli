### add plugin

npm install -g  https://github.com/happyi/mz-code-push-cli.git

配置样例
``
{
  "prod":{
    "name": "yiren-ylh",
    "ios_identifier": "cn.mezeron.yiren",
    "android_identifier": "cn.mezeron.yiren",
    "update": "now",
    "content_url": "http://121.9.234.3/yiren"
  },
  "test":{
      "name": "yiren-ylh-test",
      "ios_identifier": "cn.mezeron.yiren.test",
      "android_identifier": "cn.mezeron.yiren.test",
      "update": "now",
      "content_url": "http://ylh-test.mezeron.cn/yiren"
  }
}
``

环境切换
``
mz-hcp build --dev
mz-hcp build --test
mz-hcp build --prod
``
