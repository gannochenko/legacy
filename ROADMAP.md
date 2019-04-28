* Transactions in resolvers and migrations
* Stored validators
* Regexp validator
* Float type support
* Locales
* Field type altering
* Finish all connections before schema alteration
* Support created_at, updated_at, created_by, updated_by fields by making stdHooks
* Clever filtering support
* Support querying of only selected fields in find() and get()
* [DONE] Support "count" in find()
* [DONE] Support sorting in find()
* [DONE] Support limit-offset in find()
* Make code cleaner, remove duplication
* Hooks

Tech debts:

0) don't render "code" editable
    1) don't allow to change the code when it is already set
1) scroll to error
+++ сохранение
2.1) добавление
2.2) удаление
2.3) кнопка добавления в списке
2.4) попап с кнопками редактирования и удаления в списке
3) scroll to top
5) нотификашки
4) запихать некоторое в модуль
    1) ew-internals-ui: droppanel, scrollpanel, datepicker, scrolltop, notifications
    2) minimal-common: schema classes are duplicate, across applications (see shared/ folder)
1) backend still does not use database when reading a schema
    1) refactor the entire resolver-generator.js

3) interlink fields, entities and schema (to prevent from passing "schema" object everywhere)
4) probably move to Yup in server-side validation
5) replace field-type if-s with class implementations
6) optimize multiple fields selections
