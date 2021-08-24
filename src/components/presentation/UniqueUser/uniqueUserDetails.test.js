describe("test", () => {
  it('renders correctly', () => {
    jest.mock('react-router', () => ({
      useParams: jest.fn().mockReturnValue({ id: '1' }),
    }));
  })
})