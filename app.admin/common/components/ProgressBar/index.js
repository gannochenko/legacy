import React from 'react';
import { connect } from 'react-redux';
import { object, number } from 'prop-types';
import { ProgressBarContainer, Progress } from './style';

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.loadingBefore = false;
        this.timer = null;
        this.fadeTimer = null;
        this.step = 0;

        this.state = {
            loading: false,
            width: 0,
            shown: false,
            fading: false,
        };
    }

    componentDidUpdate() {
        const loadingNow = this.isLoading(this.props);
        const { shown } = this.state;

        if (loadingNow !== this.loadingBefore) {
            // preventing the transition from playing backward
            if (loadingNow && shown) {
                return;
            }

            if (!this.loadingBefore && loadingNow) {
                // restart the process
                const { stepCount } = this.props;

                clearTimeout(this.fadeTimer);
                this.step = 0;
                this.setState(
                    {
                        width: 0,
                        fading: false,
                        shown: true,
                    },
                    () => {
                        const makeStep = () => {
                            this.timer = setTimeout(
                                () => {
                                    this.setState(({ width }) => ({
                                        width:
                                            width + Math.floor(100 / stepCount),
                                    }));
                                    this.step += 1;
                                    if (this.step + 1 < stepCount - 1) {
                                        makeStep();
                                    }
                                },
                                this.step
                                    ? Math.floor(Math.random() * 1000)
                                    : 50,
                            );
                        };
                        makeStep();
                    },
                );
            } else if (this.loadingBefore && !loadingNow) {
                // end the process
                clearTimeout(this.timer);
                this.setState({
                    width: 100,
                    fading: true,
                });
                this.fadeTimer = setTimeout(() => {
                    this.setState({
                        shown: false,
                    });
                }, 1000);
            }
        }

        this.loadingBefore = loadingNow;
    }

    isLoading(props) {
        const { state } = props;
        let hasLoading = false;
        const pageCodes = Object.keys(state);
        for (let i = 0; i < pageCodes.length; i += 1) {
            if (state[pageCodes[i]].loading) {
                hasLoading = true;
                break;
            }
        }

        return hasLoading;
    }

    render() {
        if (!window.__progressBarUnlocked) {
            return null;
        }

        const { shown, width, fading } = this.state;

        return (
            <ProgressBarContainer>
                {shown && <Progress width={width} fading={fading} />}
            </ProgressBarContainer>
        );
    }
}

ProgressBar.propTypes = {
    stepCount: number,
    state: object,
};

ProgressBar.defaultProps = {
    stepCount: 15,
    state: {},
};

export default connect(s => ({ state: s }))(ProgressBar);
