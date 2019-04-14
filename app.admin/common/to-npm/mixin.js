import { fgColor } from 'sc-companion';

export const stdLink = style => {
    style = style || {};
    const { hover, hout } = style;

    return `
	    text-decoration: none;
	    ${fgColor(hover, hout, '200ms')}
	    cursor: pointer;
	`;
};

export const stdInput = (style, hasError = false, focus = null) => {
    style = style || {};
    style.color = style.color || {};
    style.padding = '0.5rem';
    const { hover, hout, error } = style.color;
    return `
	${style.padding !== null ? `padding: ${style.padding};` : ''}
    background-color: white;
    ${!hasError && hout ? `border: 1px solid ${hout};` : ''}
    ${hasError && error ? `border: 1px solid ${error};` : ''}
    ${
        focus === null
            ? hover
                ? `&:hover, &:focus, &:active {border-color: ${hover};}; transition: border-color 200ms ease;`
                : ''
            : ''
    }
    ${
        focus !== null
            ? hover
                ? `
			        &:hover {border-color: ${hover};}; transition: border-color 200ms ease;
			        ${focus ? `border-color: ${hover};` : ''}
			    `
                : ''
            : ''
    }

    border-radius: 2px;
  `;
};
