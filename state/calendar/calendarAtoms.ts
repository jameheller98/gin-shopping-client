import { atom, atomFamily } from 'recoil';

const currentDateObjectState = atom({
  key: 'CurrentDateObjectState',
  default: new Date(),
});

const currentSelectDateObjectState = atomFamily({
  key: 'CurrentSelectDateObjectState',
  default: (timeZone: string) =>
    new Date(new Date().toLocaleString('en-US', { timeZone })),
});

export { currentDateObjectState, currentSelectDateObjectState };
