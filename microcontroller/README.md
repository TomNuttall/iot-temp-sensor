# Data Source
**Esp32 microcontroller connected to a temperature sensor**

## Overview
- Core 1 Task
  -  Reads temperature once a minute.
- Core 2 Task
  - Publishes MQTT message with average temperature every 30 mins.
- AWS IoT Core Topic Rule adds message to DynamoDB table.

## Hardware

- [ESP32](https://www.az-delivery.uk/products/esp32-d1-r32-board)
- [Temperature Sensor](https://thepihut.com/products/waterproof-ds18b20-digital-temperature-sensor-extras)

## Requirements

- [Arduino IDE](https://www.arduino.cc/en/software)
- [ESP32 Driver](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)

Board Manager

- [esp32 Board Manager](https://dl.espressif.com/dl/package_esp32_index.json)

Some additional libraries are required

- [Onewire](https://www.arduino.cc/reference/en/libraries/onewire/)
- [DallasTemperature](https://www.arduino.cc/reference/en/libraries/dallastemperature/)
- [MQTT](https://www.arduino.cc/reference/en/libraries/mqtt/)
- [ArduinoJson](https://www.arduino.cc/reference/en/libraries/arduinojson/)

## Circuit Diagram

<img
  src='../docs/esp32_circuit-diagram.svg'
  raw=true
  alt='Circuit Diagram'
  height="300px"
  width="auto"
  style="background-color: white"
/>

## Certificate

This can't be generated in CloudFormation and must be done in the AWS Console or CLI and downloaded once.

- [AWS IoT Certificate Guide](https://docs.aws.amazon.com/iot/latest/developerguide/device-certs-create.html)

### Defines

- Create a lib\defs.h file in sketch folder
- Add in WIFI details, AWS IoT endpoint and AWS IoT certificate details.

```cpp
#ifndef DEFS_H
#define DEFS_H

#include <pgmspace.h>

// WIFI
static const char WIFI_SSID[] = "";
static const char WIFI_PASSWORD[] = "";

// AWS IOT
static const char IOT_THINGNAME[] = "";
static const char IOT_PUBLISH_TOPIC[] = "";
static const char IOT_ENDPOINT[] = "";

// Amazon Root CA 1
static const char AWS_CERT_CA[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----
)EOF";

// Device Certificate
static const char AWS_CERT_CRT[] PROGMEM = R"KEY(
-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----
)KEY";

// Device Private Key
static const char AWS_CERT_PRIVATE[] PROGMEM = R"KEY(
-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----
)KEY";

#endif
```

## Upload Sketch

- Connect device with a usb data cable.
- Select the 'ESP32 Dev Module' board in tools.
- Change upload speed to 115200.
- Can then upload and flash the esp32.
- Serial Monitor in ArduinoIDE can be used for monitoring logs.
