import * as React from 'react';
import { GContext } from '.';
import { audio } from './audio';

const TestAudio: React.FC = () => {
  const { gState, setGState } = React.useContext(GContext);

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

