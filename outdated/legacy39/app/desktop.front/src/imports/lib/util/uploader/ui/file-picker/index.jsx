import React from 'react';

import BaseComponent from '../../../../base/component/component.jsx';
import FileEntity from '../../../../../api/file/entity/entity.client.js';
import Cropper from 'cropperjs2';

import PropTypes from 'prop-types';

import './style.less';
import './cropper.less';

export default class FilePicker extends BaseComponent
{
    static propTypes = {
        onChange: PropTypes.func,
        onImportantProcessStart: PropTypes.func,
        onImportantProcessStop: PropTypes.func,
        value: PropTypes.array,
        files: PropTypes.array,
        multiple: PropTypes.bool,
        imagesOnly: PropTypes.bool,
    };

    static defaultProps = {
        onChange: null,
        onImportantProcessStart: null,
        onImportantProcessStop: null,
        value: [],
        files: [],
        multiple: false,
        imagesOnly: false,
    };

    _invisible = null;
    _selector = null;

    constructor(props)
    {
        super(props);
        this.extendState({
            src: '',
            selected: false,
	        loading: false,
        });
    }

    componentWillReceiveProps(props)
    {
        // console.dir('New props!');
        // console.dir(props);
    }

    componentWillUnmount()
    {
        super.componentWillUnmount();
        this.destroyCropper();
    }

    onFileAddClick()
    {
    	// todo: remove this shit-fix of the truly weirdest bug in OSX
    	if (this._clicked)
	    {
	    	return;
	    }
	    this._clicked = true;
    	setTimeout(() => {
    		this._clicked = false;
	    }, 500);

        this._invisible.innerHTML = '';
        const selector = this.makeSelector();
        selector.appendTo(this._invisible);
        
        selector.get(0).click();
    }

    onSaveClick()
    {
        const cropper = this.getCropper();
        if (cropper) {
            this.disable();
            this.setLoading();
            cropper.getCroppedCanvas().toBlob((blob) => {
                this.upload(blob).then((id) => {
                    this.onChange(id);
                }).catch((result) => {
                    let e = null;
                    if (_.isFunction(result.getErrors))
                    {
                        e = result.getErrors()[0];
                    }
                	this.notifyUser(
                        e.httpStatus.toString() === '413' ? 'Размер файла превышает 2 мегабайта' : 'Не удалось загрузить файл',
                        {lifeTime: 5000, closeable: true, code: 'upload_failed', type: 'error'}
                    );
                	this.enable();
                });
            });
        }
    }

