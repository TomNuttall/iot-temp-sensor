from diagrams import Cluster, Diagram, Edge
from diagrams.aws.general import User
from diagrams.aws.network import Route53, CloudFront, APIGateway
from diagrams.aws.storage import S3
from diagrams.aws.security import ACM, IAM
from diagrams.aws.compute import Lambda
from diagrams.aws.management import Cloudwatch
from diagrams.aws.database import Dynamodb
from diagrams.aws.iot import IotCore, IotMqtt, IotRule, IotBoard
from diagrams.programming.framework import React
from diagrams.onprem.ci import GithubActions

with Diagram("", filename="aws_architecture-diagram", outformat="png"):
  user = User("User")
  github_action_s3 = GithubActions("Github Action")
  github_action_lambda = GithubActions("Github Action")
  iot_device = IotBoard("esp32 Temp Sensor")
    
  with Cluster("AWS"):
    route_53 = Route53("Route53")
    iam_role_s3 = IAM("IAM")
    iam_role_lambda = IAM("IAM")

    with Cluster("FrontEnd"):
        cdn = CloudFront("CloudFront")
        with Cluster(""):
          s3_bucket = S3("S3") 
          s3_bucket - React("React App")

        cdn >> ACM("ACM")
        cdn >> s3_bucket

    cluster_att = { "bgcolor": "transparent", "pencolor": "transparent" }
    with Cluster("", graph_attr=cluster_att):
      with Cluster("Backend"):
        api = APIGateway("API Gateway")
        lambda_function = Lambda("Lambda")
        ddb = Dynamodb("Dynamo DB")
      
        api >> [ACM("ACM"), lambda_function]

        lambda_function >> Cloudwatch("CloudWatch")
        lambda_function >> Edge(label="Query table by date") >> ddb

        with Cluster("IoT"):
          iot_mq = IotMqtt("IoT MQTT") 
          iot_mq >> IotCore("IoT Core") >> IotRule("IoT Rule") >> ddb

    route_53 >> [cdn, api]

  user >> route_53

  iot_device >> Edge(label="Temperature sensor sends average every 30 mins") >> iot_mq

  github_action_s3 >> Edge(taillabel="\t\tGets bucket role") >> iam_role_s3
  github_action_s3 >> Edge(taillabel="\t\tDeploys frontend code to s3 and invalidate cloudfront cache") >> s3_bucket

  github_action_lambda >> Edge(taillabel="'\t\tGets lambda role") >> iam_role_lambda
  github_action_lambda >> Edge(taillabel="\t\tDeploys lambda") >> lambda_function

    
