insert into helo_users(id, username, password, profile_pic)
values ($1, $2, $3, $4)
returning *;
