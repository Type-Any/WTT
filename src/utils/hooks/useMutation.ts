import {useCallback, useState} from 'react';

export const useMutation = <Req = any, Res = any>(
  fetcher: (endpoint: string, req?: Req) => Promise<Res>,
  revalidateFn?: () => void,
): [
  excute: (endpoint: string, req: Req) => Promise<Res | undefined>,
  loading: boolean,
  error: string | null,
] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const excute = async (endpoint: string, req: Req) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetcher(endpoint, req);
      revalidateFn?.();
      return response;
    } catch (error: any) {
      const message = error?.message || 'Unexpected Error';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return [excute, loading, error];
};
