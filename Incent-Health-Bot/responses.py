import nltk
import random

SurveyStarter = ' Are you ready for some survey questions? (Enter Yes or No). If you would like to talk to your careteam in person, enter \'Talk\', someone  will call as soon as possible.'

Question1 = '''On a scale from 1 to 10, how would you grade your craving for a cigarette today? (Enter a number, e.g. 2)'''
Question2 = '''May I ask what do you do to keep the craving minimal? (e.g. nicotine patch, excercise, hanging out with friends, ect.) '''
Question3 = """ Did you smoke today? (Enter Yes or No.) Remember that your care team is not here to judge you, they are here to help.  A \'Yes\' answer to this question will NOT harm you in any shape or form """
Question4 = 'Would you classify is as 1. peer pressure, 2. stress from work and life in general, 3. withdrawn symptoms, 4. others. Please select one or more options e.g 1 or 1, 2'

smokefreeurl = 'https://smokefree.gov/#618_intro'

yes_responses = ['maybe','yes', 'y', '1', 'ok', 'alright', 'sure']
no_responses = ['no','n', '0', 'not']

REPEAT_INQUIRIES = ['Sorry? ', 'Friend, I would appreciate real input. ', 'You\'re funny, but I would like real input. ' ]

def start(sentence):
    if sentence == '\start':
        return ("I'm IncentHealth Bot! Glad to meet you! Are you ready for some survey questions?", 2, None, None)
    else:
        return ('', 1, None, None)

def check_for_greeting(sentence):
    """If any of the words in the user's input was a greeting, return a greeting response"""
    GREETING_KEYWORDS = ("hello", "hi", "greetings", "sup", "what's up", "hey")
    GREETING_RESPONSES = ["Hello!", "Hi!", "Greetings!", "Hello! Glad to hear from you!", "Hey!" ]
    for word in sentence.split():
        if word.lower() in GREETING_KEYWORDS:
            greetings = random.choice(GREETING_RESPONSES)
            return (greetings + SurveyStarter, 2, None, None)
        else:
            return ('Greetings!' + SurveyStarter, 2, None, None)


def argree_to_survey(sentence):
    sentence = [word.lower() for word in sentence.split()]

    if 'talk' in sentence:
        return('Alright, I will remind the careteam to call you.', 'responsetogradtitude', None, None)
    elif any(x in sentence for x in yes_responses):
        return (Question1,  3, None, None)
        #return ('On a scale from 1 to 10, how would you grade your craving for a cigarette today? (Enter a number, i.e. 2)', 3)
    elif any(x in sentence for x in no_responses):
        return ('Alright, when you are ready, text me \'Hi\' and we can start again.', 1, None, None)
    else:
        repeat = random.choice(REPEAT_INQUIRIES)
        return (repeat +  Question1, 2, None, None)


def assess_craving(sentence):
    sentence = [word.lower() for word in sentence.split()]
    try:
        integers = [int(x) for x in sentence]
    except:
        integers = []
    if len(integers) == 1:
        if integers[0] in  range(1, 5, 1):
            #return ('Great! May I ask what do you do to keep the craving minimal? (i.e. nicotine patch, excercise, hanging out with friends, ect.)', 4)
            return ('Great! ' + Question2, 4, ['craving_level'], [integers[0]])
        elif integers[0]  in range(5, 8, 1):
            return ('It is normal for you to have such craving, we totally understand. Overcoming such craving is not easy at all. ' + Question3, 5, ['craving_level'], [integers[0]])
        elif integers[0] in range(8, 11, 1):
            return ('It must be hard to resist such craving. ' + Question3, 5, ['craving_level'], [integers[0]])
        else:
            repeat = random.choice(REPEAT_INQUIRIES)
            return ( repeat + 'Please enter a number from 1 to 10', 3, None, None)
    else:
        repeat = random.choice(REPEAT_INQUIRIES)
        return (repeat + 'Please enter a number from 1 to 10', 3, None, None)

def positive_activities(sentence):
    sentence = [word.lower() for word in sentence.split()]
    nicotine_substitution = ['nicotine', 'patch']
    socializing = ['friend', 'friends', 'buddy', 'buddies', 'family', 'companion', 'companions', 'classmate', 'workmate']
    excercise = ['excercise', 'yoga', 'meditation', 'weight', 'music', 'book', ]
    working = ['work']
    D={}
    positive_activities = ['nicotine_patch', 'socializing', 'working', 'excercise', 'other_positive']
    for x in positive_activities:
        D[x] = 0
    if any(str(x) in sentence for x in nicotine_substitution):
        D['nicotine_patch']= 1

    if any(str(x) in sentence for x in socializing):
        D['socializing'] = 1

    if any(str(x) in sentence for x in excercise):
        D['excercise']  = 1

    if any(str(x) in sentence for x in working):
        D['working'] = 1

    if not any(D[x] == 1 for x in ['nicotine_patch', 'socializing', 'working', 'excercise']):
        D['other_positive']  = 1

    return ('Great!' + Question3, 5, positive_activities, [D[x] for x in positive_activities])

def smoked(sentence):
    sentence = [word.lower() for word in sentence.split()]
    if any(x in sentence for x in yes_responses):
        return ('Alright, let\'s walk through it together to see if you can do better tomorrow. Tell me more about the time when you decided to have a cigarette', 6, ['smoked'], [1])
    elif any(x in sentence for x in no_responses):
        return ('You are on track to quit smoking. I am very proud of you! Keep up the good work! I will check back with you soon! Have a nice one', 0, ['smoked'], [0])
    else:
        repeat = random.choice(REPEAT_INQUIRIES)
        return ( repeat + 'Please enter Yes or No.', 5, None, None)
def negative_activities_primer(sentence):
    return ('Sorry to hear that!' + Question4, 7, None, None)

def negative_activities(sentence):
    sentence = [word.lower() for word in sentence.split()]
    D={}
    negative_activities = ['peer_pressure', 'withdrawn_symptoms', 'stress', 'other_negative']
    for x in negative_activities:
        D[x]  = 0
    if '1' in sentence:
        D['peer_pressure'] = 1
    if '2' in sentence:
        D['stress'] = 1
    if '3' in sentence:
        D['withdrawn_symptoms'] = 1
    if '4' in sentence:
        D['other_negative'] = 1
    if not any(D[x] ==1 for x in negative_activities):
        repeat = random.choice(REPEAT_INQUIRIES)
        return(repeat + Question4 , 7, None, None )
    else:
        return('That\'s is hard. May I suggest you visit this website for more info: %s' %smokefreeurl, 8, negative_activities, [D[x] for x in negative_activities])


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
    elif index == 6:
        return negative_activities_primer(sentence)
    elif index == 7:
        return negative_activities(sentence)
    else:
        return ('Thanks for taking the time to talk to me!', 0, None, None)


