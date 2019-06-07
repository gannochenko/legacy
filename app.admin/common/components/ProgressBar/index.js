import React from 'react';
import { connect } from 'react-redux';
import { object, number, func, bool } from 'prop-types';
import { defaultTheme, ProgressBarContainer, Progress } from './style';

export class ProgressBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.loadingBefore = false;
        this.startTimer = null;
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
        const {
            debounceTolerance,
            fadeTimeout,
            maximumStepDuration,
        } = this.props;

        if (loadingNow !== this.loadingBefore) {
            // preventing the transition from playing backward
            if (loadingNow && shown) {
                return;
            }

            if (!this.loadingBefore && loadingNow) {
                if (this.startTimer) {
                    return;
                }
                this.startTimer = setTimeout(() => {
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
                                                width +
                                                Math.floor(100 / stepCount),
                                        }));
                                        this.step += 1;
                                        if (this.step + 1 < stepCount - 1) {
                                            makeStep();
                                        }
                                    },
                                    this.step
                                        ? Math.floor(
                                              Math.random() *
                                                  maximumStepDuration,
                                          )
                                        : 50,
                                );
                            };
                            makeStep();
                        },
                    );
                }, debounceTolerance);
            } else if (this.loadingBefore && !loadingNow) {
                // end the process
                clearTimeout(this.startTimer);
                this.startTimer = null;
                clearTimeout(this.timer);
                this.setState({
                    width: 100,
                    fading: true,
                });
                this.fadeTimer = setTimeout(() => {
                    this.setState({
                        shown: false,
                    });
                }, fadeTimeout);
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
        const { observeGlobalLock, children, theme } = this.props;
        if (observeGlobalLock && !window.splashProgressBarUnlocked) {
            return null;
        }

        const { shown, width, fading } = this.state;

        if (children) {
            return children({ shown, width, fading });
        }

        return (
            <ProgressBarContainer theme={theme}>
                {shown && (
                    <Progress width={width} fading={fading} theme={theme} />
                )}
            </ProgressBarContainer>
        );
    }
}

ProgressBarComponent.propTypes = {
    theme: object,
    children: func,
    stepCount: number,
    debounceTolerance: number,
    state: object,
    observeGlobalLock: bool,
    fadeTimeout: number,
    maximumStepDuration: number,
};

ProgressBarComponent.defaultProps = {
    theme: defaultTheme,
    children: null,
    stepCount: 15,
    debounceTolerance: 200,
    state: {},
    observeGlobalLock: false,
    fadeTimeout: 1000,
    maximumStepDuration: 1000,
};

export default connect(s => ({ state: s }))(ProgressBarComponent);
