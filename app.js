const { Client } = require('pg');
const axios = require('axios');
const baseUrl = 'https://jsonplaceholder.typicode.com';
const conString = "postgres://postgres:password@localhost:5432/marsplay";
const client = new Client(conString);
let user, todos, albums, photos, posts, comments;

const processComments = function (commentsCount) {
    const query = `INSERT INTO comments(posts_id, name, body, email)
    VALUES($1, $2, $3, $4)`;
    const values = [];
    if (commentsCount < comments.length) {
        values.push(comments[commentsCount].postId);
        values.push(comments[commentsCount].name);
        values.push(comments[commentsCount].body);
        values.push(comments[commentsCount].email);
        console.log(query, values);
        client.query(query, values)
            .then(res => {
                console.log('res', res);
                commentsCount++;
                processComments(commentsCount);
            })
            .catch(e => console.error(e.stack))
    }
    else {
        console.log('All comments have been inserted');
    }
 }

const getComments = function () {
    axios.get(baseUrl + '/comments')
        .then((response) => {
            console.log('Got Comments =', response.data.length);
            comments = response.data;
            processComments(0);
        })
        .catch(err => console.log(err));
}

const processPosts = function (postsCount) {
    const query = `INSERT INTO posts(user_id, title, body)
    VALUES($1, $2, $3)`;
    const values = [];
    if (postsCount < posts.length) {
        values.push(posts[postsCount].userId);
        values.push(posts[postsCount].title);
        values.push(posts[postsCount].body);
        console.log(query, values);
        client.query(query, values)
            .then(res => {
                console.log('res', res);
                postsCount++;
                processPosts(postsCount);
            })
            .catch(e => console.error(e.stack))
    }
    else {
        console.log('All posts have been inserted');
        console.log('Fetching comments now');
        getComments();
    }
}


const getPosts = function () {
    axios.get(baseUrl + '/posts')
        .then((response) => {
            console.log('Got posts =', response.data.length);
            posts = response.data;
            processPosts(0);
        })
        .catch(err => console.log(err));
}

const processPhotos = function (photosCount) {
    const query = `INSERT INTO photos(album_Id, title, url, thumbnailUrl)
    VALUES($1, $2, $3, $4)`;
    const values = [];
    if (photosCount < photos.length) {
        values.push(photos[photosCount].albumId);
        values.push(photos[photosCount].title);
        values.push(photos[photosCount].url);
        values.push(photos[photosCount].thumbnailUrl);
        console.log(query, values);
        client.query(query, values)
            .then(res => {
                console.log('res', res);
                photosCount++;
                processPhotos(photosCount);
            })
            .catch(e => console.error(e.stack))
    }
    else {
        console.log('All albums have been inserted');
        console.log('Fetching posts now');
        getPosts();
    }
}

const getPhotos = function () {
    axios.get(baseUrl + '/photos')
        .then((response) => {
            console.log('Got photos =', response.data.length);
            photos = response.data;
            processPhotos(0);
        })
        .catch(err => console.log(err));
}

const processAlbums = function (albumsCount) {
    const query = `INSERT INTO albums(user_Id, title)
    VALUES($1, $2)`;
    const values = [];
    if (albumsCount < albums.length) {
        values.push(albums[albumsCount].userId);
        values.push(albums[albumsCount].title);
        console.log(query, values);
        client.query(query, values)
            .then(res => {
                console.log('res', res.rows[0]);
                albumsCount++;
                processAlbums(albumsCount);
            })
            .catch(e => console.error(e.stack))
    }
    else {
        console.log('All albums have been inserted');
        console.log('Fetching photos now');
        getPhotos();
    }
}

const getAlbums = function () {
    axios.get(baseUrl + '/albums')
        .then((response) => {
            console.log('Got albums =', response.data.length);
            albums = response.data;
            processAlbums(0);
        })
        .catch(err => console.log(err));
}

const processTodos = function (todosCount) {
    const query = `INSERT INTO todos(user_Id, title, completed)
                             VALUES($1, $2, $3)`;
    const values = [];
    if (todosCount < todos.length) {
        values.push(todos[todosCount].userId);
        values.push(todos[todosCount].title);
        values.push(todos[todosCount].completed);
        console.log(query, values);
        client.query(query, values)
            .then(res => {
                console.log('res', res.rows[0]);
                todosCount++;
                processTodos(todosCount);
            })
            .catch(e => console.error(e.stack))
    }
    else {
        console.log('All todos have been inserted');
        console.log('Fetching Albums now');
        getAlbums();
    }
}

const getTodos = function () {
    axios.get(baseUrl + '/todos')
        .then((response) => {
            console.log('Got todos =', response.data.length);
            todos = response.data;
            processTodos(0);
        })
        .catch(err => console.log(err));
}

const processUsers = function (userCount) {
    const query = `INSERT INTO users(name, username, email, address, phone, website, company)
                             VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [];
    if (userCount < user.length) {
        values.push(user[userCount].name);
        values.push(user[userCount].username);
        values.push(user[userCount].email);
        values.push(user[userCount].address);
        values.push(user[userCount].phone);
        values.push(user[userCount].website);
        values.push(user[userCount].company);
        console.log(query, values);
        client.query(query, values)
            .then(res => {
                console.log('res', res.rows[0]);
                userCount++;
                processUsers(userCount);
            })
            .catch(e => console.error(e.stack))
    }
    else {
        console.log('All Users have been inserted');
        console.log('Fetching Todos now');
        getTodos();
    }
}
const getUsers = function () {
    axios.get(baseUrl + '/users')
        .then((response) => {
            console.log('Got Users =', response.data.length);
            user = response.data;
            processUsers(0);
        })
        .catch(err => console.log(err));
}
client.connect()
    .then(() => {
        console.log('connected');
        getUsers();
    })
    .catch(e => console.error('connection error', e));