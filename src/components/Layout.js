import React from 'react';
import Masonry from "react-masonry-css";
import LoopPin from './LoopPin';

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const Layout = ({pins}) => (
  <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
    {pins?.map((pin) => <LoopPin key={pin._id} pin={pin} className="w-max" />)}
  </Masonry>
);

export default Layout