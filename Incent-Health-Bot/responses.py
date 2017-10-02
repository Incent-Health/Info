import nltk
import random

Question1 = '''On a scale from 1 to 10, how would you grade your craving for a cigarette today? (Enter a number, e.g. 2)'''
Question2 = '''May I ask what do you do to keep the craving minimal? (e.g. nicotine patch, excercise, hanging out with friends, ect.) '''
Question3 = """ Did you smoke today? (Enter Yes or No.) Remember that your care team is not here to judge you, they are here to help.  A \'Yes\' answer to this question will NOT harm you in any shape or form """

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
            return (greetings + ' Are you ready for some survey questions? (Enter Yes or No)', 2)
        else:
            return ('Greetings! Are you ready for some survey questions? (Enter Yes or No)', 2)


def argree_to_survey(sentence):
    sentence = [word.lower() for word in sentence.split()]
    if 'yes' in sentence:
        return (Question1,  3)
        #return ('On a scale from 1 to 10, how would you grade your craving for a cigarette today? (Enter a number, i.e. 2)', 3)
    elif 'no' in sentence:
        return ('Alright, when you are ready, text me \'Hi\' and we can start again', 1)
    else:
        return ('Sorry? Are you ready for some survey questions? Please enter Yes or No', 2 )


def assess_craving(sentence):
    sentence = [word.lower() for word in sentence.split()]
    if any(str(x) in sentence for x in range(1, 5, 1)):
        #return ('Great! May I ask what do you do to keep the craving minimal? (i.e. nicotine patch, excercise, hanging out with friends, ect.)', 4)
        return ('Great! ' + Question3, 4)
    elif any(str(x) in sentence for x in range(5, 8, 1)):
        return ('It is normal for you to have such craving, we totally understand. Overcoming such craving is not easy at all. ' + Question3, 5)
    elif any(str(x) in sentence for x in range(8, 11, 1)):
        return ('It must be hard to resist such craving. ' + Question3, 5)
    else:
        return ('Please enter a number from 1 to 10', 3)

def positive_activities(sentence):
    sentence = [word.lower() for word in sentence.split()]
    nicotine_substitution = ['nicotine', 'patch']
    socializing = ['friend', 'friends', 'buddy', 'buddies', 'family', 'companion', 'companions', 'classmate', 'workmate']
    excercise = ['excercise', 'yoga', 'meditation', 'weight', 'music', 'book', ]
    if any(str(x) in sentence for x in nicotine_substitution):
        return ('Great!' + Question3, 5)

    elif any(str(x) in sentence for x in socializing):
        return ('Great!' + Question3, 5)

    elif any(str(x) in sentence for x in excercise):
        return ('Great!' + Question3, 5)

    else:
        return ('Great!' + Question3, 5)
def smoked(sentence):
    sentence = [word.lower() for word in sentence.split()]
    if 'yes' in sentence:
        return ('Alright, let\'s walk through it together to see if you can do better tomorrow. Tell me more about the time when you decided to have a cigarette', 6)
    elif 'no' in sentence:
        return ('You are on track to quit smoking. I am very proud of you! Keep up the good work! I will check back with you soon! Have a nice one', 7)
    else:
        return ('Sorry? Please enter Yes or No.', 5)

def conversation(sentence, index = 0):
    if index == 0:
        return  start(sentence)
    elif index == 1:
        return check_for_greeting(sentence)
    elif index ==2:
        return argree_to_survey(sentence)
    elif index == 3:
        return assess_craving(sentence)
    elif index == 4:
        return positive_activities(sentence)
    elif index == 5:
        return smoked(sentence)
    else:
        return ('Thanks for taking the time to talk to me!', 0)






