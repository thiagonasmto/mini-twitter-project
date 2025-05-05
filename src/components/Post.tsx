type PostProps = {
    content: string;
  };
  
  function Post({ content }: PostProps) {
    return (
      <div className="post">
        <p>{content}</p>
      </div>
    );
  }
  
  export default Post;
  