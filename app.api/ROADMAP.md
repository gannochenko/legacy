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

0) don't render "code" editable
1) scroll to error
+++ сохранение
2.1) добавление
2.2) удаление
2.3) кнопка добавления в списке
2.4) попап с кнопками редактирования и удаления в списке
3) scroll to top
5) нотификашки
4) запихать некоторое в модуль


1) backend still does not use database when reading a schema
2) schema classes are duplicate, across applications (see shared/ folder)
3) interlink fields, entities and schema (to prevent from passing "schema" object everywhere)
4) probably move to Yup in server-side validation
5) replace field-type if-s with class implementations
