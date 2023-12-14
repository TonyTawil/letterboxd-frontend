import ReactPlayer from "react-player";

const Trailer = ({ url }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {url != null ? (
        <ReactPlayer
          controls={true}
          playing={true}
          url={`https://www.youtube.com/watch?v=${url}`}
          width="100%"
          height="100%"
        />
      ) : null}
    </div>
  );
};

export default Trailer;
