import PageScroll from '../../../../../lib/util/page-scroll.js';

import ValidatedQuickForm from 'uniforms-unstyled/ValidatedQuickForm';

export default class Form extends ValidatedQuickForm {
    scrollToElement(error) {
        const errorElName = _.getValue(error, 'details[0].name');
        if (errorElName) {
            this.scrollToError();
        }
    }

    scrollToError() {
        const $el = $('.has-error');
        if ($el && $el.offset()) {
            PageScroll.scrollTo($el.offset().top - 50);
        }
    }

    constructor() {
        super(...arguments);// eslint-disable-line

        this.state = {
            ...this.state,
            model: this.props.model,
            modelSync: this.props.model
        };
    }

    componentWillReceiveProps({model}) {
        super.componentWillReceiveProps(...arguments);// eslint-disable-line

        if (!_.deepEqual(this.props.model, model)) {
            this.setState({model, modelSync: model});
        }
    }

    getNativeFormProps() {
        const {
            onChangeModel, // eslint-disable-line no-unused-vars
            ...props
        } = super.getNativeFormProps();
        delete props.draftSave;
        return props;
    }

    getModel(mode) {
        return mode === 'form' ? this.state.modelSync : this.state.model;
    }

    onChange(key, value) {
        this.setState((state) => {
            const model = _.deepClone(state.modelSync);
            model[key] = value;

            return {modelSync: model};
        }, () => {
            super.onChange(...arguments);// eslint-disable-line
            this.setState({model: this.state.modelSync}, () => {
                if (this.props.onChangeModel) {
                    this.props.onChangeModel(this.state.model);
                }
            });
        });
    }

    onReset() {
        this.setState(() => {
            super.onReset();

            return {
                model: this.props.model,
                modelSync: this.props.model
            };
        });
    }

    onSubmit(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        return new Promise(resolve =>
            this.setState({validate: true}, () =>
                resolve(this.onValidate().then(
                    () => super.onSubmit(),
                    (err) => {
                        const className = this.props.className;
                        if (className && className.indexOf('js-not-scrollable') === -1) {
                            this.scrollToElement(err);
                        }
                    }
                ))));
    }

    onValidate() {
        if (this.props.draftSave) {
            const model = this.getChildContextModel();
            const isValidData = this.props.schema.namedContext().validate(model);
            if (!isValidData) {
                this.props.draftSave(model);
            }
        }

        return this.onValidateModel(this.getChildContextModel());
    }
};
