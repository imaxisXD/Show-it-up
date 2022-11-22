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

export const userCreatedPinsQuery = (user: any) => {
  const query = `*[ _type == 'sharedImage' && userId == '${user}'] | order(_createdAt desc){
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
      whoPosted->{
        _id,
        Username,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (user: any) => {
  const query = `*[_type == 'sharedImage' && '${user}' in save[].userId ] | order(_createdAt desc) {
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
      whoPosted->{
        _id,
        Username,
        image
      },
    },
  }`;
  return query;
};

export const pinDetailQuery = (pinId: any) => {
  const query = `*[_type == "sharedImage" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destinationURL,
    whoPosted->{
      _id,
      Username,
      image
    },
   save[]{
      whoPosted->{
        _id,
        Username,
        image
      },
    },
    comments[]{
      comment,
      _key,
      whoPosted->{
        _id,
        Username,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin: any) => {
  const query = `*[_type == "sharedImage" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
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
