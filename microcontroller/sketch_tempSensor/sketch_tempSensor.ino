#include <OneWire.h>
#include <DallasTemperature.h>
#include <WiFiClientSecure.h>
#include <MQTTClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>

#include <mutex>

#include "lib/defs.h"

#define ONE_WIRE_PIN 18

OneWire oneWire(ONE_WIRE_PIN);
DallasTemperature sensors(&oneWire);

#define AWS_THINGNAME           "tn-demo-iot-esp32"
#define AWS_IOT_PUBLISH_TOPIC   "esp32/pub"

WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(256);

TaskHandle_t Core1Task;
TaskHandle_t Core2Task;

static const int TEMP_READING_DELAY = 60 * 1000;
static const int PUBLISH_READING_DELAY = (60 * 1000) * 30;
static const int MAX_RETRY_COUNT = 50
static const int READING_POOL_SIZE = 30;
int readingPool[READING_POOL_SIZE];
int readingPoolIndex = 0;

std::mutex Mutex;

void setup() {
  Serial.begin(9600);

  xTaskCreatePinnedToCore(
             sensorsTask, 
             "SensorsTask",  
             10000,    
             NULL,   
             1,         
             &Core1Task, 
             0);    

#if DEFS_H
  xTaskCreatePinnedToCore(
             commsTask,
             "CommsTask",  
             10000, 
             NULL,     
             1,        
             &Core2Task,    
             1);    
#endif
}

void loop() {
}

void sensorsTask(void* pvParameters) {
  Serial.print("sensorsTask running on core ");
  Serial.println(xPortGetCoreID());

  sensors.begin();

  while (true) {  
    sensors.requestTemperatures();

    float tempC = sensors.getTempCByIndex(0);
    if (tempC != DEVICE_DISCONNECTED_C) {
      
      Serial.print("Temperature: ");
      Serial.println(tempC);
      {
        std::unique_lock<std::mutex> lock (Mutex);
        readingPool[readingPoolIndex] = tempC;
      }
    } else {
      Serial.println("Device Disconnected");
    }

    readingPoolIndex++;
    if (readingPoolIndex >= READING_POOL_SIZE) {
      readingPoolIndex = 0;
    }
    
    delay(TEMP_READING_DELAY); 
  }
}

#if DEFS_H
void wifiConnect() {

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("Connecting to Wi-Fi");

  int timeoutCounter = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");

    timeoutCounter++;
    if (timeoutCounter >= MAX_RETRY_COUNT) {
      Serial.println("restarting");
      ESP.restart();
    }
  }

  Serial.println(WiFi.localIP());
}

void awsSetuo() {
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);
  client.begin(AWS_IOT_ENDPOINT, 8883, net);

  awsConnect();
}

void awsConnect() {
  if (!client.connected()) {
    Serial.print("Connecting to AWS IOT");

    int timeoutCounter = 0;
    while (!client.connect(AWS_THINGNAME)) {
      delay(500);
      Serial.print(".");
      
      timeoutCounter++;
      if (timeoutCounter >= MAX_RETRY_COUNT) {
        Serial.println("restarting");
        ESP.restart();
      }
    }

    Serial.println("AWS IoT Connected!");
  }
}

void commsTask(void* pvParameters) {
  Serial.print("commsTask running on core ");
  Serial.println(xPortGetCoreID());

  delay(5000);

  wifiConnect();
  awsSetup();

  while (true) {
    {
      std::unique_lock<std::mutex> lock (Mutex);
      float avgTemp = 0.0;
      for (int i = 0; i < READING_POOL_SIZE; ++i) {
        avgTemp += readingPool[i];
      }
      avgTemp /= READING_POOL_SIZE;
    }

    StaticJsonDocument<200> doc;
    doc["temp"] = avgTemp;
    char jsonBuffer[512];
    serializeJson(doc, jsonBuffer); 
    
    awsConnect();
    client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
    Serial.println("Published msg");

    delay(PUBLISH_READING_DELAY);
  }
}
#endif