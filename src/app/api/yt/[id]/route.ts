import { NextResponse } from "next/server";
import { youtube } from "@/lib/yt/youtubei";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    if (!params.id) {
      return new NextResponse("Channel id is required", { status: 400 });
    }
    const response = (await (await youtube()).getChannel(params.id)) as any;
    const about = await response.getAbout();
    // console.log("about: ", about);
    const { author, banner, subscribers } = response.header;
    const { endpoint, badges, is_moderator, is_verified_artist, ...rest } =
      author;
    const info = {
      ...rest,
      description: about.description.text,
      subscribers: subscribers.text,
      banner,
    };
    const {
      type,
      email_reveal,
      primary_links,
      can_reveal_email,
      buttons,
      canonical_channel_url,
      joined_date,
      view_count,
      ...aboutChannel
    } = about;
    aboutChannel.banner = banner;
    aboutChannel.name = aboutChannel.name.text;
    aboutChannel.url = about.canonical_channel_url;
    aboutChannel.joined = about.joined_date.text;
    aboutChannel.description = aboutChannel.description.text;
    aboutChannel.country = aboutChannel.country.text;
    aboutChannel.is_verified = rest.is_verified;
    aboutChannel.subscribers = subscribers.text;

    return NextResponse.json(aboutChannel);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
