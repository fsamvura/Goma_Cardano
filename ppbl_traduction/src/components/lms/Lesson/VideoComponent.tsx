import { Box, Text, Heading } from "@chakra-ui/react";
import * as React from "react";

import { render } from "react-dom";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

type Props = {
  children?: React.ReactNode;
  videoId: string;
};
const VideoComponent: React.FC<Props> = ({ children, videoId }) => {
  return (
    <Box p="5" bg="theme.lightGray">
      <Heading size="md" py="3">{children}</Heading>
      <Box>
        <LiteYouTubeEmbed id={videoId} title="example video" />
      </Box>
    </Box>
  );
};

export default VideoComponent;
