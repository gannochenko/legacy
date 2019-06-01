import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { func, object, bool, number } from 'prop-types';
import { ProgressBarContainer, Progress } from './style';

const ProgressBar = ({ state, steps }) => {
    if (!window.__progressBarUnlocked) {
        return null;
    }

    const [loadingBefore, setLoadingBefore] = useState(false);
    const [width, setWidth] = useState(0);
    const [shown, setShown] = useState(false);
    const [fading, setFading] = useState(false);

    const loadingNow = useMemo(() => {
        let hasLoading = false;
        const pageCodes = Object.keys(state);
        for (let i = 0; i < pageCodes.length; i++) {
            if (state[pageCodes[i]].loading) {
                hasLoading = true;
                break;
            }
        }

        return hasLoading;
    }, [state]);

    useEffect(() => {
        if (loadingNow !== loadingBefore) {
            if (!loadingBefore && loadingNow) {
                // restart the process
                console.dir('start');
                setShown(true);
                setFading(false);
                setWidth(30);
            } else if (loadingBefore && !loadingNow) {
                // end the process
                console.dir('stop');
                setFading(true);
                setWidth(100);
                setTimeout(() => {
                    setShown(false);
                }, 1000);
            }

            setLoadingBefore(loadingNow);
        }
    }, [loadingBefore, loadingNow]);

    return (
        <ProgressBarContainer>
            {shown && <Progress width={width} fading={fading} />}
        </ProgressBarContainer>
    );
};

ProgressBar.propTypes = {
    steps: number,
};

ProgressBar.defaultProps = {
    steps: 15,
};

export default connect(s => ({ state: s }))(ProgressBar);
