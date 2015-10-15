import {IMedium} from '../media/imedium';

export interface IArea {
  id: number;
  name: string;
  goToText: string;
  primaryColor: string;
  secondaryColor: string;
  media: IMedium[];
  backgroundImage: IMedium;
  stickerImage: IMedium;
  backgroundImageId: number;
  stickerImageId: number;
}
