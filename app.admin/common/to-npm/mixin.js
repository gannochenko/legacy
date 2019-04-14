export const borderColor = (hout, hover) => `
	${hout ? `border-color: ${hout};` : ''}
	${
        hover
            ? `&:hover { border-color: ${hover}; transition: border-color 200ms ease;}`
            : ''
    }
`;
