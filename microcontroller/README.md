# microcontroller

## Requirements

- [ESP32](https://www.az-delivery.uk/products/esp32-d1-r32-board)
- [Temperature Sensor](https://thepihut.com/products/waterproof-ds18b20-digital-temperature-sensor-extras)
- [Arduino IDE](https://www.arduino.cc/en/software)

Some additional libraries are required

## Circuit Diagram

<img
  src='../docs/esp32_circuit-diagram.svg'
  raw=true
  alt='Circuit Diagram'
  height="300px"
  width="auto"
/>

## Certificate

This can't be generated in CloudFormation and must be done in the AWS Console or CLI \

- [AWS IoT Certificate Guide](https://docs.aws.amazon.com/iot/latest/developerguide/device-certs-create.html)

### Defines

Create a lib\defs.h file with WIFI details, AWS IoT endpoint and AWS IoT certificate details.

```cpp
#ifndef DEFS_H
#define DEFS_H

#include <pgmspace.h>

static const char *WIFI_SSID = "";
static const char *WIFI_PASSWORD = "";

const char AWS_IOT_ENDPOINT[] = "";

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

Connect device
