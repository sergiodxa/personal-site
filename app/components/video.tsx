type YouTubeProps = {
  id: string;
  title: string;
};

export function YouTube({ id }: YouTubeProps) {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        loading="lazy"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
