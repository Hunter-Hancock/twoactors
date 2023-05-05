import Image from "next/image";
import Credit from "../Interfaces/Credit";

import missingImg from "../missing.jpg";

interface MovieComponentProps {
  credit: Credit;
}

export default function MovieComponent({ credit }: MovieComponentProps) {
  return (
    <li style={{ width: "150px", listStyleType: "none" }}>
      <Image
        src={
          credit.backdrop_path
            ? `https://www.themoviedb.org/t/p/w150_and_h225_bestv2/${credit.backdrop_path}`
            : missingImg
        }
        alt={
          credit.media_type === "movie"
            ? credit.title || "Movie"
            : credit.name || "Show"
        }
        width={300}
        height={450}
      />
      {credit.media_type === "movie" ? credit.title : credit.name}
    </li>
  );
}
