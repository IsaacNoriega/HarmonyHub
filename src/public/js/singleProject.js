function changeBackground(track) {
    var tracks = document.querySelectorAll('.track');
    tracks.forEach(function(item) {
      if (item === track) {
        item.classList.add('clicked');
      } else {
        item.classList.remove('clicked');
      }
    });
  }
  