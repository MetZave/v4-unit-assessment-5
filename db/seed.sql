create table helo_users (
    id serial primary key,
    username varchar(25) not null,
    password varchar(500) not null,
    profile_pic text
)

create table helo_posts (
    id serial primary key,
    title varchar(45) not null,
    content text,
    img text,
    author_id int references helo_users(id)
    date_created timestamp
);