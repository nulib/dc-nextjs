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
  platform               = "WEB_DYNAMIC"
  enable_basic_auth      = var.app_username != "" ? true : false
  basic_auth_credentials = base64encode("${var.app_username}:${var.app_password}")

  enable_auto_branch_creation   = true
  enable_branch_auto_build      = true
  enable_branch_auto_deletion   = true
  auto_branch_creation_patterns = ["preview/*"]
  auto_branch_creation_config {
    enable_auto_build = true
  }

  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
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
      custom_rule,
      basic_auth_credentials
    ]
  }

  environment_variables = {
    ENV                        = var.environment_name
    JWT_TOKEN_SECRET           = var.jwt_token_secret
    NEXT_PUBLIC_DCAPI_ENDPOINT = var.next_public_dcapi_endpoint
    NEXT_PUBLIC_DC_URL         = var.next_public_dc_url
    _LIVE_UPDATES              = "[{ \"name\" : \"Next.js version\", \"pkg\" : \"next-version\", \"type\" : \"internal\", \"version\" : \"latest\" }]"
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

data "aws_route53_zone" "app_zone" {
  name = var.dns_zone
}

resource "aws_route53_zone" "hosted_zone" {
  name = "${var.project}.${var.dns_zone}"
}

resource "aws_route53_record" "dc_next_dns" {
  zone_id = data.aws_route53_zone.app_zone.id
  name    = "${var.project}.${var.dns_zone}"
  type    = "NS"
  ttl     = "900"
  records = aws_route53_zone.hosted_zone.name_servers
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
