terraform {
  backend "s3" {
    key    = "dc-nextjs.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Key : "Project",
      Value : "dc-next",
    }
  }
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
  platform               = "WEB_COMPUTE"
  enable_basic_auth      = var.app_username != "" ? true : false
  basic_auth_credentials = base64encode("${var.app_username}:${var.app_password}")

  enable_auto_branch_creation   = var.auto_branch_creation
  enable_branch_auto_build      = var.auto_branch_creation
  enable_branch_auto_deletion   = var.auto_branch_creation
  auto_branch_creation_patterns = var.auto_branch_creation ? ["preview/*"] : []
  
  dynamic "auto_branch_creation_config" {
    for_each = var.auto_branch_creation ? toset([1]) : toset([])
    content {
      enable_auto_build = var.auto_branch_creation
    }
  }

  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci --force
        build:
          commands:
            - npm run test:ci && npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  lifecycle {
    ignore_changes = [
      basic_auth_credentials
    ]
  }

  environment_variables = {
    ENV                           = var.environment_name
    HONEYBADGER_API_KEY           = var.honeybadger_api_key
    HONEYBADGER_ENV               = var.environment_name
    NEXT_PUBLIC_DCAPI_ENDPOINT    = var.next_public_dcapi_endpoint
    NEXT_PUBLIC_DC_URL            = var.next_public_dc_url
    NEXT_PUBLIC_DC_SITEMAP_BUCKET = aws_s3_bucket_website_configuration.sitemap_website.website_endpoint
  }

  custom_rule {
    source = "/sitemap.xml"
    target = "/api/sitemap/sitemap.xml"
    status = 200
  }

  custom_rule {
    source = "/sitemap.xml.gz"
    target = "/api/sitemap/sitemap.xml.gz"
    status = 200
  }

  custom_rule {
    source = "/sitemap-<*>"
    target = "/api/sitemap/sitemap-<*>"
    status = 200
  }
}

resource "aws_iam_role" "dc_next_amplify_role" {
  name                = "${var.project}-role"
  assume_role_policy  = join("", data.aws_iam_policy_document.assume_role.*.json)
  managed_policy_arns = ["arn:aws:iam::aws:policy/AdministratorAccess-Amplify"]
}

resource "aws_amplify_branch" "production" {
  app_id                      = aws_amplify_app.dc-next.id
  branch_name                 = var.production_branch
  framework                   = "Next.js - SSR"
  stage                       = "PRODUCTION"
  enable_pull_request_preview = true
  enable_auto_build           = true

}

resource "aws_amplify_domain_association" "dc_next_domain" {
  app_id      = aws_amplify_app.dc-next.id
  domain_name = "${var.project}.${var.dns_zone}"

  sub_domain {
    branch_name = aws_amplify_branch.production.branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.production.branch_name
    prefix      = "www"
  }
}
