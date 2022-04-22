# API を使って JIRA にタスクを作る

よく作るタスクをテキストファイルとして持っておいて、API で JIRA に登録する  
毎スプリントやるタスクなどに利用する

JIRA のオートメーションで同じことができるはずだが story point が入らないなど扱えないことがあったのでスクリプトを作成

## 環境設定

`.env` を書き通り作成して接続設定などをする

```txt
JIRA_DOMAIN = <attlasian server domain>
JIRA_API_USERNAME = <username>
JIRA_API_TOKEN = <api token>
JIRA_STORY_POINT_FIELD = <custom field id for story point>
```

もしくは同じ内容を環境変数として設定する

## usage

| script | args | description |
| --- | --- | --- |
| getSprint | プロジェクトキー | 未来のスプリントの一覧を表示する |
| createTask | 登録するタスクファイルの入っているフォルダ、プロジェクトキー | 指定したフォルダのタスクをバックログに作成する |
| moveTaskToSpring | スプリント ID 、タスクキー（複数） |　指定したタスクをバックログからスプリントに移動する |

```bash
# プロジェクト設定で確認できる「キー」を指定
npx tsc; node ./dist/cli/getSprints.js PrjKey
# task-folder はタスクファイルの入っているフォルダ
# 399 は上記で取得したスプリントの id。ここで指定したスプリントにタスクが移動される
node ./dist/cli/createTask.js task-folder PrjKey | awk '{print $(NF)}' | xargs node dist/cli/moveTaskToSprint.js 399

```

タスクファイルは「タスクタイトル_タスクタイプ名_ストーリーポイント.md」で命名して中身は「説明」フィールドに設定される

### ファイル名の例

テストタスク_タスク_3.md

とすると、「テストタスク」というタイトルの「タスク」チケットがストーリポイント 3 で作成されます

## 参考

### リンク

<https://docs.atlassian.com/jira-software/REST/7.3.1/>

issue 作るならこれで良さそう。ただ、sprint には入らなそう
<https://developer.atlassian.com/server/jira/platform/jira-rest-api-examples/#creating-an-issue-examples>

まず issue を作ってから sprint に移動する事になる？
<https://community.atlassian.com/t5/Jira-questions/JIRA-REST-API-how-to-move-issue-to-sprint/qaq-p/1140746>

これか？
<https://developer.atlassian.com/cloud/jira/software/rest/api-group-sprint/#api-rest-agile-1-0-sprint-sprintid-issue-post>

カスタムフィールドの参照はこれ。 story point の設定で必要だった
<https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-group-issue-fields>

### API トークンの管理ページ

<https://id.atlassian.com/manage-profile/security/api-tokens>

### JIRA_STORY_POINT_FIELD 環境変数に設定する値

JIRA の story point のフィールドがカスタムフィールドになっていて組織ごとに違うような気がするため
フィールドの ID を環境変数で設定するようにしていいる

フィールドの ID は API で取得して、「環境設定」の項の通りに環境変数として設定する必要がある

```bash
# 例
curl --request GET \
  --url 'https://your-domain.atlassian.net/rest/api/3/field' \
  --user 'email@example.com:<api_token>' \
  --header 'Accept: application/json'

# 大量に返ってくるので jq などでクエリした方が良い
cat res.json | cat tmp.json| jq '.[] | select(.name == "Story point estimate")'
```

## todos

- [ ] `npm install`でコマンドとしてインストールできるようにしたい
