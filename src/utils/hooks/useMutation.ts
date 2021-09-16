import {useCallback, useState} from 'react';

export const useMutation = <Req = any, Res = any>(
  endpoint: string,
  fetcher: (endpoint: string, req?: Req) => Promise<Res>,
): [
  excute: (req: Req) => Promise<Res | undefined>,
  loading: boolean,
  error: string | null,
] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const excute = useCallback(
    async (req: Req) => {
      try {
        setError(null);
        setLoading(true);
        return await fetcher(endpoint, req);
      } catch (error: any) {
        console.log('error: ', error);
        const message = error?.message || 'Unexpected Error';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [setError, setLoading],
  );

  return [excute, loading, error];
};
