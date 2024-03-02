from diagrams import Cluster, Diagram, Edge
from diagrams.aws.general import User
from diagrams.aws.network import Route53, CloudFront
from diagrams.aws.storage import S3
from diagrams.aws.security import ACM
from diagrams.programming.framework import React
from diagrams.onprem.ci import GithubActions

with Diagram("", filename="frontend_diagram", outformat="png"):
  user = User("User")
  github_action_s3 = GithubActions("Github Action")

  with Cluster("AWS"):
    route_53 = Route53("Route53")

    with Cluster("FrontEnd"):
        cdn = CloudFront("CloudFront")
        with Cluster(""):
          s3_bucket = S3("S3") 
          s3_bucket - React("React App")

        cdn - ACM("ACM")
        cdn >> s3_bucket

  user >> route_53 >> cdn

  github_action_s3 >> Edge(label="Deploys react app to S3\n and invalidates cloudfront cache") >> s3_bucket
