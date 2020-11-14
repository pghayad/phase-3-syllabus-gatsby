import { useQuery } from 'react-query';

// https://developers.google.com/youtube/v3/docs/playlistItems/list

const useYoutubePlaylist = playlistId => {
  const params = {
    part: 'snippet',
    maxResults: 50,
    playlistId,
    key: process.env.GATSBY_YOUTUBE_API,
  };

  const qs = new URLSearchParams(params);

  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?${qs}&part=contentDetails`;

  return useQuery(playlistId, () => fetch(url).then(r => r.json()));
};

export default useYoutubePlaylist;
