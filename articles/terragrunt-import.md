---
title: 'Terragruntで既存リソースをStateにImportする方法をまとめる'
description: 'Terragruntを利用して既存のGCPリソースをImportする方法を紹介します。'
date: 2024-04-01
category: terragrunt
thumbnail: 'terragrunt-import.png'
---

## TerragruntのImport

Terraformを管理しやすくするツールTerragruntを利用して、既存リソースをImportする方法を紹介します。

Terragruntで作成したリソースではなく、過去に手動で作成したしまったリソースをTerragruntで管理するために取り込む方法です。

## CloudSQLを作成する

今回はCloudSQLをGCP上にGcloudコマンドで作成して、そのCloudSQLをTerragruntにimportします。

そのため、まずはCloudSQLをGCloudコマンドで作成します。

```bash
$ gcloud sql instances create import-test \
--region=asia-northeast1 \
--tier=db-f1-micro \
--database-version=MYSQL_8_0_31 \
--project=<Project Name>
```

上記コマンドを実行して、CloudSQLをGCPプロジェクト上に作成します。

## Terragruntのソースコードを作成する

CloudSQLの作成が完了したため、Terragruntのソースコードを作成します。

```bash
include "root" {
  path = find_in_parent_folders()
}

terraform {
  source = "tfr:///terraform-google-modules/sql-db/google//modules/mysql?version=20.0.0"
}

inputs = {
  project_id       = <GCP Project ID>
  name             = "import-test"
  tier             = "db-f1-micro"
  region           = "asia-northeast1"
  database_version = "MYSQL_8_0_31"
  enable_default_db = false
  enable_default_user = false
}
```

CloudSQL用のTerragruntファイルを用意しました。

最低限必要なinputを入力し、moduleはCommunity Moduleを利用しています。 (Terragruntの初期セットアップに関しては公式サイトを参照してください。)

### Planを実行する

Importを実行する前に`terragrunt plan`を実行して、正常にTerragruntが動作するかを確かめます。

