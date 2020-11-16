import React, { useState } from 'react';
import useYoutubePlaylist from '../../hooks/useYoutubePlaylist';
import YoutubeEmbed from './YoutubeEmbed';
import AnchorTag from './anchor';

const embedBaseUrl = `https://www.youtube.com/embed/`;

const YoutubePlaylist = ({ playlistId }) => {
  const [embedEndpoint, setEmbedEndpoint] = useState(`videoseries?list=${playlistId}`);

  const { data } = useYoutubePlaylist(playlistId);

  const embedLink = embedBaseUrl + embedEndpoint;

  const externalLink = `https://www.youtube.com/playlist?list=${playlistId}`;

  return (
    <>
      <YoutubeEmbed link={embedLink} />
      <ol>
        {data?.items?.map(({ snippet }) => (
          <li key={snippet?.resourceId?.videoId}>
            <span
              role="link"
              tabIndex={0}
              onKeyDown={({ keycode }) => {
                if (keycode === 13) {
                  setEmbedEndpoint(`${snippet?.resourceId?.videoId}?list=${playlistId}`);
                }
              }}
              onClick={() => setEmbedEndpoint(`${snippet?.resourceId?.videoId}?list=${playlistId}`)}
            >
              {snippet?.title}
            </span>
          </li>
        ))}
      </ol>
      <p className="paragraph">
        Make sure to watch the entire playlist! You can also access it directly on Youtube:{' '}
        <AnchorTag href={externalLink}>{externalLink}</AnchorTag>
      </p>
    </>
  );
};

export default YoutubePlaylist;
