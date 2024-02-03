import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import useSWR from 'swr';
import { Deployment } from '../../cloudfront/cloudfront-client';

export const useDeployments = () => {
  const {
    routes: { api },
    serverURL,
  } = useConfig();
  const baseURL = `${serverURL}${api}`;
  const { data, isLoading, isValidating, error, mutate } = useSWR<Deployment[]>(
    `${baseURL}/deployments`,
    () => fetch(`${baseURL}/deployments`).then((res) => res.json()),
    {
      suspense: true,
      refreshInterval: 10 * 1000,
    }
  );

  return {
    data,
    mutate,
    isLoading,
    isValidating,
    error,
  };
};
