import { useState, useEffect } from "react";
import { Hearts, Oval } from "react-loader-spinner";
import { client } from "../scripts/clientConnectionSanity";
import { useParams } from "react-router-dom";
import { allfeedQuery, searchTermQuery } from "../scripts/sanityQueries";
import { MasonryLayout } from "../components/index";

export default function Feed(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [pinInformation, setPinInformation] = useState<any>(null);
  let { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      client.fetch(searchTermQuery(categoryId)).then((data) => {
        setPinInformation(data);
        setIsLoading(false);
      });
    } else {
      client.fetch(allfeedQuery).then((data) => {
        setPinInformation(data);
        setIsLoading(false);
      });
    }
  }, [categoryId]);

  if (isLoading) {
    return (
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
    );
  }
  if (pinInformation?.length < 1) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full text-primary ">
        <Hearts
          ariaLabel="hearts-loading"
          height={70}
          width={70}
          color="#FB7185"
          visible={true}
        />
        Sorry, currently no image is present in this category 😊
      </div>
    );
  }

  return (
    <>{pinInformation && <MasonryLayout pinInformation={pinInformation} />}</>
  );
}
