export interface IMenus {
  text: string;
  pathKey?: string;
  link?: string;
  items?: IMenus[];
}

const Menus: IMenus[] = [];

export default Menus;
