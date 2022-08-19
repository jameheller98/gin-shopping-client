import { TMenu } from './Menu';

const base: TMenu = {
  arrMenu: [
    { id: '1', name: 'HOME', bgColor: 'bg-white', children: [] },
    {
      id: '2',
      name: 'PRODUCT',
      bgColor: 'bg-white',
      children: [
        {
          id: '3',
          name: 'MEN',
          bgColor: 'bg-slate-100',
          children: [
            {
              id: '4',
              name: 'SHIRTS',
              bgColor: 'bg-slate-200',
              children: [],
            },
            {
              id: '5',
              name: 'T-SHIRTS',
              bgColor: 'bg-slate-200',
              children: [],
            },
            {
              id: '6',
              name: 'PANTS',
              bgColor: 'bg-slate-200',
              children: [],
            },
          ],
        },
        {
          id: '7',
          name: 'WOMAN',
          bgColor: 'bg-slate-100',
          children: [
            {
              id: '8',
              name: 'SHIRTS',
              bgColor: 'bg-slate-200',
              children: [],
            },
            {
              id: '9',
              name: 'T-SHIRTS',
              bgColor: 'bg-slate-200',
              children: [],
            },
            {
              id: '10',
              name: 'PANTS',
              bgColor: 'bg-slate-200',
              children: [],
            },
          ],
        },
        {
          id: '11',
          name: 'UNISEX',
          bgColor: 'bg-slate-100',
          children: [
            {
              id: '12',
              name: 'SHIRTS',
              bgColor: 'bg-slate-200',
              children: [],
            },
            {
              id: '13',
              name: 'T-SHIRTS',
              bgColor: 'bg-slate-200',
              children: [],
            },
            {
              id: '14',
              name: 'PANTS',
              bgColor: 'bg-slate-200',
              children: [],
            },
          ],
        },
        {
          id: '15',
          name: 'ACCESSORIES',
          bgColor: 'bg-slate-100',
          children: [],
        },
      ],
    },
    { id: '16', name: 'FAQ', bgColor: 'bg-white', children: [] },
    { id: '17', name: 'ABOUT', bgColor: 'bg-white', children: [] },
    { id: '18', name: 'LOGIN', bgColor: 'bg-white', children: [] },
  ],
  isParent: true,
};

export const mockMenuProps = {
  base,
};
