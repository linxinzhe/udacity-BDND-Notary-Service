# Blockchain Data

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.

## Getting Started

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Deploy your project

- Use NPM to install the dependencies.
```
npm install .
```

- Run
```
npm start
```

### Testing
```
npm test
```

## Web Services
### Framework
[express.js](https://expressjs.com/)

### API
##### POST Validate User Request

Endpoint
```
http://localhost:8000/requestValidation
```
Request: 
1. address: your account address
```
Request Example:
{
  "address": you account address
}
```

Response: application/json, JSON Object
1. address: your account address
2. requestTimeStamp: time when you request
3. message: message to sign
4. validationWindow: valid time count down.
```
Response Example:
{
  "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
  "requestTimeStamp": "1532296090",
  "message": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ:1532296090:starRegistry",
  "validationWindow": 300
}
```

##### POST Validate User Message Signature

Endpoint
```
http://localhost:8000/message-signature/validate
```
Request: 
1. address: your account address
2. signature: your message signature
```
Request Example:
{
  "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
  "signature": "H6ZrGrF0Y4rMGBMRT2+hHWGbThTIyhBS0dNKQRov9Yg6GgXcHxtO9GJN4nwD2yNXpnXHTWU9i+qdw5vpsooryLU="
}
```

Response: application/json, JSON Object
1. registerStar: your account address
2. status: validation status
    1. address: your account address
    2. requestTimeStamp: time when you request
    3. message: message to sign
    4. validationWindow: valid time count down.
    5. messageSignature: valid when grant access to register a star
```
Response Example:
{
  "registerStar": true,
  "status": {
    "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
    "requestTimeStamp": "1532296090",
    "message": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ:1532296090:starRegistry",
    "validationWindow": 193,
    "messageSignature": "valid"
  }
}
```

##### POST Add Star Registration

Endpoint
```
http://localhost:8000/block
```
Request: 
1. address: your account address
2. star: star information
    1. dec: declination
    2. ra: right ascension
    3. story: star story
    4. magnitude: [optional]
    5. constellation: [optional]
```
Request Example:
{
  "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
  "star": {
    "dec": "-26° 29' 24.9",
    "ra": "16h 29m 1.0s",
    "story": "Found star using https://www.google.com/sky/"
  }
}
```

Response: application/json, JSON Object
1. hash: block hash
2. height: block height
3. body: block body content
    1. address: your account address
    2. star: star information
        1. dec: declination
        2. ra: right ascension
        3. story: star story
        4. magnitude: magnitude
        5. constellation: constellation
4. time: block create time
5. previousBlockHash: previous block hash
```
Response Example:
{
  "hash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f",
  "height": 1,
  "body": {
    "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
    "star": {
      "ra": "16h 29m 1.0s",
      "dec": "-26° 29' 24.9",
      "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"
    }
  },
  "time": "1532296234",
  "previousBlockHash": "49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
}
```

##### GET Star Block by Address

Endpoint
```
http://localhost:8000/stars/address:{address}
```
Request: None 
```
Request Example:
http://localhost:8000/stars/address:142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ
```

Response: application/json, JSON Array
1. hash: block hash
2. height: block height
3. body: block body content
    1. address: your account address
    2. star: star information
        1. dec: declination
        2. ra: right ascension
        3. story: star story
        4. magnitude: magnitude
        5. constellation: constellation
4. time: block create time
5. previousBlockHash: previous block hash
```
Response Example:
[
  {
    "hash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f",
    "height": 1,
    "body": {
      "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
      "star": {
        "ra": "16h 29m 1.0s",
        "dec": "-26° 29' 24.9",
        "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
        "storyDecoded": "Found star using https://www.google.com/sky/"
      }
    },
    "time": "1532296234",
    "previousBlockHash": "49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
  },
  {
    "hash": "6ef99fc533b9725bf194c18bdf79065d64a971fa41b25f098ff4dff29ee531d0",
    "height": 2,
    "body": {
      "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
      "star": {
        "ra": "17h 22m 13.1s",
        "dec": "-27° 14' 8.2",
        "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
        "storyDecoded": "Found star using https://www.google.com/sky/"
      }
    },
    "time": "1532330848",
    "previousBlockHash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f"
  }
]

```
##### GET Star Block by Hash

Endpoint
```
http://localhost:8000/stars/hash:{hash}
```
Request: None 
```
Request Example:
http://localhost:8000/stars/hash:a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f
```

Response: application/json, JSON Object
1. hash: block hash
2. height: block height
3. body: block body content
    1. address: your account address
    2. star: star information
        1. dec: declination
        2. ra: right ascension
        3. story: star story
        4. magnitude: magnitude
        5. constellation: constellation
4. time: block create time
5. previousBlockHash: previous block hash
```
Response Example:
{
  "hash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f",
  "height": 1,
  "body": {
    "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
    "star": {
      "ra": "16h 29m 1.0s",
      "dec": "-26° 29' 24.9",
      "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
      "storyDecoded": "Found star using https://www.google.com/sky/"
    }
  },
  "time": "1532296234",
  "previousBlockHash": "49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
}
```

##### GET Star Block by Height

Endpoint
```
http://localhost:8000/block/{height}
```
Request: None 
```
Request Example:
http://localhost:8000/block/1
```

Response: application/json, JSON Object
1. hash: block hash
2. height: block height
3. body: block body content
    1. address: your account address
    2. star: star information
        1. dec: declination
        2. ra: right ascension
        3. story: star story
        4. magnitude: magnitude
        5. constellation: constellation
4. time: block create time
5. previousBlockHash: previous block hash
```
Response Example:
{
  "hash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f",
  "height": 1,
  "body": {
    "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
    "star": {
      "ra": "16h 29m 1.0s",
      "dec": "-26° 29' 24.9",
      "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
      "storyDecoded": "Found star using https://www.google.com/sky/"
    }
  },
  "time": "1532296234",
  "previousBlockHash": "49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
}
```