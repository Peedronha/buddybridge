import { AnimalModel } from './animal.model';

describe('Animal', () => {
  it('should create an instance', () => {
    expect(new AnimalModel()).toBeTruthy();
  });
});
