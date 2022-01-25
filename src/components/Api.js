
export default class Api {
    constructor (options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
          }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getAllData() {
        return Promise.all([this._getInitialCards()])
    }

    _getInitialCards() {
        return fetch(this._url + '/cards', {
            headers: this._headers,
        })
        .then(res => {
            return this._checkResponse(res)
        })
    }
}

