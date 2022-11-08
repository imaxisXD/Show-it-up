export default {
  name: "sharedImage",
  title: "Shared Image",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "about",
      title: "About",
      type: "string",
    },
    {
      name: "destinationURL",
      title: "Source URL",
      type: "url",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "image",
      tile: "Image",
      type: "image",
      option: { hotdpot: true },
    },
    {
      name: "userID",
      tile: "UserID",
      type: "string",
    },
    {
      name: "whoPosted",
      tile: "Posted",
      type: "whoPosted",
    },
    {
      name: "save",
      title: "Save",
      type: "array",
      of: [{ type: "save" }],
    },
    {
      name: "comments",
      tile: "Comments",
      type: "array",
      of: [{ type: "comments" }],
    },
  ],
};
