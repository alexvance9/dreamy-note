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
    dream4 = Dream(
        title='Ahab Dream', date=date(2022, 10, 24), body='“Such a queer dream, King-Post, I never had. You know the old man’s ivory leg, well I dreamed he kicked me with it; and when I tried to kick back, upon my soul, my little man, I kicked my leg right off! And then, presto! Ahab seemed a pyramid, and I like a blazing fool, kept kicking at it. But what was still more curious, Flask—you know how curious all dreams are—through all this rage that I was in, I somehow seemed to be thinking to myself, that after all, it was not much of an insult, that kick from Ahab. ‘Why,’ thinks I, ‘what’s the row? It’s not a real leg, only a false one.’ And there’s a mighty difference between a living thump and a dead thump. That’s what makes a blow from the hand, Flask, fifty times more savage to bear than a blow from a cane. The living member—that makes the living insult, my little man. And thinks I to myself all the while, mind, while I was stubbing my silly toes against that cursed pyramid—so confoundedly contradictory was it all, all the while, I say, I was thinking to myself, ‘what’s his leg now, but a cane—a whale-bone cane. Yes,’ thinks I, ‘it was only a playful cudgelling—in fact, only a whaleboning that he gave me—not a base kick. Besides,’ thinks I, ‘look at it once; why, the end of it—the foot part—what a small sort of end it is; whereas, if a broad footed farmer kicked me, there’s a devilish broad insult. But this insult is whittled down to a point only.’ But now comes the greatest joke of the dream, Flask. While I was battering away at the pyramid, a sort of badger-haired old merman, with a hump on his back, takes me by the shoulders, and slews me round. ‘What are you ’bout?’ says he. Slid! man, but I was frightened. Such a phiz! But, somehow, next moment I was over the fright. ‘What am I about?’ says I at last. ‘And what business is that of yours, I should like to know, Mr. Humpback? Do you want a kick?’ By the lord, Flask, I had no sooner said that, than he turned round his stern to me, bent over, and dragging up a lot of seaweed he had for a clout—what do you think, I saw?—why thunder alive, man, his stern was stuck full of marlinspikes, with the points out. Says I on second thought, ‘I guess I won’t kick you, old fellow.’ ‘Wise Stubb,’ said he, ‘wise Stubb;’ and kept muttering it all the time, a sort of eating of his own gums like a chimney hag. Seeing he wasn’t going to stop saying over his ‘wise Stubb, wise Stubb,’ I thought I might as well fall to kicking the pyramid again. But I had only just lifted my foot for it, when he roared out, ‘Stop that kicking!’ ‘Halloa,’ says I, ‘what’s the matter now, old fellow?’ ‘Look ye here,’ says he; ‘let’s argue the insult. Captain Ahab kicked ye, didn’t he?’ ‘Yes, he did,’ says I—‘right here it was.’ ‘Very good,’ says he—‘he used his ivory leg, didn’t he?’ ‘Yes, he did,’ says I. ‘Well then,’ says he, ‘wise Stubb, what have you to complain of? Didn’t he kick with right good will? it wasn’t a common pitch pine leg he kicked with, was it? No, you were kicked by a great man, and with a beautiful ivory leg, Stubb. It’s an honor; I consider it an honor. Listen, wise Stubb. In old England the greatest lords think it great glory to be slapped by a queen, and made garter-knights of; but, be your boast, Stubb, that ye were kicked by old Ahab, and made a wise man of. Remember what I say; be kicked by him; account his kicks honors; and on no account kick back; for you can’t help yourself, wise Stubb. Don’t you see that pyramid?’ With that, he all of a sudden seemed somehow, in some queer fashion, to swim off into the air. I snored; rolled over; and there I was in my hammock!', dreamer_id=1
    )
    dream5 = Dream(
        title='wave', date=date(2022, 9, 24), body='another dream about a big wave', dreamer_id=2
    )
    dream6 = Dream(
        title='more waves', date=date(2023, 1, 23), body='this time the waves started small and got bigger', dreamer_id=3
    )
    dream7 = Dream(
        title='boat', date=date(2023, 1, 22), body='i was in a boat on top of the giant wave looking out at the city it was about to destroy', dreamer_id=1
    )
    dream8 = Dream(
        title='Another Freaky Dream', date=date(2023, 1, 21), body='many spiders', dreamer_id=2
    )
    dream9 = Dream(
        title='A Really Freaky Dream', date=date(2023, 1, 20), body='zombies were chasing me through an alien spaceshipo but i was having fun', dreamer_id=3
    )
    dream10 = Dream(
        title='Nice Dream', date=date(2023, 1, 20), body='We had a picnic under a tree and you ate all the grapes.', dreamer_id=1
    )
    dream11 = Dream(
        title='shopping', date=date(2023, 1, 20), body="i was shopping but the store changed everytime i blinked and i couldn't find anything", dreamer_id=2
    )
    dream12 = Dream(
        title='Harry Dream', date=date(2023, 1, 19), body='Voldemort was up to no good', dreamer_id=3
    )
    dream13 = Dream(
        title='Freaky Dream', date=date(2023, 1, 19), body='Bowie was in Space AGAIN', dreamer_id=1
    )
    dream14 = Dream(
        title='Another Freaky Dream', date=date(2023, 1, 18), body='Bowie was in Space ANOTHER TIME', dreamer_id=2
    )
    dream15 = Dream(
        title='A Really Freaky Dream', date=date(2023, 1, 17), body='Bowie was in Space YET AGAIN', dreamer_id=3
    )

    dreams = [dream1, dream2, dream3, dream4, dream5, dream6, dream7, dream8, dream9, dream10, dream11, dream12, dream13, dream14, dream15]
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