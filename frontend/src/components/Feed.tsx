import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { client } from "../scripts/clientConnectionSanity";
import { useParams } from "react-router-dom";
import { allfeedQuery, searchTermQuery } from "../scripts/sanityQueries";
import { MasonryLayout } from "../components/index";

export default function Feed(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [pinInformation, setPinInformation] = useState(null);
  let { category } = useParams();

  useEffect(() => {
    if (category) {
      client.fetch(searchTermQuery(category)).then((data) => {
        setPinInformation(data);
        setIsLoading(false);
      });
    } else {
      client.fetch(allfeedQuery).then((data) => {
        setPinInformation(data);
        setIsLoading(false);
      });
    }
  }, [category]);
  if (isLoading) {
    return (
      <Oval
        ariaLabel="loading-indicator"
        height={70}
        width={70}
        strokeWidth={5}
        strokeWidthSecondary={1}
        color="#FB7185"
        secondaryColor="#a1dbfa"
      />
    );
  }
  return (
    <>{pinInformation && <MasonryLayout pinInformation={pinInformation} />}</>
  );
}
