export const audio = (debug: boolean) => {
  const audioCtx = new window.AudioContext();
  const analyser = audioCtx.createAnalyser();


  const nyquist = audioCtx.sampleRate / 2;
  // highest precision
  analyser.fftSize = 1024;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);


  const handleSuccess = function (stream: MediaStream) {
    console.log("Microphone connected, yay");
    audioCtx.createMediaStreamSource(stream).connect(analyser);
  };

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);


  if (debug) {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const log = document.getElementById("log") as HTMLParagraphElement;
    const canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const WIDTH = canvas.width = 500;
    const HEIGHT = canvas.height = 150;
    draw(0, canvas, log, canvasCtx, WIDTH, HEIGHT);
  }
  function draw(time: number,
    canvas: HTMLCanvasElement,
    log: HTMLParagraphElement,
    canvasCtx: CanvasRenderingContext2D,
    WIDTH: number,
    HEIGHT: number,) {
    requestAnimationFrame(() => draw(time, canvas, log, canvasCtx, WIDTH, HEIGHT));

    // get the Frequency Domain
    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let max_val = -Infinity;
    let max_index = -1;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      let barHeight = dataArray[i];
      if (barHeight > max_val) {
        max_val = barHeight;
        max_index = i;
      }

      canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
      x += barWidth;
    }
    const loudestFreq = max_index * (nyquist / bufferLength);
    const note = 12 * (Math.log(loudestFreq / 440) / Math.log(2))
    log.innerText = `loudest freq: ${loudestFreq}\n loudness: ${max_val}\n note: ${note}`;
  }


  function getLoudestPitch(): { pitch: number, loudness: number } {
    analyser.getByteFrequencyData(dataArray);

    let max_val = -Infinity;
    let max_index = -1;
    for (let i = 0; i < bufferLength; i++) {
      let barHeight = dataArray[i];
      if (barHeight > max_val) {
        max_val = barHeight;
        max_index = i;
      }
    }
    return {
      pitch: max_index * (nyquist / bufferLength),
      loudness: max_val,
    }
  }

  return getLoudestPitch;
}
