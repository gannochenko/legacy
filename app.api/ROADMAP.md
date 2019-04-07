* Transactions in resolvers and migrations
* Stored validators
* Regexp validator
* Float type support
* Locales
* Field type altering
* Finish all connections before schema alteration
* Support created_at, updated_at, created_by, updated_by fields
* Clever filtering support
* Support querying of only selected fields in find() and get()
* Support "count" in find()
* [DONE] Support sorting in find()
* [DONE] Support limit-offset in find()
* Make code cleaner, remove duplication
* Hooks

Tech debts:

1) backend still does not use database when reading a schema
2) schema classes are duplicate, across applications (see shared/ folder)
