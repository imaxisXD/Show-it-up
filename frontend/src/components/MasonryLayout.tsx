import Masonry from "react-masonry-css";
import { IndividualImageTile } from "./index";
const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pinInformation }: any) => (
  <Masonry
    className="flex animate-slide-fwd"
    breakpointCols={breakpointColumnsObj}
  >
    {pinInformation?.map(function (pin: any) {
      return <IndividualImageTile key={pin._id} pin={pin} className="w-max" />;
    })}
  </Masonry>
);

export default MasonryLayout;
