import {IMedium} from '../media/imedium';
import {IChallenge} from '../challenges/ichallenge';
import {IContent} from '../contents/icontent';

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
  challenges: IChallenge[];
  contents: IContent[];
}
