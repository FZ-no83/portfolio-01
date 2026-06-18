
***トランザクション
const client = await pool.connect();

try {
    await client.query("BEGIN");

    ...

    await client.query("COMMIT");

} catch(error) {
    await client.query("ROLLBACK");
}

*** sales_numberの採番

※※※ 商品重複の場合の個数合算

*** リファクタリング！
*** Context化！
*** カスタムHook！


6/8
① トランザクション

const client = await pool.connect();
await client.query("BEGIN");

② サーバー側バリデーション

③ 仕入履歴

④ ダッシュボード

⑤ ログイン


React
├─ ダッシュボード
├─ 販売
├─ 仕入
├─ 履歴
└─ ログイン

Express
├─ JWT認証
├─ 販売API
├─ 仕入API
└─ 集計API

PostgreSQL
├─ stock_list
├─ item_list
├─ sales_list
├─ purchase_list
└─ users

