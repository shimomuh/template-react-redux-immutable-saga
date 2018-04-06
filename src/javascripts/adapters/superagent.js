import request from 'superagent'
import queryString from 'query-string'

export function XHRget (path, params = {}, options = {}) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  const query = queryString.stringify(params, options)
  return new Promise((resolve, reject) => {
    request
      .get(path)
      .query(query)
      .set('X-CSRF-Token', csrfToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err && res.status >= 400) return reject(err)
        return resolve({ data: res.body, status: res.status })
      })
  })
}

export function XHRpost (path, data = {}) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  return new Promise((resolve, reject) => {
    request
      .post(path)
      .send(data)
      .set('X-CSRF-Token', csrfToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return reject(res)
        return resolve({ data: res.body })
      })
  })
}

export function XHRput (path, data = {}) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  return new Promise((resolve, reject) => {
    request
      .put(path)
      .send(data)
      .set('X-CSRF-Token', csrfToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return reject(res)
        return resolve({ data: res.body })
      })
  })
}

export function XHRdel (path, data = {}) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  return new Promise((resolve, reject) => {
    request
      .del(path)
      .send(data)
      .set('X-CSRF-Token', csrfToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return reject(res)
        return resolve({ data: res.body })
      })
  })
}
