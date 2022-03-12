const faunadb = require('faunadb')

const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET_KEY });
const q = faunadb.query;

export const newUser = (id) => {
  return new Promise((res, rej) => {
    client.query(
      q.Create(
        q.Collection('user'),
        { data: { userId: id, times: [] } },
      )
    ).then(ret => {
      res(true)
    }).catch(err => {
      res(false)
    });
  })
}

export const postUser = (userId) => {
  return new Promise(res, rej) = {
    client.query(
      q.Get(q.Ref(q.Collection('user'), userId))
    )
    .then((ret) => console.log(ret))
    .catch((err) => console.error(
      'Error: [%s] %s: %s',
      err.name,
      err.message,
      err.errors()[0].description,
    ))
  }
}

export const updateUser = (userId) => {
  return new Promise(res, rej) = {
    serverClient.query(
      q.Update(
        q.Ref(q.Collection('Posts'), '1'),
        { data: { tags: ['welcome', 'short'] } },
      )
    )
    .then((ret) => console.log(ret))
    .catch((err) => console.error(
      'Error: [%s] %s: %s',
      err.name,
      err.message,
      err.errors()[0].description,
    ))
  }
}

