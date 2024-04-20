function populateAudioInfoAndPlayer(filePath, trackData) {
  const audioInfo = document.getElementById('audio-info');
  const audioPlayer = document.getElementById('audio');

  audioPlayer.src = filePath;

  // Populate audio-info section with metadata
  audioInfo.innerHTML = `<div>${trackData.title}</div>
                         <div>${trackData.date}</div>
                         <div>${trackData.location}</div>`;
}

const handleTrackClick = (filePath, trackData) => {
  populateAudioInfoAndPlayer(filePath);
};

fetch('metadata.json')
  .then((response) => response.json())
  .then((metadata) => {
    const audioList = document.getElementById('audio-list');

    // Iterate over metadata entries and populate audio list
    for (const filePath in metadata) {
      if (metadata.hasOwnProperty(filePath)) {
        const trackData = metadata[filePath];

        // Create list item
        const trackTitle = document.createElement('h2');
        trackTitle.classList.add('audio-list-item');
        trackTitle.textContent = trackData.title;

        // Add click event listener to start playback
        trackTitle.addEventListener('click', () => {
          populateAudioInfoAndPlayer(filePath, trackData);
        });

        audioList.appendChild(trackTitle);
      }
    }
  })
  .catch((error) => console.error('Error fetching metadata:', error));
