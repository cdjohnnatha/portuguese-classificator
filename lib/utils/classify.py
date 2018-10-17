#!/usr/bin/python3
from spacy.matcher import PhraseMatcher
import spacy
import json
import sys

nlp = spacy.load('pt')

def classifyWords(words):
  doc = nlp(words)
  def parseJson(element):
    return json.dumps({'word': element.orth_, 'classification': element.pos_ }, ensure_ascii=False)
  classified = list(map(parseJson, doc))

  return classified

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
