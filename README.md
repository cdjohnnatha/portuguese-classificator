# portuguese-classificator
A Brazillian Portuguese word classificator api, uses python and nodejs. The Api uses [jsonapi](http://jsonapi.org/examples/) pattern, which
gets the input and split it in tokens **classified in brazilian portuguese**, like adj, noun...

## Dependencies
* Python3
* [Nodejs](https://nodejs.org/en/)
* [Spacy](https://spacy.io/)
**Tutorial of [spacy pt](https://leportella.com/pt-br/2017/11/30/brincando-de-nlp-com-spacy.html)**

## Paths

Path                      | Request Type
---                       | ---         
/api/v1/classification    | POST 

### Usage input example

```
{
  "data":{
    "type": "classification",
    "attributes": {
      "inputText": "Casa suja"
      }
  }
}
```

### Response example

```
{
  "links": {
      "self": "/classification"
  },
  "data": [
    {
      "type": "classifications",
      "attributes": {
          "word": "Casa",
          "classification": "NOUN"
      }
    },
    {
      "type": "classifications",
      "attributes": {
        "word": "suja",
        "classification": "ADJ"
      }
    }
  ]
}
```

