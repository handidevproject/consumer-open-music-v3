const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistsSongsService {

    constructor() {
        this._pool = new Pool();
    }

    async getSongsFromPlaylist(playlistId) {
        const playlistQuery = {
            text: `SELECT B.id, B.name, C.username
                   FROM playlist_songs A
                            INNER JOIN playlists B ON A.playlist_id = B.id
                            INNER JOIN users C ON B.owner = C.id
                   WHERE playlist_id = $1`,
            values: [playlistId],
        };

        const userQuery = {
            text: `SELECT username FROM playlists A
            INNER JOIN users B ON A.owner = B.id
            WHERE A.id = $1`,
            values: [playlistId],
        };

        const songQuery = {
            text: `SELECT B.id, B.title, B.performer
            FROM playlist_songs A
            INNER JOIN songs B ON A.song_id = B.id
            WHERE playlist_id = $1`,
            values: [playlistId],
        };

        console.log(`getSongsFromPlaylist: ${this._pool()}`);

        const playlistResult = await this._pool.query(playlistQuery);
        const userResult = await this._pool.query(userQuery);
        const songResult = await this._pool.query(songQuery);

        return {
            id: playlistResult.rows[0].id,
            name: playlistResult.rows[0].name,
            username: userResult.rows[0].username,
            songs: songResult.rows,
        };
    }
}

module.exports = PlaylistsSongsService;
