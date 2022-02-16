import { memo } from 'react';
import IsEqual from 'react-fast-compare';

function Services(): JSX.Element {
  return (
    <div>
      <p>Services</p>
    </div>
  );
}

export default memo(Services, IsEqual);