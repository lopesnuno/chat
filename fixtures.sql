INSERT INTO account(id, name, created_at, updated_at)
VALUES (gen_random_uuid(), 'Joaquim', 1392223234, 1615567234);
INSERT INTO account(id, name, created_at, updated_at)
VALUES (gen_random_uuid(), 'Rafa', 1402589434, 1647105300);
INSERT INTO account(id, name, created_at, updated_at)
VALUES (gen_random_uuid(), 'Lúcia', 1647103234, 1647103234);

INSERT INTO message(id, send_at, message, sender_id, recipient_id, reply_to, room_id)
VALUES (gen_random_uuid(), 1423759255, 'Olá!', 'a945be2b-bad6-48ae-831c-04cc809cf189', NULL, NULL,
        '98c9f173-9252-4d49-b404-833792335608');
INSERT INTO message(id, send_at, message, sender_id, recipient_id, reply_to, room_id)
VALUES (gen_random_uuid(), 1423759299, 'Boas.', '99a48977-af58-4828-956b-220110c5d9db', NULL,
        'b0eb7209-ca91-4685-8e02-c31eda44beb8', '98c9f173-9252-4d49-b404-833792335608');
INSERT INTO message(id, send_at, message, sender_id, recipient_id, reply_to, room_id)
VALUES (gen_random_uuid(), 1647105034, 'Olá, Joaquim!', '473961b8-af56-42c0-835d-9c3534ba7872',
        'a945be2b-bad6-48ae-831c-04cc809cf189', NULL, NULL);

INSERT INTO room(id, name, created_at, updated_at, owner)
VALUES (gen_random_uuid(), 'Bilcas e borgas', 1423759234, 1486917634, 'a945be2b-bad6-48ae-831c-04cc809cf189');

INSERT INTO room_meeters(id, joined_at, room_id, account_id)
VALUES (gen_random_uuid(), 1423759234, '98c9f173-9252-4d49-b404-833792335608', 'a945be2b-bad6-48ae-831c-04cc809cf189');
INSERT INTO room_meeters(id, joined_at, room_id, account_id)
VALUES (gen_random_uuid(), 1423759289, '98c9f173-9252-4d49-b404-833792335608', '99a48977-af58-4828-956b-220110c5d9db');
INSERT INTO room_meeters(id, joined_at, room_id, account_id)
VALUES (gen_random_uuid(), 1647104434, '98c9f173-9252-4d49-b404-833792335608', '473961b8-af56-42c0-835d-9c3534ba7872');

SELECT *
FROM room_meeters;








