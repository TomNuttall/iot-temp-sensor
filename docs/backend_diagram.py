from diagrams import Cluster, Diagram, Edge
from diagrams.aws.general import User
from diagrams.aws.network import Route53, APIGateway
from diagrams.aws.security import ACM, IAM
from diagrams.aws.compute import Lambda
from diagrams.aws.management import Cloudwatch
from diagrams.aws.database import Dynamodb
from diagrams.aws.iot import IotCore, IotMqtt, IotRule, IotBoard
from diagrams.onprem.ci import GithubActions

with Diagram("", filename="backend_diagram", outformat="png"):
  user = User("User")
  github_action_lambda = GithubActions("Github Action")
  iot_device = IotBoard("esp32 Temp Sensor")
    
  with Cluster("AWS"):
    route_53 = Route53("Route53")
    iam_role_lambda = IAM("IAM")

    cluster_att = { "bgcolor": "transparent", "pencolor": "transparent" }
    with Cluster("", graph_attr=cluster_att):
      with Cluster("Backend"):
        api = APIGateway("API Gateway")
        
        lambda_function = Lambda("Lambda")
        ddb = Dynamodb("Dynamo DB")
       
        api >> lambda_function
        api - ACM("ACM")

        lambda_function >> Cloudwatch("CloudWatch")
        lambda_function >> Edge(label="Query table by date") >> ddb

        with Cluster("IoT"):
          iot_mq = IotMqtt("IoT MQTT") 
          iot_mq >> IotCore("IoT Core") >> IotRule("IoT Rule") >> ddb

    route_53 >> api

  user >> Edge(label="Get temperature data") >> route_53

  iot_device >> Edge(label="Temperature sensor sends average every 30 mins") >> iot_mq

  github_action_lambda >> iam_role_lambda
  github_action_lambda >> Edge(label="Deploys lambda") >> lambda_function

    
