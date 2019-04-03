import React from 'react';
import { Container } from './style.js';

const List = ({ children }) => (
    <Container>
        <table>
            <thead>
                <th>
                    <td>Code</td>
                </th>
            </thead>
            <tbody>
                <tr>
                    <td>353454543</td>
                </tr>
            </tbody>
        </table>
    </Container>
);

export default List;
