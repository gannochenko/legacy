import styled from 'styled-components';
import { stdInput, stdLink, fgColor, icon, align, group } from 'sc-companion';
import { withTheme } from '../../style/global';

export const List = withTheme(styled.div`
    border-bottom: 1px solid ${props => props.theme.input.color.hout};
`);

export const ItemPicker = withTheme(styled.div`
    background-color: white;
    border: 1px solid ${props => props.theme.input.color.hout};
    border-radius: 2px;
    min-width: 20rem;
    padding: 1rem;
`);

export const AddButton = withTheme(styled.div`
    ${icon('add_box', '1.5rem')}
    line-height: 100%;
    ${props =>
        fgColor(
            props.theme.button.color.hover,
            props.theme.button.color.hout,
            '200ms',
        )}
    cursor: pointer;
`);

export const Item = withTheme(styled.div`
    ${align('center', 'left')}

    padding: 0.5rem 0;
    &:not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.input.color.hout};
    }
`);

export const ItemData = styled.div`
    flex-grow: 2;
`;

export const ItemActions = styled.div``;

export const RemoveButton = withTheme(styled.div`
    ${icon('remove_circle', '1.5rem')}
    line-height: 100%;
    ${props =>
        fgColor(
            props.theme.button.color.hover,
            props.theme.button.color.hout,
            '200ms',
        )}
    cursor: pointer;
`);

export const ItemLink = withTheme(styled.a`
    ${props => stdLink(props.theme.link)}
`);

export const ItemDescription = withTheme(styled.div`
    font-size: ${props => props.theme.font.xSmall};
`);

export const Search = styled.input`
    ${props => stdInput(props.theme.input, !!props.error)}
    width: 100%;
    margin-bottom: 0.5rem;
`;

export const SearchResults = styled.div`
    ${group('0.5rem')}
`;

export const SearchItem = styled.div`
    ${align('top', 'left')}
`;

export const SearchItemData = styled.div`
    flex-grow: 2;
    font-size: 0.6rem;
`;

export const SearchItemActions = styled.div``;
