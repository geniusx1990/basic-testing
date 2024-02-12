import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (func: () => unknown) => func,
}));

describe('throttledGetDataFromApi', () => {
  const path = '/users/1';
  const mockData = { id: '1', username: 'Alex' };
  const baseURL = 'https://jsonplaceholder.typicode.com';
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(axios, 'create').mockReturnValue(axios);
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(path);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(path);

    expect(axios.get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(path);

    expect(result).toEqual(mockData);
  });
});
