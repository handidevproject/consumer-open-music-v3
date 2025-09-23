class Listener {
    constructor(playlistsSongsService, mailSender) {
        this._playlistsSongsService = playlistsSongsService;
        this._mailSender = mailSender;
        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());

            console.log('Received message:', message.content.toString());

            // Ambil playlist lengkap dengan lagu
            const playlists = await this._playlistsSongsService.getSongsFromPlaylist(playlistId);
            const result = await this._mailSender.sendEmail(
                targetEmail,
                JSON.stringify(playlists, null, 2),
                `Export Playlist - ${playlists.name}`,
            )
            console.log(result);
        } catch (error) {
            console.error('Gagal memproses pesan:', error);
        }
    }
}

module.exports = Listener;
