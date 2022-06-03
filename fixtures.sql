INSERT INTO users(id, name, created_at, updated_at)
VALUES ('wH4ofWP4EyprKpqQWStn', 'Joaquim', '2014-12-02T16:40:34', '2021-12-03T16:40:34');
INSERT INTO users(id, name, created_at, updated_at)
VALUES ('6jrHnwiHihRNeWqrKirW', 'Rafa', '2014-12-06T16:40:34', '2022-12-03T17:15:00');
INSERT INTO users(id, name, created_at, updated_at)
VALUES ('hpAHdRc8jDLTMw7ikrRH', 'Lúcia', '2022-12-03T16:40:34', '2022-12-03T16:40:34');

INSERT INTO rooms(id, name, created_at, updated_at, owner)
VALUES ('37KQmczHRQdgKKQqhDXF', 'Biclas e borgas', '2015-12-02T16:40:34', '2019-12-02T16:40:34', 'wH4ofWP4EyprKpqQWStn');
INSERT INTO rooms(id, name, created_at, updated_at, owner)
VALUES ('Cuz3gcHNjdEqvXbqv', 'Borgas e biclas', '2015-12-02T16:40:34', '2019-12-02T16:40:34', '6jrHnwiHihRNeWqrKirW');

INSERT INTO room_members(id, joined_at, room_id, user_id)
VALUES ('9q6QkDWZoToQXcKoMgFD', '2015-12-02T16:40:34', '37KQmczHRQdgKKQqhDXF', 'wH4ofWP4EyprKpqQWStn');
INSERT INTO room_members(id, joined_at, room_id, user_id)
VALUES ('r7GM6Aqrk2TcEnrMEdC5', '2015-12-02T16:41:29', '37KQmczHRQdgKKQqhDXF', '6jrHnwiHihRNeWqrKirW');
INSERT INTO room_members(id, joined_at, room_id, user_id)
VALUES ('pBobnd2YLqTFpMkJyM9t', '2022-12-03T17:00:34', '37KQmczHRQdgKKQqhDXF', 'hpAHdRc8jDLTMw7ikrRH');

INSERT INTO messages(id, sent_at, message, sender_id, recipient_id, reply_to, room_id)
VALUES ('aKoHkj6AXc2pXRkQ9mET', '2015-12-02T16:40:55', 'Olá!', 'wH4ofWP4EyprKpqQWStn', NULL, NULL,
        '37KQmczHRQdgKKQqhDXF');
INSERT INTO messages(id, sent_at, message, sender_id, recipient_id, reply_to, room_id)
VALUES ('fm4TvoT8Woyy8SmaeKjQ', '2015-12-02T16:41:39', 'Boas.', '6jrHnwiHihRNeWqrKirW', NULL,
        'aKoHkj6AXc2pXRkQ9mET', '37KQmczHRQdgKKQqhDXF');
INSERT INTO messages(id, sent_at, message, sender_id, recipient_id, reply_to, room_id)
VALUES ('fEXr3Zh5YjLcZa3Ats24', '2022-12-03T17:10:34', 'Olá, Joaquim!', 'hpAHdRc8jDLTMw7ikrRH',
        'wH4ofWP4EyprKpqQWStn', NULL, NULL);