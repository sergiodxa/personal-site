import { Container } from "components/container";
import { Navigation } from "components/navigation";
import { ChannelPageProps } from "types";
import { YouTube } from "components/video";
import { Card } from "components/card";

export function ChannelLayout({ channel }: ChannelPageProps) {
  return (
    <section className="space-y-6 mb-12">
      <header>
        <Container>
          <Navigation
            current="channel"
            title="Channel"
            description=""
            path="/channel"
          />
        </Container>
      </header>

      <Container>
        <section className="mx-auto relative rounded-lg">
          <header id="search">
            <h2 className="font-semibold text-2xl">Channel</h2>
          </header>

          <section>
            {channel.map((video) => (
              <Card key={video.url}>
                <h2>{video.title}</h2>
                <YouTube title={video.title} id={video.url} />
              </Card>
            ))}
          </section>
        </section>
      </Container>
    </section>
  );
}
