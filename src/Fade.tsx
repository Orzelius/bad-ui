import * as React from 'react';

const tailwindColors = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const Fade = (color: string, h: string, w: '100%' | string = '100%', horizontal=false) => tailwindColors.map(intensity => <div className={`bg-${color}-${intensity} ${horizontal && 'inline-block'}`} style={{height: h, width: w}} key={intensity}/>)

// bg-coolGray-50
// bg-red-50
// bg-amber-50
// bg-emerald-50
// bg-blue-50
// bg-indigo-50
// bg-violet-50
// bg-pink-50

export default Fade;