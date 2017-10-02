import json
import requests
import time
import urllib
import responses
from dbhelper import DBHelper
from credentials import *
db = DBHelper()

TOKEN = CRED_TOKEN
URL = CRED_URL.format(TOKEN)


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
def response(updates, INDEX={}):
    print INDEX
    for update in updates["result"]:
        try:
            text = update["message"]["text"]
            chat = update["message"]["chat"]["id"]
            if chat in INDEX:
                index = INDEX[chat]
            else:
                index = 1
            print index, text
            X = responses.conversation(text, index)
            print X
            INDEX[chat] = X[1]
            send_message(X[0], chat)
        except KeyError:
            pass
        return INDEX

def send_message(text, chat_id):
    text = urllib.quote_plus(text)
    url = URL + "sendMessage?text={}&chat_id={}".format(text, chat_id)
    get_url(url)

def main():
    last_update_id = None
    INDEX = {}
    while True:
        updates = get_updates(last_update_id)
        if len(updates["result"]) > 0:
            last_update_id = get_last_update_id(updates) + 1
            INDEX = response(updates, INDEX)
        time.sleep(1)

if __name__ == '__main__':
    main()
