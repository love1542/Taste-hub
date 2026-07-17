export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message: string;
};

export async function mockApi<T>({
  data,
  success = true,
  message = 'Success',
  delay = 1500,
}: {
  data?: T;
  success?: boolean;
  message?: string;
  delay?: number;
}): Promise<ApiResponse<T>> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success,
        data,
        message,
      });
    }, delay);
  });
}