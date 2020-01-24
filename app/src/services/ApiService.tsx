/**
 * Usage:
 *
 * async function getNotes() {
 *   const notes = await ApiService.get('/notes/');
 *   setNotes(notes);
 * }
 *
 * useEffect(() => {
 *   getNotes();
 * }, [])
 *
 */

const _apiHost = 'http://localhost:8000';

interface Params {
  [index: string]: string;
}


async function request(url: string, params?: Params, method = 'GET') {
  const options: any = {
    method,
  };

  if (params) {
    if (method === 'GET') {
      url += '?' + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const response: any = await fetch(_apiHost + url, options);

  if (response.status !== 200) {
    const code = response.status;
    const msg = response.data ? response.data.error : 'Server error';

    throw new Error(`${code} ${msg}`)
  }

  return await response.json();
}

function objectToQueryString(obj: Params) {
  return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

function get(url: string, params?: Params) {
  return request(url, params);
}

function post(url: string, params?: Params) {
  return request(url, params, 'POST');
}

function put(url: string, params?: Params) {
  return request(url, params, 'PUT');
}

function remove(url: string, params?: Params) {
  return request(url, params, 'DELETE');
}

export default {
  get,
  post,
  put,
  remove
};

