create table diettype (
    id text not null,
    name text not null,
    primary key (id)
);

insert into
    diettype (id, name)
values
    ('0', 'vegan'),
    ('1', 'vegetarisch'),
    ('2', 'fleisch'),
    ('3', 'glutenfrei'),
    ('4', 'laktosefrei');

create table foodcategory (
    id text not null,
    name text not null,
    primary key (id)
);

insert into
    foodcategory (id, name)
values
    ('0', 'vorspeise'),
    ('1', 'hauptspeise'),
    ('2', 'nachspeise'),
    ('3', 'salat'),
    ('4', 'kuchen');

create table food (
    id text not null,
    name text not null,
    description text,
    type text,
    category text,
    primary key (id),
    constraint FK_foodcategory foreign key (category) references foodcategory(id),
    constraint FK_diettype foreign key (type) references diettype(id)
);