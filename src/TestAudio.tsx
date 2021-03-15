import * as React from 'react';
import { audio } from './audio';

const TestAudio: React.FC = () => {
  React.useEffect(() => {
    audio(true);
  })

  return (
    <div>
      <canvas id="canvas"></canvas>
      <p id="log"></p>
    </div>
  )
}

export default TestAudio;

