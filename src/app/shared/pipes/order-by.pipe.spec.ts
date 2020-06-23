
import { OrderByPipe } from './order-by.pipe';

describe('TitleCasePipe', () => {

  const pipe = new OrderByPipe();

  it('transforms order array [b,c,a] by asc should return [a,b,c]', () => {
    expect(pipe.transform([{ val: 'b'}, { val: 'c'}, { val: 'a'}], 'val', true)).toEqual([{ val: 'a'}, { val: 'b'}, { val: 'c'}]);
  });

  it('transforms order array [b,c,a] by desc should return [c,b,a]', () => {
    expect(pipe.transform([{ val: 'b'}, { val: 'c'}, { val: 'a'}], 'val', false)).toEqual([{ val: 'c'}, { val: 'b'}, { val: 'a'}]);
  });

  it('transforms order array [2,3,1] by asc should return [1,2,3]', () => {
    expect(pipe.transform([{ val: 2}, { val: 3}, { val: 1}], 'val', true)).toEqual([{ val: 1}, { val: 2}, { val: 3}]);
  });

  it('transforms order array [2,3,1] by desc should return [3,2,1]', () => {
    expect(pipe.transform([{ val: 2}, { val: 3}, { val: 1}], 'val', false)).toEqual([{ val: 3}, { val: 2}, { val: 1}]);
  });
});