```bash
$ terragrunt plan
Acquiring state lock. This may take a few moments...
data.google_compute_zones.available[0]: Reading...
data.google_compute_zones.available[0]: Read complete after 0s [id=projects/terragrunt-experiment-project/regions/asia-northeast1]

Terraform used the selected providers to generate the following execution
plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # google_sql_database_instance.default will be created
  + resource "google_sql_database_instance" "default" {
      + available_maintenance_versions = (known after apply)
      + connection_name                = (known after apply)
      + database_version               = "MYSQL_8_0_31"
      + deletion_protection            = true
      + dns_name                       = (known after apply)
      + encryption_key_name            = (known after apply)
      + first_ip_address               = (known after apply)
      + id                             = (known after apply)
      + instance_type                  = (known after apply)
      + ip_address                     = (known after apply)
      + maintenance_version            = (known after apply)
      + master_instance_name           = (known after apply)
      + name                           = "import-test"
      + private_ip_address             = (known after apply)
      + project                        = "terragrunt-experiment-project"
      + psc_service_attachment_link    = (known after apply)
      + public_ip_address              = (known after apply)
      + region                         = "asia-northeast1"
      + self_link                      = (known after apply)
      + server_ca_cert                 = (sensitive value)
      + service_account_email_address  = (known after apply)

      + settings {
          + activation_policy           = "ALWAYS"
          + availability_type           = "REGIONAL"
          + connector_enforcement       = "NOT_REQUIRED"
          + deletion_protection_enabled = false
          + disk_autoresize             = true
          + disk_autoresize_limit       = 0
          + disk_size                   = 10
          + disk_type                   = "PD_SSD"
          + edition                     = "ENTERPRISE"
          + pricing_plan                = "PER_USE"
          + tier                        = "db-f1-micro"
          + user_labels                 = (known after apply)
          + version                     = (known after apply)

          + backup_configuration {
              + binary_log_enabled             = true
              + enabled                        = true
              + start_time                     = (known after apply)
              + transaction_log_retention_days = (known after apply)
            }

          + ip_configuration {
              + enable_private_path_for_google_cloud_services = false
              + ipv4_enabled                                  = true
              + ssl_mode                                      = (known after apply)
            }

          + maintenance_window {
              + day          = 1
              + hour         = 23
              + update_track = "canary"
            }
        }

      + timeouts {
          + create = "30m"
          + delete = "30m"
          + update = "30m"
        }
    }

  # null_resource.module_depends_on will be created
  + resource "null_resource" "module_depends_on" {
      + id       = (known after apply)
      + triggers = {
          + "value" = "0"
        }
    }

  # random_password.user-password will be created
  + resource "random_password" "user-password" {
      + bcrypt_hash = (sensitive value)
      + id          = (known after apply)
      + keepers     = {
          + "name" = "import-test"
        }
      + length      = 32
      + lower       = true
      + min_lower   = 1
      + min_numeric = 1
      + min_special = 0
      + min_upper   = 1
      + number      = true
      + numeric     = true
      + result      = (sensitive value)
      + special     = false
      + upper       = true
    }

Plan: 3 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + additional_users                                  = (sensitive value)
  + generated_user_password                           = (sensitive value)
  + iam_users                                         = []
  + instance_connection_name                          = (known after apply)
  + instance_first_ip_address                         = (known after apply)
  + instance_ip_address                               = (known after apply)
  + instance_name                                     = "import-test"
  + instance_psc_attachment                           = (known after apply)
  + instance_self_link                                = (known after apply)
  + instance_server_ca_cert                           = (sensitive value)
  + instance_service_account_email_address            = (known after apply)
  + instances                                         = (sensitive value)
  + primary                                           = (sensitive value)
  + private_address                                   = (known after apply)
  + private_ip_address                                = (known after apply)
  + public_ip_address                                 = (known after apply)
  + read_replica_instance_names                       = []
  + replicas                                          = (sensitive value)
  + replicas_instance_connection_names                = []
  + replicas_instance_first_ip_addresses              = []
  + replicas_instance_self_links                      = []
  + replicas_instance_server_ca_certs                 = (sensitive value)
  + replicas_instance_service_account_email_addresses = []

─────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't
guarantee to take exactly these actions if you run "terraform apply" now.
```

複数のリソースの作成Planが表示されます。  
-> random_passwordは使用しないのですが、moduleの構造上できてしまうので無視して進めます。

### Terragruntにimportを実行する

Terragruntのソースコード作成とCloudSQLの作成が完了したため、そのCloudSQLを作成したTerragruntでmanageできるようにimportコマンドを実行します。

```bash
$ terragrunt import google_sql_database_instance.default import-test
Acquiring state lock. This may take a few moments...
data.google_compute_zones.available[0]: Reading...
google_sql_database_instance.default: Importing from ID "import-test"...
google_sql_database_instance.default: Import prepared!
  Prepared google_sql_database_instance for import
google_sql_database_instance.default: Refreshing state... [id=projects/terragrunt-experiment-project/instances/import-test]
data.google_compute_zones.available[0]: Read complete after 0s [id=projects/terragrunt-experiment-project/regions/asia-northeast1]

Import successful!

The resources that were imported are shown above. These resources are now in
your Terraform state and will henceforth be managed by Terraform.

Releasing state lock. This may take a few moments...
```

上記のようにimportが正常に完了したことを確認できます。

Import完了後、再度、`terragrunt plan`を実行します。

