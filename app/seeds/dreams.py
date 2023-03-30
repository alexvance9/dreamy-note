from app.models import db, Dream, environment, SCHEMA
from datetime import date



def seed_dreams():
    dream1 = Dream(
        title='Big Wave Dream', date=date(2023, 1, 24), body="<p>I had a dream last night where I was surfing on a giant wave. The wave was huge and imposing, but I felt confident and in control. I was riding the wave with ease, feeling the wind in my hair and the rush of adrenaline. Suddenly, the wave transformed into a giant monster, trying to swallow me whole. I was thrown around in the water, feeling helpless and scared. Just when I thought all was lost, a voice called out to me, telling me to have faith and to believe in myself. I closed my eyes and took a deep breath, and when I opened them again, the monster had transformed back into a wave. I rode the wave to the shore, feeling exhilarated and empowered. I woke up feeling like I had faced my fears and come out on top.</p>", dreamer_id=1, journal_id=1
    )
    dream2 = Dream(
        title='Another Freaky Dream', date=date(2023, 1, 24), body='<p>David Bowie was floating around in space. The guys from Flight of the Conchords were there singing about his being in space, and asking him about his freaky dreams.<p>', dreamer_id=1, journal_id=2
    )
    dream3 = Dream(
        title='Ah real monsters!', date=date(2023, 1, 24), body='<p>Last night I dreamt that there were many monsters living in a tiny community under my bed. They were sad about being so misunderstood by the outside world, all the wanted was to lead quiet little monster lives and grow these funny fuzzy fruit trees that sustained them.<p>', dreamer_id=1, journal_id=2
    )
    dream4 = Dream(
        title='Ahab Dream', date=date(2022, 10, 24), journal_id=2,body="<p>Such a queer dream, King-Post, I never had. You know the old man’s ivory leg, well I dreamed he kicked me with it; and when I tried to kick back, upon my soul, my little man, I kicked my leg right off! And then, presto! Ahab seemed a pyramid, and I like a blazing fool, kept kicking at it. But what was still more curious, Flask—you know how curious all dreams are—through all this rage that I was in, I somehow seemed to be thinking to myself, that after all, it was not much of an insult, that kick from Ahab. ‘Why,’ thinks I, ‘what’s the row? It’s not a real leg, only a false one.’ And there’s a mighty difference between a living thump and a dead thump. That’s what makes a blow from the hand, Flask, fifty times more savage to bear than a blow from a cane. The living member—that makes the living insult, my little man. And thinks I to myself all the while, mind, while I was stubbing my silly toes against that cursed pyramid—so confoundedly contradictory was it all, all the while, I say, I was thinking to myself, ‘what’s his leg now, but a cane—a whale-bone cane. Yes,’ thinks I, ‘it was only a playful cudgelling—in fact, only a whaleboning that he gave me—not a base kick. Besides,’ thinks I, ‘look at it once; why, the end of it—the foot part—what a small sort of end it is; whereas, if a broad footed farmer kicked me, there’s a devilish broad insult. But this insult is whittled down to a point only.’ But now comes the greatest joke of the dream, Flask. While I was battering away at the pyramid, a sort of badger-haired old merman, with a hump on his back, takes me by the shoulders, and slews me round. ‘What are you ’bout?’ says he. Slid! man, but I was frightened. Such a phiz! But, somehow, next moment I was over the fright. ‘What am I about?’ says I at last. ‘And what business is that of yours, I should like to know, Mr. Humpback? Do you want a kick?’ By the lord, Flask, I had no sooner said that, than he turned round his stern to me, bent over, and dragging up a lot of seaweed he had for a clout—what do you think, I saw?—why thunder alive, man, his stern was stuck full of marlinspikes, with the points out. Says I on second thought, ‘I guess I won’t kick you, old fellow.’ ‘Wise Stubb,’ said he, ‘wise Stubb;’ and kept muttering it all the time, a sort of eating of his own gums like a chimney hag. Seeing he wasn’t going to stop saying over his ‘wise Stubb, wise Stubb,’ I thought I might as well fall to kicking the pyramid again. But I had only just lifted my foot for it, when he roared out, ‘Stop that kicking!’ ‘Halloa,’ says I, ‘what’s the matter now, old fellow?’ ‘Look ye here,’ says he; ‘let’s argue the insult. Captain Ahab kicked ye, didn’t he?’ ‘Yes, he did,’ says I—‘right here it was.’ ‘Very good,’ says he—‘he used his ivory leg, didn’t he?’ ‘Yes, he did,’ says I. ‘Well then,’ says he, ‘wise Stubb, what have you to complain of? Didn’t he kick with right good will? it wasn’t a common pitch pine leg he kicked with, was it? No, you were kicked by a great man, and with a beautiful ivory leg, Stubb. It’s an honor; I consider it an honor. Listen, wise Stubb. In old England the greatest lords think it great glory to be slapped by a queen, and made garter-knights of; but, be your boast, Stubb, that ye were kicked by old Ahab, and made a wise man of. Remember what I say; be kicked by him; account his kicks honors; and on no account kick back; for you can’t help yourself, wise Stubb. Don’t you see that pyramid?’ With that, he all of a sudden seemed somehow, in some queer fashion, to swim off into the air. I snored; rolled over; and there I was in my hammock!</p>", dreamer_id=1
    )
    dream5 = Dream(
        title='Tsunami again', date=date(2022, 9, 24), body='<p>Another dream about a big wave. This time I was on the top floor of a very tall building that was right on the water line. The waves started small and got bigger and bigger, but no one around me seemed to be concerned when I pointed out the growing waves. Then the wave towered hundreds of feet high and was coming towards us, and I climbed down a ladder into and emergency life raft that was on the side of the building for some reason.</p>', dreamer_id=1, journal_id=2
    )
    dream6 = Dream(
        title='more waves', date=date(2023, 1, 23), body='<p>this time the waves started small and got bigger</p>', dreamer_id=1, journal_id=2
    )
    dream7 = Dream(
        title='Mermaid adventure', date=date(2023, 1, 22), body="<p>I had a dream last night where I was swimming in the ocean. The water was crystal clear and teeming with colorful fish and sea creatures. Suddenly, I was approached by a group of mermaids who invited me to explore the underwater kingdom with them. I followed them down to a castle made of coral and shells, where they crowned me as their queen.I was given a magical trident and was tasked with ruling over the underwater world with fairness and justice. I went on adventures and met many strange and wonderful creatures. I also had to face off against sea monsters and other threats to the kingdom. It was an incredible experience, and I felt like I was living in a fairy tale. I eventually woke up feeling refreshed and inspired by my underwater journey.</p>", dreamer_id=1, journal_id=2
    )
    dream8 = Dream(
        title='Freaky Spider Dream', date=date(2023, 1, 21), body='<p>There were huge amounts of all kinds of spider webs all over my room, but for some reason we decided just to leave them there and cohabitate with them, though I was still very afraid of the spiders.</p>', dreamer_id=1, journal_id=1
    )
    dream9 = Dream(
        title='Alien Chase', date=date(2023, 1, 20), body='<p>zombies were chasing me through an alien spaceship but i was having fun</p>', dreamer_id=1, journal_id=2
    )
    dream10 = Dream(
        title='Dragon Dream', date=date(2023, 1, 20), body="<p>I had a dream last night where I was in a fantastical world filled with talking animals and flying creatures. I was walking down a path and suddenly, a giant dragon appeared and started chasing me. I ran as fast as I could, but the dragon was getting closer and closer. Just as it was about to breathe fire on me, a unicorn appeared and used its magic to whisk me away to safety. I found myself in a castle made of candy and sweets, and a group of friendly animals welcomed me. They told me that I was the chosen one, chosen to defeat the evil sorcerer who was terrorizing the land. I didn't feel confident or capable, but with the help of the talking animals, I set out on an epic quest to save the kingdom. I encountered many challenges along the way, but I was determined to be the hero the kingdom needed</p>", dreamer_id=1, journal_id=2
    )
    dream11 = Dream(
        title='shopping', date=date(2023, 1, 20), body="<p>i was shopping but the store changed everytime i blinked and i couldn't find anything</p>", dreamer_id=1, journal_id=1
    )
    dream13 = Dream(
        title='Flower Dream', date=date(2023, 1, 19), body='<p>Last night I had a dream where I was in a beautiful garden surrounded by flowers. The sun was shining and there was a gentle breeze. I felt at peace and calm, and I remember feeling happy to be surrounded by so much beauty.</p>', dreamer_id=1, journal_id=1
    )

    dreams = [dream1, dream2, dream3, dream4, dream5, dream6, dream7, dream8, dream9, dream10, dream11, dream13]
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