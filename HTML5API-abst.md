# 参考文献
In-Vehicle Infotainment：車載インフォテインメントも絡めた話
https://html5experts.jp/yhori/6710/
http://itpro.nikkeibp.co.jp/atcl/column/14/080600036/080700003/?rt=nocnt
> IVIはインテルが提唱した、In-Vehicle Infortainmentの略で、車の中の情報とエンターテイメントを指します。Infortainmentとは、InformationとEntertainmentを組み合わせた造語です。

>Vehicle Informationは、エンジンの状態、オイルの状態、ライトのステータスなど、様々な情報を扱います
>Vehicle Entertainmentは、例えば、車内で音楽が聞けたり映画が見れたりすることです
>つまり、IVIとは車の情報とエンターテイメントを提供するものです。

>実際には、デバイスの制御はnavigatorオブジェクトが行い、JavaScriptの世界から、C++で書かれているGeckoの世界を繋ぐ必要があります。
>その実装は、インターフェイス定義言語のWebIDLを使用しています。WebIDLでインターフェイスを定義し、インターフェイスで定義したメソッドを実装します。例えば、車載でギアの情報を取得する際にも同様の手順で実装すればよいでしょう。


次世代車載情報通信システム（In-Vehicle Infotainment system，IVIシステム） スマートドライブによる無限の可能性を開発 未来の新テクノロジーに、ドライブ･イン！
http://www.technical-direct.com/jp/2013-12/%E6%AC%A1%E4%B8%96%E4%BB%A3%E8%BB%8A%E8%BC%89%E6%83%85%E5%A0%B1%E9%80%9A%E4%BF%A1%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%EF%BC%88in-vehicle-infotainment-system%EF%BC%8Civi%E3%82%B7%E3%82%B9%E3%83%86/


W3Cの解説
https://www.w3.org/2016/Talks/0130-web+auto-ka/

Automotiveワーキンググループ
https://www.w3.org/auto/wg/wiki/Main_Page
サービス全体をまとめたドラフト

https://w3c.github.io/automotive/vehicle_data/vehicle_information_service.html
Vehicle Information Access APIのドラフト
http://rawgit.com/w3c/automotive/master/vehicle_data/vehicle_spec.html
Vehicle Data
http://rawgit.com/w3c/automotive/master/vehicle_data/data_spec.html


実際に作ったらしい
http://monoist.atmarkit.co.jp/mn/articles/1601/22/news039.html


Tizenが車載HTMLAPIを激しく意識してる
http://monoist.atmarkit.co.jp/mn/articles/1309/20/news023_2.html
* Automotive Message Broker（amb）
> 車両データを受け取るハードウェア部から車載情報機器のアプリケーション層に車両データが届くまで冗長な流れになってしまうが、入出力をプラグイン化することで、プラットフォーム提供者は入力プラグインに、アプリケーション提供者は出力プラグインに開発を注力することができるようになる。また、車両データを出力する側とアプリケーション層の結合強度が疎結合になるという利点も生まれる。

車とスマホ連携のプラットフォーム（基盤）「スマートデバイスリンク」（SDL）

http://headlines.yahoo.co.jp/hl?a=20170104-00010003-newswitch-ind


* AndroidAutoはどうやら車速パルスを取ってるっぽい
http://www.phileweb.com/review/article/201607/22/2167_3.html
> パナソニックによれば「グーグル側でどう使うかは不明だが、USBを介して車両側で供給される車速パルスを送信する仕様にはしている」とのこと。つまり、Android Autoでは車速パルスも反映した測位を実現していたことになる。これはスマートフォンで使うナビアプリとしても画期的なことだ。

* carplay
http://current-life.com/technology/apple-carplay/



# HTML VehicleAPIとは
* 車両から取得できる情報を、HTMLの標準機能で扱えるようにするための規格
* In-Vehicle Infotainmentの一つ。
ex.Android Auto,CarPlayはスマートフォンを車両で使うための連携って感じ
http://www.android.com/intl/ja_jp/auto
http://www.apple.com/jp/ios/carplay/


## 使い所
* 自動車に搭載される端末

## 特徴
* 
* OS,端末を選ばない。