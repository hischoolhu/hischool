import { Table } from 'payload/dist/admin/components/elements/Table';
import { Column } from 'payload/dist/admin/components/elements/Table/types';
import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import { formatDate } from 'payload/dist/admin/utilities/formatDate';
import React, { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { Deployment } from '../../../cloudfront/cloudfront-client';

import { Pill } from 'payload/components';
import { useDeployments } from '../use-deployments';
import './index.scss';

const CreatedOnCell: React.FC<{ date: string }> = ({ date }) => {
  const {
    admin: { dateFormat },
  } = useConfig();

  const { i18n } = useTranslation();

  return <>{formatDate(date, dateFormat, i18n?.language)}</>;
};

const StateCell: React.FC<{ data: Deployment['latest_stage'] }> = ({
  data,
}) => {
  const stageStatus =
    `${data.status}:${data.name}` satisfies `${(typeof data)['status']}:${(typeof data)['name']}`;
  let pillStyle: ComponentProps<typeof Pill>['pillStyle'] = 'light-gray';
  let status: 'skipped' | 'deploying' | 'success' | 'error';

  switch (stageStatus) {
    case 'success:deploy':
      pillStyle = 'success';
      status = 'success';
      break;
    case 'failure:queued':
    case 'failure:initialize':
    case 'failure:clone_repo':
    case 'failure:build':
    case 'failure:deploy':
      pillStyle = 'error';
      status = 'error';
      break;
    case 'idle:queued':
      pillStyle = 'light-gray';
      status = 'skipped';
      break;
    default:
      pillStyle = 'warning';
      status = 'deploying';
      break;
  }

  return <Pill pillStyle={pillStyle}>{status}</Pill>;
};

const deploymentColumns: Column[] = [
  {
    name: 'Environment',
    accessor: 'environment',
    active: true,
    components: {
      Heading: <div>Environment</div>,
      renderCell: (row, data) => (
        <Pill pillStyle="light-gray" className="environment">
          <a href={row.url} target="_blank">
            {data}
          </a>
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
      renderCell: (row, data) => <StateCell data={data} />,
    },
    label: 'State',
  },
  {
    name: 'Created on',
    accessor: 'created_on',
    active: true,
    components: {
      Heading: <div>Created on</div>,
      renderCell: (row, data) => <CreatedOnCell date={data} />,
    },
    label: 'Created on',
  },
];

const baseClass = 'deployments';

const DeploymentsTable: React.FC = () => {
  const { data: deployments } = useDeployments();
  return (
    <div className={baseClass}>
      <Table columns={deploymentColumns} data={deployments} />
    </div>
  );
};

export default DeploymentsTable;
