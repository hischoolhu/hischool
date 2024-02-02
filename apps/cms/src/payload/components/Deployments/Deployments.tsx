import { Table } from 'payload/dist/admin/components/elements/Table';
import { Column } from 'payload/dist/admin/components/elements/Table/types';
import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import { formatDate } from 'payload/dist/admin/utilities/formatDate';
import React from 'react';
import useSWR from 'swr';
import { Deployment } from '../../cloudfront/cloudfront-client';

import './deployments.scss';

const useDeployments = () => {
  const {
    routes: { api },
    serverURL,
  } = useConfig();
  const baseURL = `${serverURL}${api}`;
  const { data, isLoading, isValidating, error } = useSWR<Deployment[]>(
    `${baseURL}/deployments`,
    () => fetch(`${baseURL}/deployments`).then((res) => res.json())
    // { refreshInterval: 10 * 1000 }
  );

  return {
    deployments: data,
    isLoading,
    isValidating,
    error,
  };
};

const deploymentColumns: Column[] = [
  {
    name: 'Created on',
    accessor: 'created_on',
    active: true,
    components: {
      Heading: <div>Created on</div>,
      renderCell: (row, data) => formatDate(data, 'yyyy.MM.dd. HH:mm:ss'),
    },
    label: 'Created on',
  },
];

const baseClass = 'deployments';

const Deployments: React.FC = () => {
  const { deployments } = useDeployments();
  return (
    <div className={baseClass}>
      <Table columns={deploymentColumns} data={deployments} />
    </div>
  );
};

export default Deployments;
