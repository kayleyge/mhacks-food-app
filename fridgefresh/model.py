import sqlite3
import flask
import fridgefresh

def dict_factory(cursor, row):
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}

def get_db():
    
    if 'sqlite_db' not in flask.g:
        db_filename = fridgefresh.app.config['DATABASE_FILENAME']
        flask.g.sqlite_db = sqlite3.connect(str(db_filename))
        flask.g.sqlite_db.row_factory = dict_factory

        flask.g.sqlite_db.execute("PRAGMA foreign_keys = ON")

    return flask.g.sqlite_db