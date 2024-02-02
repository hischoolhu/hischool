import { Table } from 'payload/dist/admin/components/elements/Table';
import { Column } from 'payload/dist/admin/components/elements/Table/types';
import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import { formatDate } from 'payload/dist/admin/utilities/formatDate';
import React from 'react';
import useSWR from 'swr';
import { Deployment } from '../../cloudfront/cloudfront-client';

import { Pill } from 'payload/components';
import './deployments.scss';

const useDeployments = () => {
  const {
    routes: { api },
    serverURL,
  } = useConfig();
  const baseURL = `${serverURL}${api}`;
  const { data, isLoading, isValidating, error } = useSWR<Deployment[]>(
    `${baseURL}/deployments`,
    () => fetch(`${baseURL}/deployments`).then((res) => res.json()),
    {
      suspense: true,
      // refreshInterval: 10 * 1000, //TODO enable this
    }
  );

  return {
    data,
    isLoading,
    isValidating,
    error,
  };
};

const deploymentColumns: Column[] = [
  {
    name: 'Environment',
    accessor: 'environment',
    active: true,
    components: {
      Heading: <div>Environment</div>,
      renderCell: (row, data) => (
        <Pill pillStyle="light-gray" rounded>
          {data}
        </Pill>
      ),
    },
    label: 'State',
  },
  {
    name: 'State',
    accessor: 'latest_stage',
    active: true,
    components: {
      Heading: <div>State</div>,
      renderCell: (row, data) => (
        <Pill pillStyle="success">
          {data.name}:{data.status}
        </Pill>
      ),
    },
    label: 'State',
  },
  {
    name: 'Created on',
    accessor: 'created_on',
    active: true,
    components: {
      Heading: <div>Created on</div>,
      renderCell: (row, data) => formatDate(data, 'yyyy.MM.dd. HH:mm:ss'), //TODO extract this & use date format from payload config
    },
    label: 'Created on',
  },
];

const baseClass = 'deployments';

const Deployments: React.FC = () => {
  const { data: deployments } = useDeployments();
  return (
    <div className={baseClass}>
      <Table columns={deploymentColumns} data={deployments} />
    </div>
  );
};

export default Deployments;
