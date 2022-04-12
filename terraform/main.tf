terraform {
  backend "s3" {
    key    = "dc-nextjs.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["amplify.amazonaws.com"]
    }
  }
}


resource "aws_amplify_app" "dc-next" {
  name                   = "dc-next"
  repository             = "https://github.com/nulib/dc-nextjs"
  iam_service_role_arn   = aws_iam_role.dc_next_amplify_role.arn
  access_token           = var.access_token
  enable_basic_auth      = true
  basic_auth_credentials = base64encode("${var.app_username}:${var.app_password}")

  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT
  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }

  environment_variables = {
    ENV                        = var.environment_name
    NEXT_PUBLIC_DCAPI_ENDPOINT = var.next_public_dcapi_endpoint
    TEST                       = "test"

  }
}

resource "aws_iam_role" "dc_next_amplify_role" {

  name                = "${var.project}-role"
  assume_role_policy  = join("", data.aws_iam_policy_document.assume_role.*.json)
  managed_policy_arns = ["arn:aws:iam::aws:policy/AdministratorAccess-Amplify"]
}

resource "aws_amplify_branch" "production" {
  app_id                      = aws_amplify_app.dc-next.id
  branch_name                 = "deploy/staging"
  framework                   = "Next.js - SSR"
  stage                       = "PRODUCTION"
  enable_pull_request_preview = true
  enable_auto_build           = true

}




resource "aws_amplify_branch" "develop" {
  app_id       = aws_amplify_app.dc-next.id
  branch_name  = "2815-terraform-setup"
  display_name = "2815-terraform-setup"

  enable_auto_build           = true
  framework                   = "Next.js - SSR"
  stage                       = "DEVELOPMENT"
  enable_pull_request_preview = true
  tags                        = {}

  # lifecycle {
  #   ignore_changes = [framework]
  # }
}
