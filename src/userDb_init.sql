create table if not exists user(
    id text not null,
    email text not null,
    username text not null,
    password text not NULL,
    primary key(id)
);

insert into user (id, email, username, password) values ("0", "guest@dietplanner.com", "guest", "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=");

create table if not exists token(
    token text not null,
    userId text not null,
    primary key(token),
    constraint fk_userid foreign key (userId) REFERENCES user(id)
);