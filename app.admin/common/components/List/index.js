import React from 'react';
import {
    Container,
    Table,
    THead,
    TBody,
    TH,
    TR,
    TD,
    HeaderLink,
    PageNav,
    Footer,
    Counter,
} from './style.js';
import Button from '../../material-kit/CustomButtons';

const List = ({ columns, children }) => (
    <Container>
        <Table cellPadding="0" cellSpacing="0">
            <THead>
                <TR>
                    {columns.map(column => (
                        <TH>
                            <HeaderLink sortable={column.sortable} up>
                                {column.display}
                            </HeaderLink>
                        </TH>
                    ))}
                </TR>
            </THead>
            <TBody>
                <TR>
                    <TD>353454543</TD>
                    <TD>Mr Twister</TD>
                    <TD>Value</TD>
                    <TD>Value 2</TD>
                </TR>
                <TR>
                    <TD>353454543</TD>
                    <TD>Mr Twister</TD>
                    <TD>Value</TD>
                    <TD>Value 2</TD>
                </TR>
                <TR>
                    <TD>353454543</TD>
                    <TD>Mr Twister</TD>
                    <TD>Value</TD>
                    <TD>Value 2</TD>
                </TR>
                <TR>
                    <TD>353454543</TD>
                    <TD>Mr Twister</TD>
                    <TD>Value</TD>
                    <TD>Value 2</TD>
                </TR>
                <TR>
                    <TD>353454543</TD>
                    <TD>Mr Twister</TD>
                    <TD>Value</TD>
                    <TD>Value 2</TD>
                </TR>
                <TR>
                    <TD>353454543</TD>
                    <TD>Mr Twister</TD>
                    <TD>Value</TD>
                    <TD>Value 2</TD>
                </TR>
            </TBody>
        </Table>
        <Footer>
            <Counter>Count: 143</Counter>
            <PageNav>
                <Button color="warning" size="sm">
                    &larr;
                </Button>
                <Button color="warning" size="sm">
                    1
                </Button>
                <Button color="warning" size="sm">
                    2
                </Button>
                <Button color="warning" size="sm">
                    3
                </Button>
                <Button color="warning" size="sm">
                    &rarr;
                </Button>
            </PageNav>
        </Footer>
    </Container>
);

export default List;
