#!/usr/bin/python3
from spacy.matcher import PhraseMatcher
import spacy
import json
import sys

nlp = spacy.load('pt')

def classifyWords(words):
  try:
    doc = nlp(words)
    def parseJson(element):
      if (element.orth_  in nlp.vocab) == False:
        raise Exception(element.orth_)
      return json.dumps({'word': element.orth_, 'classification': element.pos_ }, ensure_ascii=False)
    classified = list(map(parseJson, doc))

    return classified
  except Exception as error:
    return json.dumps({'error': 'Not found in vocabulary', 'word': error.args[0] }, ensure_ascii=False)

tokens = str(sys.argv[1])
if len(sys.argv) == 3:
  showPrint = sys.argv[2]
else:
  showPrint = ''

if showPrint == 'true':
  print(tokens)

tokens = classifyWords(tokens)

sys.stdout.flush()
print(tokens)
