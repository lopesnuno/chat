CREATE TABLE users
(
    id         char(20) NOT NULL,
    name       varchar(50),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    CONSTRAINT pk_users PRIMARY KEY (id)
);

CREATE TABLE rooms
(
    id         char(20) NOT NULL,
    name       varchar(50),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    owner      char(20) NOT NULL
        CONSTRAINT fk_rooms_owner REFERENCES users (id),
    CONSTRAINT pk_rooms PRIMARY KEY (id)
);

CREATE TABLE room_members
(
    id        char(20) NOT NULL,
    joined_at TIMESTAMP NOT NULL,
    room_id   char(20) NOT NULL
        CONSTRAINT fk_room_members_rooms REFERENCES rooms (id),
    user_id   char(20) NOT NULL
        CONSTRAINT fk_room_members_users REFERENCES users (id),
    CONSTRAINT pk_room_members PRIMARY KEY (id)
);

CREATE TABLE messages
(
    id           char(20) NOT NULL,
    send_at      TIMESTAMP NOT NULL,
    message      varchar(500),
    sender_id    char(20) NOT NULL
        CONSTRAINT fk_messages_sender REFERENCES users (id),
    recipient_id char(20)
        CONSTRAINT fk_messages_recipient REFERENCES users (id),
    reply_to     char(20)
        CONSTRAINT fk_messages_reply REFERENCES messages (id),
    rooms_id      char(20)
        CONSTRAINT fk_messages_rooms REFERENCES rooms (id),
    CONSTRAINT pk_messages PRIMARY KEY (id)
);
