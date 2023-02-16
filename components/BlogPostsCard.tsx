const BlogPostsCard = () => {
  const likeBorder = {
    borderRadius: "0 0 10px 0px",
  };

  return (
    <div className="w-5/12 bg-mediumGrey max-h-96 text-white rounded-lg">
      <div className="flex mb-4 overflow-hidden">
        <h1>IMG</h1>
        <div className="pl-8">
          <h2>Name Here</h2>
          <h4>24 secs ago</h4>
        </div>
      </div>
      <div className="bg-purple rounded-lg pb-2">
        <div
          style={likeBorder}
          className="bg-mediumGrey w-20 h-8 border-b border-mediumGrey rounded pl-1.5"
        >
          10 likes
        </div>
        <div className="relative pb-5">
          <button className="absolute right-12">Title</button>
        </div>
        <p className="p-7">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          laboriosam commodi! Molestiae.
        </p>
        <div className="p-4 relative">
          <button className="bg-lightGrey bg-opacity-50 min-w-[25%] h-10 rounded-lg text-sm">
            12 Comments
          </button>
          <button className="absolute right-8 text-sm">Save</button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostsCard;