```bash
$ terragrunt plan
Acquiring state lock. This may take a few moments...
google_sql_database_instance.default: Refreshing state... [id=import-test]
data.google_compute_zones.available[0]: Reading...
data.google_compute_zones.available[0]: Read complete after 1s [id=projects/terragrunt-experiment-project/regions/asia-northeast1]

Terraform used the selected providers to generate the following execution
plan. Resource actions are indicated with the following symbols:
  + create
  ~ update in-place

Terraform will perform the following actions:

  # google_sql_database_instance.default will be updated in-place
  ~ resource "google_sql_database_instance" "default" {
        id                             = "import-test"
        name                           = "import-test"
        # (14 unchanged attributes hidden)

      ~ settings {
          ~ availability_type           = "ZONAL" -> "REGIONAL"
            # (12 unchanged attributes hidden)

          ~ backup_configuration {
              ~ binary_log_enabled             = false -> true
              ~ enabled                        = false -> true
                # (3 unchanged attributes hidden)

                # (1 unchanged block hidden)
            }

          + maintenance_window {
              + day          = 1
              + hour         = 23
              + update_track = "canary"
            }

            # (2 unchanged blocks hidden)
        }

      + timeouts {
          + create = "30m"
          + delete = "30m"
          + update = "30m"
        }
    }

  # null_resource.module_depends_on will be created
  + resource "null_resource" "module_depends_on" {
      + id       = (known after apply)
      + triggers = {
          + "value" = "0"
        }
    }

  # random_password.user-password will be created
  + resource "random_password" "user-password" {
      + bcrypt_hash = (sensitive value)
      + id          = (known after apply)
      + keepers     = {
          + "name" = "import-test"
        }
      + length      = 32
      + lower       = true
      + min_lower   = 1
      + min_numeric = 1
      + min_special = 0
      + min_upper   = 1
      + number      = true
      + numeric     = true
      + result      = (sensitive value)
      + special     = false
      + upper       = true
    }

Plan: 2 to add, 1 to change, 0 to destroy.

Changes to Outputs:
  + generated_user_password                           = (sensitive value)
  ~ instances                                         = (sensitive value)
  ~ primary                                           = (sensitive value)

─────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't
guarantee to take exactly these actions if you run "terraform apply" now.
```

すると、今度はInstanceのAddではなく、Changeの差分が表示されます。

これは正常にimportが成功したため、TerraformのStateファイルにある情報とTerragruntのソースコードの状態が異なるためです。

### Planの差分を埋めていく

正常にterraformリソースのimportが完了したため、Planの差分を埋めていきます。

```bash

include "root" {
  path = find_in_parent_folders()
}

terraform {
  source = "tfr:///terraform-google-modules/sql-db/google//modules/mysql?version=20.0.0"
}

inputs = merge(
  {
    project_id       = <GCP Project ID>
    name             = "import-test"
    tier             = "db-f1-micro"
    region           = "asia-northeast1"
    database_version = "MYSQL_8_0_31"
    enable_default_db = false
    enable_default_user = false

    availability_type = "ZONAL"
    backup_configuration = {
      enabled = false
      binary_log_enabled = false
    }
  }
)

```

変更差分が発生していた`availability_type`, `backup_configuration`の二つを追記しました。

この状態で再度`terragrunt plan`を実行します。

```bash
$ terragrunt plan
Acquiring state lock. This may take a few moments...
google_sql_database_instance.default: Refreshing state... [id=import-test]
data.google_compute_zones.available[0]: Reading...
data.google_compute_zones.available[0]: Read complete after 0s [id=projects/terragrunt-experiment-project/regions/asia-northeast1]

Terraform used the selected providers to generate the following execution
plan. Resource actions are indicated with the following symbols:
  + create
  ~ update in-place

Terraform will perform the following actions:

  # google_sql_database_instance.default will be updated in-place
  ~ resource "google_sql_database_instance" "default" {
        id                             = "import-test"
        name                           = "import-test"
        # (14 unchanged attributes hidden)

      ~ settings {
            # (13 unchanged attributes hidden)

          + maintenance_window {
              + day          = 1
              + hour         = 23
              + update_track = "canary"
            }

            # (3 unchanged blocks hidden)
        }

      + timeouts {
          + create = "30m"
          + delete = "30m"
          + update = "30m"
        }
    }

  # null_resource.module_depends_on will be created
  + resource "null_resource" "module_depends_on" {
      + id       = (known after apply)
      + triggers = {
          + "value" = "0"
        }
    }

  # random_password.user-password will be created
  + resource "random_password" "user-password" {
      + bcrypt_hash = (sensitive value)
      + id          = (known after apply)
      + keepers     = {
          + "name" = "import-test"
        }
      + length      = 32
      + lower       = true
      + min_lower   = 1
      + min_numeric = 1
      + min_special = 0
      + min_upper   = 1
      + number      = true
      + numeric     = true
      + result      = (sensitive value)
      + special     = false
      + upper       = true
    }

Plan: 2 to add, 1 to change, 0 to destroy.

Changes to Outputs:
  + generated_user_password                           = (sensitive value)
  ~ instances                                         = (sensitive value)
  ~ primary                                           = (sensitive value)

─────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't
guarantee to take exactly these actions if you run "terraform apply" now.
```