    onFileButtonChange()
    {
        const button = this.getSelector().get(0);
        const files = button.files;

        this.setState({
	        selected: false,
        });
	    if (this._cropper)
	    {
		    this._cropper.clear();
	    }

        if (files && files[0])
        {
            if (files[0].size > 1024 * 1024 * 2) {
                this.notifyUser(
                    'Размер файла превышает 2 мегабайта',
                    {lifeTime: 5000, closeable: true, code: 'upload_failed', type: 'error'}
                );
                return;
            }

            if (this.acceptImagesOnly()) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const src = e.target.result;
                    if (_.isStringNotEmpty(src))
                    {
                        this.setState({
                            src,
                            selected: true,
                        }, () => {
                            if (this._cropper)
                            {
                                this._cropper.replace(src);
                            }
                            else
                            {
                                this._cropper = new Cropper(this._image, {
                                    autoCrop: false,
                                });
                            }
                        });
                    }
                };
                reader.readAsDataURL(files[0]);
            } else {
                // start uploading right away
                this.disable();
                this.setLoading();
                this.upload(files[0]).then((id) => {
                    this.onChange(id);
                }).catch((result) => {
                    let e = null;
                    if (_.isFunction(result.getErrors))
                    {
                        e = result.getErrors()[0];
                    }
                    this.notifyUser(
                        e.httpStatus.toString() === '413' ? 'Размер файла превышает 2 мегабайта' : 'Не удалось загрузить файл',
                        {lifeTime: 5000, closeable: true, code: 'upload_failed', type: 'error'}
                    );
                    this.enable();
                });
            }
        }
    }

	onCropToggleClick()
	{
		if (this._cropper)
		{
			const crData = this._cropper.getCropBoxData();

			if (_.isObjectNotEmpty(crData))
			{
				this._cropper.clear();
			}
			else
			{
				this._cropper.crop();
			}
		}
	}

	onRotateClick(way)
	{
		if (this._cropper)
		{
			this._cropper.rotate(way);
		}
	}

	onRotate90Click()
	{
		if (this._cropper)
		{
			this._cropper.rotate(-90);
		}
	}

	onZoomClick(way)
	{
		if (this._cropper)
		{
			this._cropper.zoom(way * 0.1);
		}
	}

    getCropper()
    {
        return this._cropper || null;
    }

    destroyCropper()
    {
        if (this._cropper)
        {
            this._cropper.destroy();
            this._cropper = null;
        }
    }

    getValue()
    {
        return this.props.value;
    }

    onChange(id)
    {
        // mere with existing ids
        if (_.isFunction(this.props.onChange))
        {
            this.props.onChange(id);
        }
    }

    acceptImagesOnly() {
        return this.props.imagesOnly === true;
    }

    getFilter() {
        if (this.acceptImagesOnly()) {
            return 'image/x-png,image/gif,image/jpeg';
        }

        return '';
    }

    makeSelector()
    {
        if (this.isMultiple())
        {
            this._selector = $(`<input type="file" name="files" multiple="" accept="${this.getFilter()}">`);
        }
        else
        {
            this._selector = $(`<input type="file" name="files" accept="${this.getFilter()}">`);
        }

        this._selector.on('change', this.onFileButtonChange.bind(this));
        return this.getSelector();
    }

    getSelector()
    {
        return this._selector;
    }

    setPercent(percent)
    {
    	this.setState({
		    loadingPercent: percent,
	    });
    }

    getPercent()
    {
    	return this.state.loadingPercent;
    }

    disable()
    {
    	if (this._cropper)
	    {
	    	this._cropper.disable();
	    }
    }

	enable()
	{
		if (this._cropper)
		{
			this._cropper.enable();
		}
	}

	// toggleLoading()
	// {
	// 	if (this.isLoading())
	// 	{
	// 		this.setLoaded();
	// 	}
	// 	else
	// 	{
	// 		this.setLoading();
	// 		this.setPercent(30);
	// 	}
	// }

	setLoading()
	{
	    if (_.isFunction(this.props.onImportantProcessStart))
        {
            this.props.onImportantProcessStart();
        }
		this.setState({
			loading: true,
		});
		this.setPercent(0);
		this.disable();
	}

	setLoaded()
	{
        if (_.isFunction(this.props.onImportantProcessStop))
        {
            this.props.onImportantProcessStop();
        }
		this.setState({
			loading: false,
		});
		this.enable();
	}

	isLoading()
	{
		return this.state.loading;
	}

    async upload(data)
    {
        return this.uploadFile(data, this.setPercent.bind(this)).then((result) => {
            this.setLoaded();

            // todo: in case of any error, notify user here!
            if (result.isSuccess())
            {
                return result.getId();
            }
            else
            {
                return null;
            }
        }).catch(() => {
            this.setLoaded();
        });
    }

    async uploadFile(file, progressCallback)
    {
        return await FileEntity.save(null, file, {
            progressCallback
        });
    }

    getCount()
    {
        return this.getValue().length;
    }

    isMultiple()
    {
        return this.props.multiple;
    }

    render()
    {
        const s = this.state.selected;

        return (
            <div className="file-picker">
                {
                    this.acceptImagesOnly()
                    &&
                    <div
                        className="file-picker-single-image__preview rb-margin-b_x"
                    >
                        {
                            _.isStringNotEmpty(this.state.src)
                            &&
                            <img
                                className="file-picker-single-image__preview-image"
                                src={this.state.src}
                                ref={(ref) => { this._image = ref; }}
                            />
                        }
                    </div>
                }
                <div>
	                {
                        (!this.isLoading() && this.acceptImagesOnly())
		                &&
		                <div className="file-picker__controls">
			                <div
				                className="file-picker__control_add"
				                onClick={this.onFileAddClick.bind(this)}
			                />
			                <div
				                className={`file-picker__control_resize ${s ? '' : 'file-picker__control_disabled'}`}
				                onClick={this.onCropToggleClick.bind(this)}
			                />
			                <div
				                className={`file-picker__control_rotate-90 ${s ? '' : 'file-picker__control_disabled'}`}
				                onClick={this.onRotate90Click.bind(this)}
			                />
			                <div
				                className={`file-picker__control_rotate-cw ${s ? '' : 'file-picker__control_disabled'}`}
				                onClick={this.onRotateClick.bind(this, 1)}
			                />
			                <div
				                className={`file-picker__control_rotate-ccw ${s ? '' : 'file-picker__control_disabled'}`}
				                onClick={this.onRotateClick.bind(this, -1)}
			                />
			                <div
				                className={`file-picker__control_zoom-in ${s ? '' : 'file-picker__control_disabled'}`}
				                onClick={this.onZoomClick.bind(this, 1)}
			                />
			                <div
				                className={`file-picker__control_zoom-out ${s ? '' : 'file-picker__control_disabled'}`}
				                onClick={this.onZoomClick.bind(this, -1)}
			                />
			                <div
				                className={`file-picker__control_save ${s ? '' : 'file-picker__control_disabled'}`}
				                onClick={this.onSaveClick.bind(this)}
			                />
		                </div>
	                }

                    {
                        (!this.isLoading() && !this.acceptImagesOnly())
                        &&
                        <div className="file-picker__controls file-picker__controls_left">
                            <div
                                className="file-picker__control_add"
                                onClick={this.onFileAddClick.bind(this)}
                            >
                                <span className="file-picker__control-text">Выбрать файл</span>
                            </div>
                        </div>
                    }

	                {
	                	this.isLoading()
		                &&
		                <div
			                className="file-picker__loader_bottom"
		                >
			                <div className="file-picker__loader-bar">
				                <div className="file-picker__loader-bar-percent" style={{width: `${this.getPercent()}%`}} />
			                </div>
		                </div>
	                }
                </div>
                <div
                    ref={(ref) => { this._invisible = ref; }}
                    className="rb-no-display"
                />
            </div>
        );
    }
}



