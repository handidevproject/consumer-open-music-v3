const autoBind = require('auto-bind');

class PlaylistsHandler {
    constructor(
        PlaylistsService,
        PlaylistsSongsService,
        PlaylistsSongsActivitiesService,
        PlaylistsValidator,
    ) {
        this._playlistsService = PlaylistsService;
        this._playlistsSongsService = PlaylistsSongsService;
        this._playlistsSongsActivitiesService = PlaylistsSongsActivitiesService;

        autoBind(this);
    }

    async getSongsFromPlaylistByIdHandler(request) {
        const { id: credentialId } = request.auth.credentials;
        const { id: playlistId } = request.params;

        await this._playlistsService.verifyPlaylistsAccess(
            playlistId,
            credentialId,
        );

        const playlist = await this._playlistsSongsService.getSongsFromPlaylist(
            playlistId,
        );

        return {
            status: 'success',
            data: {
                playlist,
            },
        };
    }
}

module.exports = PlaylistsHandler;