上記のように、`availability_type`, `backup_configuration`の差分がなくなっていることを確認できます。(maintenance_windowはmoduleの構造上差分が出てしまいますので、このまま行きます。また、Timeoutについては追加されても問題ないため追加の差分が出ていて問題ありません。)

## applyを実行する

Importと差分を埋める作業が完了したため、最後の`terragrunt apply`を実行して、環境を綺麗にしておきます。

```bash
$ terragrunt apply
...
null_resource.module_depends_on: Creating...
null_resource.module_depends_on: Creation complete after 0s [id=7170604298975376845]
google_sql_database_instance.default: Modifying... [id=import-test]
google_sql_database_instance.default: Still modifying... [id=import-test, 10s elapsed]
google_sql_database_instance.default: Modifications complete after 13s [id=import-test]
random_password.user-password: Creating...
random_password.user-password: Creation complete after 0s [id=none]
Releasing state lock. This may take a few moments...

Apply complete! Resources: 2 added, 1 changed, 0 destroyed.

Outputs:

additional_users = <sensitive>
generated_user_password = <sensitive>
iam_users = tolist([])
instance_connection_name = "terragrunt-experiment-project:asia-northeast1:import-test"
instance_first_ip_address = "34.85.1.28"
instance_ip_address = tolist([
  {
    "ip_address" = "34.85.1.28"
    "time_to_retire" = ""
    "type" = "PRIMARY"
  },
])
instance_name = "import-test"
instance_psc_attachment = ""
instance_self_link = "https://sqladmin.googleapis.com/sql/v1beta4/projects/terragrunt-experiment-project/instances/import-test"
instance_server_ca_cert = <sensitive>
instance_service_account_email_address = "p464734795047-lkm70e@gcp-sa-cloud-sql.iam.gserviceaccount.com"
instances = <sensitive>
primary = <sensitive>
private_address = ""
private_ip_address = ""
public_ip_address = "34.85.1.28"
read_replica_instance_names = []
replicas = <sensitive>
replicas_instance_connection_names = []
replicas_instance_first_ip_addresses = []
replicas_instance_self_links = []
replicas_instance_server_ca_certs = <sensitive>
replicas_instance_service_account_email_addresses = []
```

正常にapplyが完了しました。（DBの再起動等が実行されることもなく、サービス影響なしで既存のCloudSQLをTerraformで管理できるようになりました）

念の為、plan差分がなくなっていることも確認します。

```bash
$ terragrunt plan
Acquiring state lock. This may take a few moments...
null_resource.module_depends_on: Refreshing state... [id=7170604298975376845]
data.google_compute_zones.available[0]: Reading...
google_sql_database_instance.default: Refreshing state... [id=import-test]
data.google_compute_zones.available[0]: Read complete after 1s [id=projects/terragrunt-experiment-project/regions/asia-northeast1]
random_password.user-password: Refreshing state... [id=none]

Changes to Outputs:
  ~ instances                                         = (sensitive value)
  ~ primary                                           = (sensitive value)

You can apply this plan to save these new output values to the Terraform
state, without changing any real infrastructure.

─────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't
guarantee to take exactly these actions if you run "terraform apply" now.
```

差分がなくなっています。

## Moduleについて

今回はCommunity Moduleを利用したため、不要な変更差分が出てしまいました。

もし、default-userを作りたくない等の理由がある場合は、自分でTerraform Moduleを作成する必要があります。

## まとめ

Terragruntに既存のリソースをimportする方法を紹介しました。

基本的にはTerraformのソースコードに対して実行するimportと同じやり方ですが、Terragruntユーザーの参考になれば嬉しいです。
