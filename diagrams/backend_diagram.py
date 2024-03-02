from diagrams import Cluster, Diagram, Edge
from diagrams.aws.general import User
from diagrams.aws.network import Route53, APIGateway
from diagrams.aws.security import ACM
from diagrams.aws.compute import Lambda
from diagrams.aws.management import Cloudwatch
from diagrams.aws.database import Dynamodb
from diagrams.onprem.ci import GithubActions

with Diagram("", filename="backend_diagram", outformat="png"):
  user = User("User")
  github_action_lambda = GithubActions("Github Action")
    
  with Cluster("AWS"):
    route_53 = Route53("Route53")

    cluster_att = { "bgcolor": "transparent", "pencolor": "transparent" }
    with Cluster("", graph_attr=cluster_att):
      with Cluster(""):
        api = APIGateway("API Gateway") 
        api - ACM("ACM")

        with Cluster(""):
          lambda_function = Lambda("Lambda")
          ddb = Dynamodb("Dynamo DB")
        
          api >> lambda_function

          lambda_function >> Cloudwatch("CloudWatch")
          lambda_function >> Edge(label="Query table by date") >> ddb

    route_53 >> api

  user >> Edge(label="Get temperature data") >> route_53

  github_action_lambda >> Edge(label="Deploys lambda") >> lambda_function

    
