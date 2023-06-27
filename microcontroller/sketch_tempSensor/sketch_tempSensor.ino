#include <mutex>

#include <time.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <WiFiClientSecure.h>
#include <MQTTClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>

#include "lib/defs.h"

// Defines
static const int ONE_WIRE_PIN = 18;
static const int TEMP_READING_DELAY = 60 * 1000;
static const int READING_POOL_SIZE = 30;
static const int PUBLISH_READING_DELAY = (TEMP_READING_DELAY) * READING_POOL_SIZE;
static const int MAX_RETRY_COUNT = 50;

// Globals
OneWire oneWire(ONE_WIRE_PIN);
DallasTemperature sensors(&oneWire);

WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(256);

TaskHandle_t Core1Task;
TaskHandle_t Core2Task;
std::mutex Mutex;

int readingPool[READING_POOL_SIZE];
int readingPoolIndex = 0;


void setup() {
  memset(readingPool, 0, READING_POOL_SIZE * sizeof(int));
  Serial.begin(9600);

  xTaskCreatePinnedToCore(
             sensorsTask, 
             "SensorsTask",  
             10000,    
             NULL,   
             1,         
             &Core1Task, 
             0);    

#ifdef DEFS_H
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
  sensors.begin();

  while (true) {  
    sensors.requestTemperatures();

    float tempC = sensors.getTempCByIndex(0);
    if (tempC != DEVICE_DISCONNECTED_C) {
      Serial.print("Reading Temperature: ");
      Serial.println(tempC);
      {
        std::unique_lock<std::mutex> lock (Mutex);
        readingPool[readingPoolIndex] = tempC;

        readingPoolIndex++;
        if (readingPoolIndex >= READING_POOL_SIZE) {
          readingPoolIndex = 0;
        }
      }
    } else {
      Serial.println("Sensor Disconnected");
    }

    delay(TEMP_READING_DELAY); 
  }
}

#ifdef DEFS_H
void wifiConnect() {

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("Connecting to WiFi");

  int timeoutCounter = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");

    timeoutCounter++;
    if (timeoutCounter >= MAX_RETRY_COUNT) {
      Serial.println("Connecting to WiFi Timeout - Restarting");
      ESP.restart();
    }
  }

  Serial.println(WiFi.localIP());

  configTime(0, 0, "pool.ntp.org");
  setenv("TZ", "GMT0BST,M3.5.0/1,M10.5.0", 1);
  tzset();
}

void getTime(char* date, unsigned long& timestamp) {
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return;
  }

  Serial.println(&timeinfo, "%d/%m/%Y %H:%M:%S (%Z %z)");
  strftime(date, 11, "%d/%m/%Y", &timeinfo);

  time_t now;
  time(&now);
  timestamp = now;
}

void awsSetup() {
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);
  client.begin(IOT_ENDPOINT, 8883, net);
}

void awsConnect() {
  if (!client.connected()) {
    Serial.println("Connecting to AWS IOT");

    int timeoutCounter = 0;
    while (!client.connect(IOT_THINGNAME)) {
      delay(500);
      Serial.print(".");
      
      timeoutCounter++;
      if (timeoutCounter >= MAX_RETRY_COUNT) {
        Serial.println("Timeout connected to AWS IoT - Restarting");
        ESP.restart();
      }
    }

    Serial.println("AWS IoT Connected!");
  }
}

void commsTask(void* pvParameters) {
  wifiConnect();
  awsSetup();

  delay(PUBLISH_READING_DELAY);

  while (true) {
    float avgTemp = 0.0;
    {
      std::unique_lock<std::mutex> lock (Mutex);
      for (int i = 0; i < READING_POOL_SIZE; ++i) {
        avgTemp += readingPool[i];
      }
      avgTemp /= READING_POOL_SIZE;
    }

    char date[11];
    unsigned long timeStamp = 0;
    getTime(date, timeStamp);

    StaticJsonDocument<200> doc;
    doc["date"] = date;
    doc["time"] = timeStamp;
    doc["temp"] = avgTemp;
    char jsonBuffer[512];
    serializeJson(doc, jsonBuffer); 
    
    awsConnect();
    client.publish(IOT_PUBLISH_TOPIC, jsonBuffer);
    Serial.print("Published Temperature: ");
    Serial.println(avgTemp);

    delay(PUBLISH_READING_DELAY);
  }
}
#endif