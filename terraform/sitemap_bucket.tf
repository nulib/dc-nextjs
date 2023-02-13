data "aws_iam_policy_document" "allow_sitemap_bucket_access_from_cloudfront" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.sitemap_bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket_policy" "sitemap_bucket" {
  bucket = aws_s3_bucket.sitemap_bucket.id
  policy = data.aws_iam_policy_document.allow_sitemap_bucket_access_from_cloudfront.json
}

resource "aws_s3_bucket" "sitemap_bucket" {
  bucket = "${var.project}-${var.environment_name}-sitemaps"
}

resource "aws_s3_bucket_website_configuration" "sitemap_website" {
  bucket = aws_s3_bucket.sitemap_bucket.bucket

  index_document {
    suffix = "sitemap.xml"
  }
}
