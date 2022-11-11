export const userFetcher = (user: string) => {
  return `*[_type == "users" && _id == '${user}']`;
};

export const searchTermQuery = (searchTerm: string) => {
  const query = `*[_type == "sharedImage" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destinationURL,
            postedBy->{
              _id,
              Username,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                Username,
                image
              },
            },
          }`;
  return query;
};

export const allfeedQuery = `*[_type == "sharedImage"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destinationURL,
      whoPosted->{
        _id,
        Username,
        image
      },
      save[]{
        _key,
        whoPosted->{
          _id,
          Username,
          image
        },
      },
    } `;
