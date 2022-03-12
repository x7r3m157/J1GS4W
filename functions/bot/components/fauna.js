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
