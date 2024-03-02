from diagrams import Cluster, Diagram, Edge
from diagrams.aws.database import Dynamodb
from diagrams.aws.iot import IotCore, IotMqtt, IotRule, IotBoard

with Diagram("", filename="iot_diagram", outformat="png"):
  iot_device = IotBoard("esp32 Temp Sensor")
    
  with Cluster("AWS"):

    cluster_att = { "bgcolor": "transparent", "pencolor": "transparent" }
    with Cluster("", graph_attr=cluster_att):
      ddb = Dynamodb("Dynamo DB")
      
      with Cluster("IoT"):
        iot_mq = IotMqtt("IoT MQTT") 
        iot_mq >> IotCore("IoT Core") >> IotRule("IoT Rule") >> ddb

  iot_device >> Edge(label="Temperature sensor sends average every 30 mins") >> iot_mq

    
