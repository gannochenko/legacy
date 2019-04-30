import styled, { keyframes, css } from 'styled-components';
import { iconLabel, icon } from 'sc-companion';
import {
    withTheme,
    // stdLink,
} from '../../style/global';

const mapType2Icon = {
    info: 'info_outline',
    error: 'new_releases',
    offline: 'sync_disabled',
    confirm: 'check_circle',
};

const appear = keyframes`
  from {
    transform: translate(100%);
  }

  to {
    transform: translate(0);
  }
`;

const disappear = keyframes`
  from {
    opacity: 1;
	transform: translate(0, 0);
  }

  to {
	opacity: 0;
	height: 0;
	transform: translate(0, -20px);
  }
`;

export const Notification = styled.div`
    position: fixed;
    top: 5rem;
    right: 0;
`;

export const Message = withTheme(styled.div`
    margin-right: 0.5rem;
    background-color: white;
    max-width: 20rem;
    min-width: 1rem;
    animation: ${appear} 0.25s ease;
    ${props => (props.closable ? 'padding-right: 3rem;' : '')}
	border: 1px solid ${props => props.theme.input.color.hout};
	border-radius: 2px;
	position: relative;
	box-shadow: 4px 6px 15px -4px rgba(0,0,0,0.21);
	overflow-x: hidden;
	padding: 0.5rem 2.5rem 0.5rem 0;
`);

export const MessageWrap = styled.div`
    ${props =>
        props.closing
            ? css`
                  animation: ${disappear} 0.5s ease;
                  animation-fill-mode: forwards;
                  overflow: hidden;
              `
            : ''}
`;

export const MessageGap = styled.div`
    padding-bottom: 1rem;
`;

export const Text = styled.div`
    ${props =>
        iconLabel(
            props.type ? mapType2Icon[props.type] : 'info_outline',
            '1.3rem',
            '0',
            'baseline',
            '2.5rem',
        )}
    &:before {
        line-height: 100%;
    }
`;

export const Close = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    ${icon('close', '1rem', '0.7rem')}
    cursor: pointer;
`;
