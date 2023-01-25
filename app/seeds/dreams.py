from app.models import db, Dream, environment, SCHEMA
from datetime import date



def seed_dreams():
    dream1 = Dream(
        title='Freaky Dream', date=date(2023, 1, 24), body='Bowie was in Space', dreamer_id=1
    )
    dream2 = Dream(
        title='Another Freaky Dream', date=date(2023, 1, 24), body='Bowie was in Space', dreamer_id=2
    )
    dream3 = Dream(
        title='A Really Freaky Dream', date=date(2023, 1, 24), body='Bowie was in Space', dreamer_id=3
    )

    dreams = [dream1, dream2, dream3]
    [db.session.add(dream) for dream in dreams]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_dreams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dreams RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM dreams")
        
    db.session.commit()