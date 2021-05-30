import React from "react";

import Grid from "@material-ui/core/Grid";
import { ImagesBoxImage } from "./ImagesBoxImage";
import { IImageFile } from "./SendMessageForm";

export interface IImagesBox {
  images: IImageFile[];
  removeImage: (url: string) => void;
}

export const ImagesBox: React.FC<IImagesBox> = ({ images, removeImage }) => {
  return (
    <Grid container>
      {images.map((image, index) => (
        <ImagesBoxImage
          key={image.imageSrc + index}
          url={image.imageSrc}
          removeImage={removeImage}
        />
      ))}
    </Grid>
  );
};
