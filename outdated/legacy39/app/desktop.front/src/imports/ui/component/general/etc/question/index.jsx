import React from 'react';
// import PropTypes from 'prop-types';

import Modal from '../modal';
import BaseComponent from '../../../../../lib/base/component/component.jsx';
import './style.less';

export default class Question extends BaseComponent
{
	/**
	 * Open a question as a singleton
	 * @param question
	 * @param params
	 * @returns {Promise<String>}
	 */
	static async ask(question, params)
	{
		params = params || {};
		const buttons = params.buttons;

		return new Promise((resolve, reject) => {
			Modal.open(
				(
					<div className="question">
						<div className="question__body">
							{question}
						</div>
						{
							_.isArrayNotEmpty(buttons)
							&&
							<div className="question__answers">
								{buttons.map((button) => {
									return (
										<button
											className="pl-button"
											key={button.code}
											onClick={() => {
												resolve({code: button.code});
												Modal.close();
											}}
										>
											{button.label}
										</button>
									);
								})}
							</div>
						}
					</div>
				),
				{
					onCloseByUser: reject,
				}
			);
		});
	}

	// todo: non-singleton version
	render()
	{
		return (
			<Modal>
			</Modal>
		);
	}
}
