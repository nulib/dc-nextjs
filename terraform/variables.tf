
variable "access_token" {
  type = string
}

variable "amplify_build_custom_image" {
  type    = string
  default = "amplify:al2023"
}

variable "app_username" {
  type    = string
  default = ""
}

variable "app_password" {
  type    = string
  default = ""
}

variable "auto_branch_creation" {
  type    = bool
  default = true
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "dns_zone" {
  type = string
}

variable "environment_name" {
  type = string
}

variable "honeybadger_api_key" {
  type    = string
}

variable "next_public_dcapi_endpoint" {
  type = string
}

variable "next_public_dc_url" {
  type = string
}


variable "production_branch" {
  type = string
}

variable "project" {
  type = string
}








