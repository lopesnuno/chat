INSERT INTO account(id, name, created_at, updated_at)
VALUES ('wH4ofWP4EyprKpqQWStn', 'Joaquim', 1392223234, 1615567234);
INSERT INTO account(id, name, created_at, updated_at)
VALUES ('6jrHnwiHihRNeWqrKirW', 'Rafa', 1402589434, 1647105300);
INSERT INTO account(id, name, created_at, updated_at)
VALUES ('hpAHdRc8jDLTMw7ikrRH', 'Lúcia', 1647103234, 1647103234);

INSERT INTO room(id, name, created_at, updated_at, owner)
VALUES ('37KQmczHRQdgKKQqhDXF', 'Biclas e borgas', 1423759234, 1486917634, 'wH4ofWP4EyprKpqQWStn');

INSERT INTO room_members(id, joined_at, room_id, account_id)
VALUES ('9q6QkDWZoToQXcKoMgFD', 1423759234, '37KQmczHRQdgKKQqhDXF', 'wH4ofWP4EyprKpqQWStn');
INSERT INTO room_members(id, joined_at, room_id, account_id)
VALUES ('r7GM6Aqrk2TcEnrMEdC5', 1423759289, '37KQmczHRQdgKKQqhDXF', '6jrHnwiHihRNeWqrKirW');
INSERT INTO room_members(id, joined_at, room_id, account_id)
VALUES ('pBobnd2YLqTFpMkJyM9t', 1647104434, '37KQmczHRQdgKKQqhDXF', 'hpAHdRc8jDLTMw7ikrRH');

INSERT INTO message(id, send_at, message, sender_id, recipient_id, reply_to, room_id)
VALUES ('aKoHkj6AXc2pXRkQ9mET', 1423759255, 'Olá!', 'wH4ofWP4EyprKpqQWStn', NULL, NULL,
        '37KQmczHRQdgKKQqhDXF');
INSERT INTO message(id, send_at, message, sender_id, recipient_id, reply_to, room_id)
VALUES ('fm4TvoT8Woyy8SmaeKjQ', 1423759299, 'Boas.', '6jrHnwiHihRNeWqrKirW', NULL,
        'aKoHkj6AXc2pXRkQ9mET', '37KQmczHRQdgKKQqhDXF');
INSERT INTO message(id, send_at, message, sender_id, recipient_id, reply_to, room_id)
VALUES ('fEXr3Zh5YjLcZa3Ats24', 1647105034, 'Olá, Joaquim!', 'hpAHdRc8jDLTMw7ikrRH',
        'wH4ofWP4EyprKpqQWStn', NULL, NULL);
