import { Token } from '@model/token';
export interface IPlayer {
  name: string;
  img: string;
  materials: { count: number, token: any }[];
  foods: { count: number, token: any }[];
}