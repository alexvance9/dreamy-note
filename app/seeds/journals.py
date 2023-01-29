from app.models import db, Journal, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_journals():
    journal1 = Journal(
        title='Journal #1', dreamer_id=1
    )
    journal2 = Journal(
        title='Greece Trip', dreamer_id=1
    )
    journal3 = Journal(
        title='Freshman Year', dreamer_id=2
    )
    journal4 = Journal(
        title='Journal #1', dreamer_id=2
    )
    journal5 = Journal(
        title='Good Dreams', dreamer_id=3
    )
    journal6 = Journal(
        title='Bad Dreams', dreamer_id=3
    )
   
    journals = [journal1, journal2, journal3, journal4, journal5, journal6]
    [db.session.add(journal) for journal in journals]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_journals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.journals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM journals")
        
    db.session.commit()