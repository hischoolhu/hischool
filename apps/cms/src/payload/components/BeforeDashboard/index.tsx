import { Button } from 'payload/components';
import React from 'react';

import './index.scss';

const baseClass = 'before-dashboard';
const buttonClass = 'btn';

const BeforeDashboard: React.FC = () => {
  return (
    <section className={baseClass}>
      <Button
        buttonStyle="secondary"
        className={`${baseClass}--${buttonClass}`}
      >
        Preview
      </Button>
      <Button className={`${baseClass}--${buttonClass}`}>Publish</Button>
    </section>
  );
};

export default BeforeDashboard;
