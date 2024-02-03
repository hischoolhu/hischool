import React from 'react';

import DeploymentsTable from '../Deployments/Table';
import DeploymentsActions from '../Deployments/Actions';

import './index.scss';

const baseClass = 'before-dashboard';

const BeforeDashboard: React.FC = () => {
  return (
    <section>
      <div className={baseClass}>
        <h2 className={`${baseClass}--title`}>Deployments</h2>
        <DeploymentsActions />
      </div>
      <div>
        <DeploymentsTable />
      </div>
    </section>
  );
};

export default BeforeDashboard;
