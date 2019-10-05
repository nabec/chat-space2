# DB設計

## Usersテーブル
|Column|type|options|
|------|----|-------|
|nickname|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups, through: :members

## Messagesテーブル
|Column|type|options|
|------|----|-------|
|text|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## Groupsテーブル
|Column|type|options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :users, through: :members

## Membersテーブル
|Column|type|options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: ture|
|group_id|integer|null:false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group