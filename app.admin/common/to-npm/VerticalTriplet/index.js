import React from 'react';
import { VerticalTriplet, Top, Middle, Bottom } from './style.js';

export default ({ top, bottom, children }) => (
    <VerticalTriplet>
        {!!top && <Top>{top}</Top>}
        <Middle>{children}</Middle>
        {!!bottom && <Bottom>{bottom}</Bottom>}
    </VerticalTriplet>
);
