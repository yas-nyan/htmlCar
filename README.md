# HTMLCAR
　様々な端末やアプリケーションから同時に車両情報にアクセスできるプラットフォームを構築します。
　OBD2ポートを通したCAN通信を行うモジュールをDragonBoadに取り付けることでWEBサーバーとして車両情報を公開する端末を実装し、複数のインターフェース・アプリケーションから同時に車両情報を取得できる環境を実現します。
　このシステムは従来のプラットフォームと比べて大きく分けて2つの優位点が期待されます。
　一つめに挙げられるのが、一つの車載器で複数のサービスが運用可能になる点です。従来の車両情報を扱うサービスは、各サービスごとに車載器を取り付ける必要がありました。例えば自動車保険・拡張メーター・走行ロガーの３つのサービスを動かそうとすると３つの車載器が必要でした。しかしながら今回構築するプラットフォームでは、WEBAPIの形で車両情報をRESTfulに提供するので一つの車載器で複数のアプリケーションを同期的に動作させることが可能になります。これはユーザー・デベロッパーの双方の障壁を緩和することに繋がります。
　二つ目に挙げられるのが車両の安全性が担保される点です。従来の環境ではユーザーの端末から直接車両にアクセスすることが可能になるため、意図しない挙動を引き起こす可能性があります。しかしながら今回の環境では一度DragonBoadのWEBサーバーをプロキシするので、車両ECUへの意図しない書き込みを防ぐ事ができます。

関連
HTML5 vehicle-information-api
https://www.w3.org/TR/2016/WD-vehicle-information-api-20160119/
# 概要
様々な端末やアプリケーションから同時に車両情報にアクセスできるプラットフォームを構築します
* HTML5 Vehicle Information APIを擬似的に再現する端末を作る

## 背景
* 車両情報を使ったサービスは従来までも存在したが、サービスごとに別の端末を装着しなくてはならない→ユーザー側の不利益
→アプリをインストールするだけで新しいサービスを初められるようにしたい
* ELM３２７の情報を料理するのが面倒くさい→デベロッパー側の不利益
* 同時に複数の端末をつけるのは出来ない

# 目的
* 車両情報をつかったサービスを作りやすくして社会に普及させたい


# 手法
./sumally.key

# ゴール
* 車両情報をスマホやPCのブラウザから見れるようにする。
## 活用方法
* 追加メーター
* カーナビアプリ
* 自動車保険
* 運転adviser的なｗ
* 走行ログ収集アプリ的なｗ
* 複数でドライブする時に他の車輌の情報を取得して可視化するアプリ（ツーリング支援）



# 担当分け

* ドラゴンボードまわり、サーバー
→豊田

* ~~Chrome~~**Firefox**拡張
→村田

* ケース作りとかプレゼンとかペルソナづくりとか見栄え担当
→生駒



# 実装
それぞれW3Cのドラフトの通りの名前です。

車
|
| Vehicle Signal Specification(VSS)
|
API サーバー WebSocket Vehicle Information Service (WVIS)
|
| Vehicle Information Service Specification (VISS)
|
JSライブラリ
|
| Vehicle Information API Specification (VIAS)
|
なんかアプリケーション

## Vehicle Signal Specification(VSS)
* 今回はELM327との接続になるので、それようのコードを使う。
* Vehicle Dataを参照して、OBD2PIDとの辞書を作ってhoge.jsonにしておく。

###  実装
* Node.js モジュール
* 下記のものを^^パクる^^参考にする。
https://www.npmjs.com/package/bluetooth-obd
https://www.npmjs.com/package/obd-parser-serial-connection



## WebSocket Vehicle Information Service (WVIS)
https://w3c.github.io/automotive/vehicle_data/vehicle_information_service.html
###  実装
* Node.js 
* 普通のWSのサーバーを作る
## Vehicle Information Service Specification (VISS)
https://w3c.github.io/automotive/vehicle_data/vehicle_information_service.html

## Vehicle Information API  Specification (VIAS)
http://rawgit.com/w3c/automotive/master/vehicle_data/vehicle_spec.html
###  実装
* JSライブラリ（本当はWEBIDLで作るべき）
* 今回はただVehicleっていう名前空間に宣言するJSのファイルにする。


## Vehicle Data 
https://w3c.github.io/automotive/vehicle_data/data_spec.html

###  実装
* OBD2PIDとの辞書を作ってhoge.jsonにしておく。
* とりあえず読み込みだけなので、命令の部分はVSSでは決め打ちにする。