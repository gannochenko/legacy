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
} from './style.js';

const List = ({ children }) => (
    <Container>
        <Table cellPadding="0" cellSpacing="0">
            <THead>
                <TR>
                    <TH>
                        <HeaderLink>Code</HeaderLink>
                    </TH>
                    <TH>Name</TH>
                </TR>
            </THead>
            <TBody>
                <TR>
                    <TD>353454543</TD>
                    <TD>Mr Twister</TD>
                </TR>
            </TBody>
        </Table>
    </Container>
);

export default List;
