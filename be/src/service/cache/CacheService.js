const redis = require('redis');
const config = require('../../config');
const NotFoundError = require('../../exceptions/client/NotFoundError');

class CacheService {
  constructor() {
    this._client = redis.createClient({
      socket: {
        host: config.cache.host,
      },
    });

    this._client.on('error', (error) => {
      console.log(error);
    });

    this._client.connect();
  }

  async set(key, value, expirationTime = 1800) {
    await this._client.set(key, value, {
      EX: expirationTime,
    });
  }

  async get(key) {
    const result = await this._client.get(key);

    if (result === null) {
      throw new NotFoundError('Cache tidak ditemukan.');
    }

    return result;
  }

  async remove(key) {
    return this._client.del(key);
  }
}

module.exports = CacheService;