// getFiles()
// {
// 	const value = this.getValue();
// 	return this.props.files.filter((file) => {
// 		if (!file)
// 		{
// 			return false;
// 		}
//
// 		// todo: indexOf is bad
// 		return value.indexOf(file.getId()) >= 0;
// 	});
// }
//
// lockButton()
// {
// 	this.setState({
// 		locked: true,
// 	});
// }
//
// unlockButton()
// {
// 	this.setState({
// 		locked: false,
// 	});
// }
//
// renderFiles()
// {
//     const files = [];
//
//     this.getFiles().forEach((item) => {
//         const url = item.getAbsoluteUrlImage([100, 100]);
//         files.push(
//             <a
//                 href={item.getAbsoluteUrl()}
//                 className="file-picker__item-existing"
//                 rel="noreferrer noopener"
//                 target="_blank"
//                 style={{
//                     backgroundImage: `url(${url})`,
//                 }}
//                 key={`e_${item.getId()}`}
//             >
//                 <div
//                     className="file-picker__item-existing-delete"
//                     onClick={this.onItemDeleteClick.bind(this, item.getId())}
//                 />
//             </a>
//         );
//     });
//
//     this.state.uploadingFiles.forEach((file, i) => {
//         const style = file.loaderType === 'h' ? {width: `${file.percent}%`} : {height: `${file.percent}%`};
//         files.push(
//             <a
//                 className="file-picker__item-new"
//                 key={`n_${i}`}
//             >
//                 <div className="file-picker__item-new-inner">
//                     <div className="file-picker__item-new-progress">
//                         <span className="file-picker__item-new-progress-bar-text">{`${file.percent}%`}</span>
//                         <div
//                             className={`file-picker__item-new-progress-bar_${file.loaderType}`}
//                             style={style}
//                         >
//                             <span className="file-picker__item-new-progress-bar-text file-picker__item-new-progress-bar-text_inner">{`${file.percent}%`}</span>
//                         </div>
//                     </div>
//                 </div>
//             </a>
//         );
//     });
//
//     return (
//         <div className="margin-b_x">
//             <div className="file-picker__items group_x">
//                 {files}
//             </div>
//         </div>
//     );
// }
//
// hasAnyFiles()
// {
// 	return this.hasNewFiles() || this.hasExistingFiles();
// }
