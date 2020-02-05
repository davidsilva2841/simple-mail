-- auto-generated definition
create table users
(
    id            serial not null
        constraint users_pk
            primary key,
    profile_id    text,
    refresh_token text,
    access_token  text,
    first_name    text,
    last_name     text
);

alter table users
    owner to es65kcn4;

create unique index users_id_uindex
    on users (id);

create unique index users_profile_id_uindex
    on users (profile_id);

