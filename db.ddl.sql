CREATE TABLE account
(
    id         char(20) NOT NULL,
    name       varchar(50),
    created_at numeric  NOT NULL,
    updated_at numeric,
    CONSTRAINT pk_account PRIMARY KEY (id)
);

CREATE TABLE room
(
    id         char(20) NOT NULL,
    name       varchar(50),
    created_at numeric NOT NULL,
    updated_at numeric,
    owner      char(20) NOT NULL
        CONSTRAINT fk_room_owner REFERENCES account (id),
    constraint pk_room PRIMARY KEY (id)
);

CREATE TABLE room_members
(
    id        char(20) NOT NULL,
    joined_at numeric NOT NULL,
    room_id   char(20) NOT NULL
        CONSTRAINT fk_room_members_room REFERENCES room (id),
    account_id   char(20) NOT NULL
        CONSTRAINT fk_room_members_account REFERENCES account (id),
    CONSTRAINT pk_room_members PRIMARY KEY (id)
);

CREATE TABLE message
(
    id           char(20) NOT NULL,
    send_at      numeric  NOT NULL,
    message      varchar(500),
    sender_id    char(20) NOT NULL
        CONSTRAINT fk_message_sender REFERENCES account (id),
    recipient_id char(20)
        CONSTRAINT fk_message_recipient REFERENCES account (id),
    reply_to     char(20)
        CONSTRAINT fk_message_reply REFERENCES message (id),
    room_id      char(20)
        CONSTRAINT fk_message_room REFERENCES room (id),
    CONSTRAINT pk_message PRIMARY KEY (id)
);
