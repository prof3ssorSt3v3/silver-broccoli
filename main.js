document.addEventListener('DOMContentLoaded', () => {
  //when the page loads
  //set the default value for the progress meter
  //set the message about progress value
  //start downloading the file
  let pct = 0;
  const url = 'https://picsum.photos/id/237/4500/4200';

  fetch(url)
    .then((response) => {
      //we now have the headers
      const contentLen = +response.headers.get('content-length');
      let downloaded = 0;
      const chunks = [];

      const reader = response.body.getReader();
      function readChunk() {
        reader.read().then(({ done, value }) => {
          if (done) {
            //finished downloading the file
            const blob = new Blob(chunks, { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            const img = document.querySelector('#image img');
            img.src = url;
            return;
          }
          downloaded += value.byteLength;
          pct = Math.round((downloaded / contentLen) * 100);
          console.log(pct, 'downloaded');
          document.getElementById('output').textContent = pct + '% downloaded';
          document.querySelector('.pct-text').textContent = pct;
          document.querySelector('.progress').style.setProperty('--percentage', pct);
          chunks.push(value);
          readChunk();
        });
      }
      readChunk();
    })
    .catch((err) => {});
});
