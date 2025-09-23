const { Pool } = require('pg');
const config = require('./config'); // sesuaikan path

class PlaylistsSongsService {
    constructor() {
        this._pool = new Pool(config.postgres);
        console.log('Connected DB:', process.env.PGDATABASE, 'as', process.env.PGUSER);
        console.log('Connected DB2:', config.postgres);
    }

    async getSongsFromPlaylist(playlistId) {
        const playlistQuery = {
            text: 'SELECT id, name FROM public.playlists WHERE id = $1',
            values: [playlistId],
        };

        const songQuery = {
            text: `SELECT B.id, B.title, B.performer
                   FROM public.playlist_songs A
                            INNER JOIN public.songs B ON A.song_id = B.id
                   WHERE playlist_id = $1`,
            values: [playlistId],
        };

        const playlistResult = await this._pool.query(playlistQuery);
        const songResult = await this._pool.query(songQuery);

        return {
            id: playlistResult.rows[0]?.id,
            name: playlistResult.rows[0]?.name,
            songs: songResult.rows,
        };
    }
}

module.exports = PlaylistsSongsService;
