import styled from 'styled-components';
import { centralColumn, rectangle, align, backgroundCover } from 'sc-companion';
import CoinImg from '../../../public/coin.png';

export const Container = styled.div`
    ${centralColumn()}
    padding-top: 2rem;
    padding-bottom: 2rem;
`;

export const CoinRow = styled.div`
    ${rectangle('3rem', '5rem')}
    ${align('center', 'center')}
  border: 1px solid gray;
    border-radius: 3px;
`;

export const Coin = styled.div`
    ${rectangle('1rem')}
    ${backgroundCover(CoinImg)}
`;
