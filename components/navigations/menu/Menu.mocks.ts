import { TMenu } from './Menu';

const base: TMenu = {
  arrMenu: [
    { id: '1', name: 'HOME', bgColorChild: '', children: [] },
    {
      id: '2',
      name: 'PRODUCT',
      bgColorChild: 'bg-slate-100',
      children: [
        {
          id: '3',
          name: 'MEN',
          bgColorChild: 'bg-slate-200',
          children: [
            {
              id: '4',
              name: 'SHIRTS',
              bgColorChild: '',
              children: [],
            },
            {
              id: '5',
              name: 'T-SHIRTS',
              bgColorChild: '',
              children: [],
            },
            {
              id: '6',
              name: 'PANTS',
              bgColorChild: '',
              children: [],
            },
          ],
        },
        {
          id: '7',
          name: 'WOMAN',
          bgColorChild: 'bg-slate-200',
          children: [
            {
              id: '8',
              name: 'SHIRTS',
              bgColorChild: '',
              children: [],
            },
            {
              id: '9',
              name: 'T-SHIRTS',
              bgColorChild: '',
              children: [],
            },
            {
              id: '10',
              name: 'PANTS',
              bgColorChild: '',
              children: [],
            },
          ],
        },
        {
          id: '11',
          name: 'UNISEX',
          bgColorChild: 'bg-slate-200',
          children: [
            {
              id: '12',
              name: 'SHIRTS',
              bgColorChild: '',
              children: [],
            },
            {
              id: '13',
              name: 'T-SHIRTS',
              bgColorChild: '',
              children: [],
            },
            {
              id: '14',
              name: 'PANTS',
              bgColorChild: '',
              children: [],
            },
          ],
        },
        {
          id: '15',
          name: 'ACCESSORIES',
          bgColorChild: '',
          children: [],
        },
      ],
    },
    { id: '16', name: 'FAQ', bgColorChild: '', children: [] },
    { id: '17', name: 'ABOUT', bgColorChild: '', children: [] },
    { id: '18', name: 'LOGIN', bgColorChild: '', children: [] },
  ],
};

export const mockMenuProps = {
  base,
};
