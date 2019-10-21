describe('my first test', () => {
  let sut;

  beforeEach(() => {
    sut = {};
  });

  it('should be ture if true', () => {
    // arrange
    sut.a = false;

    // act
    sut.a = true;

    // assert
    expect(sut.a).toEqual(true);
  });
});
