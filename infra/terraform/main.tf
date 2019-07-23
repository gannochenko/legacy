provider "kubernetes" {}

module "app_api" {
  source = "../../app.api/infra/terraform/"
}
