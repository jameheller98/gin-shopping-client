import { ParsedUrlQuery } from 'querystring';
import { selectorFamily } from 'recoil';
import { IMenuObject } from '../../components/navigations/menu/Menu';
import { mockMenuProps } from '../../components/navigations/menu/Menu.mocks';

const arrMenuActiveFromQueryState = selectorFamily({
  key: 'IdMenuActiveFromQueryState',
  get:
    (params: {
      query: ParsedUrlQuery;
      parentName: string;
      fieldName: keyof IMenuObject;
    }) =>
    () => {
      let arrIdActive: string[] = [];
      const objectArray = Object.entries(params.query);
      const findParent = mockMenuProps.base.arrMenu.find(
        (menu) => menu.href.search(params.parentName) >= 0
      );

      const findIdLastQuery = (
        objectArray: [string, string | string[] | undefined][],
        parent: IMenuObject,
        count = 0
      ) => {
        const object = objectArray[count];
        const findObject = parent.children.find(
          (menu) =>
            object?.length > 0 &&
            menu.href.replace(/^.*[a-z,0-9,A-Z]\//g, '') === object[1]
        );

        if (findObject) {
          findIdLastQuery(objectArray, findObject, count + 1);

          arrIdActive.push(findObject[params.fieldName] as string);
        }
      };

      if (findParent) findIdLastQuery(objectArray, findParent);

      return arrIdActive
        .concat((findParent?.[params.fieldName] as string) || '')
        .reverse();
    },
});

export { arrMenuActiveFromQueryState };
