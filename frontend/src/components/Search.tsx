import { memo, useEffect, useState } from "react";
import MasonryLayout from "./MasonryLayout";
import { client } from "../scripts/clientConnectionSanity";
import { allfeedQuery, searchTermQuery } from "../scripts/sanityQueries";
import { Oval } from "react-loader-spinner";

const Search = ({ searchKeyword }: any) => {
  const [pins, setPins] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchKeyword && searchKeyword.length !== 0) {
      setLoading(true);
      const query = searchTermQuery(searchKeyword?.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(allfeedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchKeyword]);

  return (
    <div>
      {loading && (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Oval
            ariaLabel="loading-indicator"
            height={70}
            width={70}
            strokeWidth={5}
            strokeWidthSecondary={1}
            color="#FB7185"
            secondaryColor="#a1dbfa"
          />
        </div>
      )}
      {pins && pins?.length !== 0 && <MasonryLayout pinInformation={pins} />}
      {pins && pins?.length === 0 && searchKeyword !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default memo(Search);
