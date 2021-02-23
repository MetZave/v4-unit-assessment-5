select p.id as post_id, title, content, img, profile_pic, date_created, username as author_username
from helo_posts p
join helo_users u
on p.author_id = u.id
where (lower(p.title) like $1 or lower(p.content) like $1) and u.id != $2
order by date_created desc;