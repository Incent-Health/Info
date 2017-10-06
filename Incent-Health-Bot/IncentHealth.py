import json
import requests
import time
import urllib
import responses
import os
from os.path import getmtime
import sys
import credentials
from dbhelper import DBHelper, Database
db = DBHelper()


TOKEN = CRED_TOKEN    #Your API token credentials held in external file
URL = CRED_TOKEN.format(TOKEN)    #Your API token credentials held in external file 


def get_url(url):
    response = requests.get(url)
    content = response.content.decode("utf8")
    return content


def get_json_from_url(url):
    content = get_url(url)
    js = json.loads(content)
    return js


def get_updates(offset =None):
    url = URL + "getUpdates?timeout=100"
    if offset:
        url += "&offset={}".format(offset)
    js = get_json_from_url(url)
    return js


def get_last_chat_id_and_text(updates):
    num_updates = len(updates["result"])
    last_update = num_updates - 1
    text = updates["result"][last_update]["message"]["text"]
    chat_id = updates["result"][last_update]["message"]["chat"]["id"]
    return (text, chat_id)

def get_last_update_id(updates):
    update_ids = []
    for update in updates["result"]:
        update_ids.append(int(update["update_id"]))
    return max(update_ids)

def echo_all(updates):
    for update in updates["result"]:
        try:
            text = update["message"]["text"]
            chat = update["message"]["chat"]["id"]
            send_message(text, chat)
        except Exception as e:
            print(e)
def handle_updates(updates):
    for update in updates["result"]:
        try:
            text = update["message"]["text"]
            chat = update["message"]["chat"]["id"]
            items = db.get_items()
            if text in items:
                db.delete_item(text)
                items = db.get_items()
            else:
                db.add_item(text)
                items = db.get_items()
            message = "\n".join(items)
            send_message(message, chat)
        except KeyError:
            pass
def response(updates, USERDB, INDEX={}):
    for update in updates["result"]:
        try:
            text = update["message"]["text"]
            chat = update["message"]["chat"]["id"]
            if not chat in USERDB.df.index:
                USERDB.add_user(chat)
                USERDB.save_database()
            else:
                pass
            if chat in INDEX:
                index = INDEX[chat]
            else:
                index = 1
            X = responses.conversation(text, index)
            print 'user%s:%s' %(chat, text)
            print 'robot_reponse', X
            INDEX[chat] = X[1]
            send_message(X[0], chat)
            if X[2] != None:
                USERDB.record_user(chat, X[2], X[3])
                USERDB.save_database()
        except KeyError:
            pass
        return INDEX

def send_message(text, chat_id):
    text = urllib.quote_plus(text)
    url = URL + "sendMessage?text={}&chat_id={}".format(text, chat_id)
    get_url(url)

def main():
    last_update_id = None
    USERDB = Database(my_file = 'recorded_respond.csv')
    INDEX = {}
    while True:
        updates = get_updates(last_update_id)
        if len(updates["result"]) > 0:
            last_update_id = get_last_update_id(updates) + 1
            INDEX = response(updates, USERDB, INDEX)
        time.sleep(1)

if __name__ == '__main__':
    main()
WATCHED_FILES = [responses.py, dbhelper.py, __file__]
WATCHED_FILES_MTIMES = [(f, getmtime(f)) for f in WATCHED_FILES]
while True:
    for f, mtime in WATCHED_FILES_MTIMES:
        if getmtime(f) != mtime:
            print >>sys.stderr, '-------> restarting'
            os.execv(__file__, ['python'] + sys.argv)
