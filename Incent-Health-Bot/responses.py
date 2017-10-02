import nltk
import random

# Sentences we'll respond with if the user greeted us


def start(sentence):
    if sentence == '\start':
        return ("I'm IncentHealth Bot! Glad to meet you! Are you ready for some survey questions?", 2)
    else:
        return ('', 1)


def check_for_greeting(sentence):
    """If any of the words in the user's input was a greeting, return a greeting response"""
    GREETING_KEYWORDS = ("hello", "hi", "greetings", "sup", "what's up",)
    GREETING_RESPONSES = ["Hello!", "Hi!", "Greetings!", "Hello! Glad to hear from you!"]
    for word in sentence.split():
        if word.lower() in GREETING_KEYWORDS:
            greetings = random.choice(GREETING_RESPONSES)
            print 'line 19', greetings
            return (greetings + ' Are you ready for some survey questions? (Enter Yes or No)', 2)
        else:
            return (' Are you ready for some survey questions? (Enter Yes or No)', 2)


def argree_to_survey(sentence):
    sentence = [word.lower() for word in sentence.split()]
    if 'yes' in sentence:
        return ('On a scale from 1 to 10, how would you grade your craving for a cigarette today (enter a number, i.e. 2)?', 3)
    elif 'no' in sentence:
        return ('Alright, when you are ready, text me \'Hi\' and we can start again', 1)

    else:
        return ('Sorry? Are you ready for some survey questions? Please enter Yes or No', 2 )


def assess_craving(sentence):
    sentence = [word.lower() for word in sentence.split()]
    if any(str(x) in sentence for x in range(1,11, 1)):
        return ('Thanks!', 4)

    else:
        return ('Please enter a number from 1 to 10', 3)

def conversation(sentence, index = 0):
    if index == 0:
        return  start(sentence)
    elif index == 1:
        return check_for_greeting(sentence)
    elif index ==2:
        return argree_to_survey(sentence)
    elif index == 3:
        return assess_craving(sentence)
    else:
        return ('Thanks for taking the time to talk to me!', 0)






