import { ITableMain } from "./table.main.interface";
import { ITableSettings } from './table.settings.interface';

export interface ITableDatabase {
  main: ITableMain[],
  settings: ITableSettings
}
