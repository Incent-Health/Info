import sqlite3
import pickle
import os
import pandas as pd
import datetime
import numpy as np


class DBHelper:
    def __init__(self, dbname="todo.sqlite"):
        self.dbname = dbname
        self.conn = sqlite3.connect(dbname)

    def setup(self):
        stmt = "CREATE TABLE IF NOT EXISTS items (description text)"
        self.conn.execute(stmt)
        self.conn.commit()

    def add_item(self, item_text):
        stmt = "INSERT INTO items (description) VALUES (?)"
        args = (item_text, )
        self.conn.execute(stmt, args)
        self.conn.commit()

    def delete_item(self, item_text):
        stmt = "DELETE FROM items WHERE description = (?)"
        args = (item_text, )
        self.conn.execute(stmt, args)
        self.conn.commit()

    def get_items(self):
        stmt = "SELECT description FROM items"
        return [x[0] for x in self.conn.execute(stmt)]

class Database(object):
    def __init__(self, my_file=None):
        if my_file == None:
            raise NameError('Need to pass my_file variable to load or save responses')
        self.savefile = my_file
        '''start database or loading existing database'''
        if os.path.isfile(self.savefile):
            self.df = pd.read_csv(self.savefile, index_col = 0)
        else:
            self.generate_dataframe()
    def generate_dataframe(self):
        # These are the dates (from the startdate of the pateint when the survey is administered)
        # These dates are probably too many for the modeling but there are ways to reduce the number of variable (taking the max, average, PCA, ect)
        intervals = [0, 1, 2, 3, 4, 7, 10] + [x*7 for x in range(2, 55, 1)]
        # Five catergories that are probably helpful in term of reducing craving and temptation to smoke
        positive_activities = ['nicotine_patch', 'socializing', 'working', 'excercise', 'other_positive']
        # Four catergories that probably increase the tempation to smoke
        negative_activities = ['peer_pressure', 'withdrawn_symptoms', 'stress', 'other_negative']
        # Craving level are nummerical from 1-10, whether the patient smoked is 0 or 1
        target_variables = ['craving_level', 'smoked']
        interval_vars = positive_activities + negative_activities + target_variables
        # each day where the survey is administer, all positive activities, negative activities and target variables are recorded.
        # Note that if patient do not response, every thing will remain nan.
        columns = ['day%d_%s' %(x, y) for x in intervals for y in interval_vars]
        self.df = pd.DataFrame(columns = ['start_date'] + columns)
    def add_user(self, user):
        '''
        Add users
        '''
        startdate = datetime.date.today()
        self.df.loc[user] = [str(startdate)] + [np.nan] * (len(self.df.columns) - 1)

    def record_user(self, user, field, value):
        '''
        Online updating the users
        '''
        today = datetime.datetime.now()
        startdate = datetime.datetime.strptime(self.df.loc[user, 'start_date'],'%Y-%m-%d')
        interval = (today - startdate).days
        for i, f in enumerate(field):
            col = 'day%d_%s' %(interval, f)
            self.df.loc[user, col] = value[i]


    def save_database(self):
        self.df.to_csv(self.savefile, sep=',')
