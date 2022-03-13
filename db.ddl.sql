CREATE TABLE room
(
    id         varchar NOT NULL,
    name       varchar(50),
    created_at numeric,
    updated_at numeric,
    constraint pk_room PRIMARY KEY (id)
);

CREATE TABLE account
(
    id         varchar NOT NULL,
    name       varchar(50),
    created_at numeric NOT NULL,
    updated_at numeric,
    CONSTRAINT pk_account PRIMARY KEY (id)
);

CREATE TABLE room_meeters
(
    id        varchar NOT NULL,
    joined_at numeric,
    CONSTRAINT pk_room_meeters PRIMARY KEY (id)
);

CREATE TABLE message
(
    id      varchar NOT NULL,
    send_at numeric NOT NULL,
    message varchar(500),
    CONSTRAINT pk_message PRIMARY KEY (id)
);

ALTER TABLE message
    ADD sender_id    varchar NOT NULL
        CONSTRAINT fk_message_sender REFERENCES account (id),
    ADD recipient_id varchar
        CONSTRAINT fk_message_recipient REFERENCES account (id),
    ADD reply_to     varchar
        CONSTRAINT fk_message_reply REFERENCES message (id),
    ADD room_id      varchar
        CONSTRAINT fk_message_room REFERENCES room (id);

ALTER TABLE room
    ADD owner varchar NOT NULL
        CONSTRAINT fk_room REFERENCES account (id);

ALTER TABLE room_meeters
    ADD room_id    varchar NOT NULL
        CONSTRAINT fk_room_meeters_room REFERENCES room (id),
    ADD account_id varchar NOT NULL
        CONSTRAINT fk_room_meeters_account REFERENCES account (id);
