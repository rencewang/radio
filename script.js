function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function populateAudioInfoAndPlayer(filePath, trackData) {
  const audioInfo = document.getElementById('audio-info');
  const audioPlayer = document.getElementById('audio');

  // Populate audio-info and audio with data
  audioPlayer.src = filePath;
  audioInfo.innerHTML = `<div class="track-title">${trackData.title}</div>
                         <div class="track-date">${formatDate(
                           trackData.date
                         )}</div>
                         <div class="track-location">${
                           trackData.location
                         }</div>`;

  // Highlight the corresponding dot as active
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot) => dot.classList.remove('active-dot'));
  const activeDot = document.querySelector(`.dot[data-filepath="${filePath}"]`);
  activeDot.classList.add('active-dot');
}

const handleTrackClick = (filePath, trackData) => {
  populateAudioInfoAndPlayer(filePath);
};

fetch('metadata.json')
  .then((response) => response.json())
  .then((metadata) => {
    // Iterate over metadata entries and populate audio list
    for (const filePath in metadata) {
      const audioList = document.getElementById('audio-list');

      if (metadata.hasOwnProperty(filePath)) {
        const trackData = metadata[filePath];

        // Create list item
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-filepath', filePath);

        const trackTitle = document.createElement('h2');
        trackTitle.classList.add('audio-list-item');
        trackTitle.textContent = trackData.title;

        // Add click event listener to start playback
        dot.addEventListener('click', () => {
          populateAudioInfoAndPlayer(filePath, trackData);
        });

        audioList.appendChild(dot);
      }
    }

    populateAudioInfoAndPlayer(
      Object.keys(metadata)[0],
      metadata[Object.keys(metadata)[0]]
    );
  })
  .catch((error) => console.error('Error fetching metadata:', error));
