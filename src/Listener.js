class Listener {
    constructor(playlistsSongsService, mailSender) {
        this._playlistsSongsService = playlistsSongsService;
        this._mailSender = mailSender;
        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());

            // Ambil playlist lengkap dengan lagu
            const playlist = await this._playlistsSongsService.getSongsFromPlaylist(playlistId);

            const result = {
                playlist,
            };

            await this._mailSender.sendEmail(
                targetEmail,
                JSON.stringify(result, null, 2),
                `Export Playlist - ${playlists.name}`,
            );
            console.log('success send email');
        } catch (error) {
            console.error('Gagal memproses pesan:', error);
        }
    }
}

module.exports = Listener;
