import { Button } from 'payload/components';
import React from 'react';

import Deployments from '../Deployments/Deployments';

import './index.scss';

const baseClass = 'before-dashboard';
const actionsClass = 'actions';
const buttonClass = 'btn';

const BeforeDashboard: React.FC = () => {
  return (
    <section>
      <div className={baseClass}>
        <h2 className={`${baseClass}--title`}>Deployments</h2>
        <div className={`${baseClass}--${actionsClass}`}>
          <Button
            buttonStyle="secondary"
            className={`${baseClass}--${actionsClass}__${buttonClass}`}
          >
            Preview
          </Button>
          <Button className={`${baseClass}--${actionsClass}__${buttonClass}`}>
            Publish
          </Button>
        </div>
      </div>
      <div>
        <Deployments />
      </div>
    </section>
  );
};

export default BeforeDashboard;
