import Collection from '../config/collection.js';

import moment from 'moment';

import areaEnum from '../enum/area.js';
import statusEnum from '../enum/status.js';
import levelEnum from '../enum/level.js';
import kindEnum from '../enum/kind.js';
import technologyEnum from '../enum/technology.js';
import conditionEnum from '../enum/condition.js';

/**
 * @abstract
 * @mixin
 */
const M = (superclass) =>  class RegistryObject extends superclass
{
    static getCollectionInstance()
    {
        return Collection;
    }

    static onBeforeSave(id, data, result) {
        if (!_.isStringNotEmpty(id)) {
            data.createdBy = Meteor.userId();
        }
    }

    // ////////////////////
    // attribute Name

    /**
     * Get name by reference
     * @return String|undefined
     */
    getName()
    {
    	return this.getData().name;
    }

    /**
     * Get name by value
     * @return String
     */
    extractName()
    {
    	return this.getName() || '';
    }

    /**
     * Set name by reference
     * @param value
     * @return void
     */
    setName(value)
    {
    	this.getData().name = value;
    }

    /**
     * Set name by value
     * @param value
     * @return void
     */
    putName(value)
    {
    	this.getData().name = value;
    }

    /**
     * Check if we have an attribute name
     * @returns boolean
     */
    hasName()
    {
    	return _.isStringNotEmpty(this.getName());
    }

    /**
     * Get the first line of the name, in case if it is multi-lined
     * @returns String
     */
    getTitle()
    {
        const found = (this.extractName()).split(/\r\n/);

        if (_.isStringNotEmpty(found[0]))
        {
            return found[0].trim().replace(/:$/, '');
        }

        return '';
    }

    // ////////////////////
    // attribute nameOriginal

    /**
     * Get nameOriginal by reference
     * @return String|undefined
     */
    getNameOriginal() {
        return this.getData().nameOriginal;
    }

    /**
     * Get nameOriginal by value
     * @return String
     */
    extractNameOriginal() {
        return this.getNameOriginal() || '';
    }

    /**
     * Set nameOriginal by reference
     * @param value
     * @return void
     */
    setNameOriginal(value) {
        this.getData().nameOriginal = value;
    }

    /**
     * Set nameOriginal by value
     * @param value
     * @return void
     */
    putNameOriginal(value) {
        this.getData().nameOriginal = value;
    }

    /**
     * Check if we have an attribute nameOriginal
     * @returns boolean
     */
    hasNameOriginal() {
        return _.isStringNotEmpty(this.getNameOriginal());
    }

    /**
     * Unset the attribute nameOriginal
     * @returns void
     */
    unSetNameOriginal() {
        const data = this.getData();
        delete data.nameOriginal;
    }


    // ////////////////////
    // attribute Code

    /**
     * Get code by reference
     * @return String|undefined
     */
    getCode()
    {
    	return this.getData().code;
    }

    /**
     * Get code by value
     * @return String
     */
    extractCode()
    {
    	return _.deepClone(this.getCode()) || '';
    }

    /**
     * Set code by reference
     * @param value
     * @return void
     */
    setCode(value)
    {
    	this.getData().code = value;
    }

    /**
     * Set code by value
     * @param value
     * @return void
     */
    putCode(value)
    {
    	this.getData().code = _.deepClone(value);
    }

    /**
     * Check if we have an attribute code
     * @returns boolean
     */
    hasCode()
    {
    	return _.isStringNotEmpty(this.getCode());
    }

    // ////////////////////
    // attribute Area

    /**
     * Get area by reference
     * @return String|undefined
     */
    getArea()
    {
    	return this.getData().area;
    }

    /**
     * Get area by value
     * @return String|null
     */
    extractArea()
    {
    	return _.deepClone(this.getArea()) || null;
    }

    /**
     * Set area by reference
     * @param value
     * @return void
     */
    setArea(value)
    {
    	this.getData().area = value;
    }

    /**
     * Set area by value
     * @param value
     * @return void
     */
    putArea(value)
    {
    	this.getData().area = _.deepClone(value);
    }

    /**
     * Check if we have an attribute area
     * @returns boolean
     */
    hasArea()
    {
    	return _.isStringNotEmpty(this.getArea());
    }

    getAreaDisplay()
    {
        return areaEnum.getValue(this.getArea()) || '';
    }

    // ////////////////////
    // attribute Status

    /**
     * Get status by reference
     * @return String|undefined
     */
    getStatus()
    {
    	return this.getData().status;
    }

    /**
     * Get status by value
     * @return String
     */
    extractStatus()
    {
    	return this.getStatus() || null;
    }

    /**
     * Set status by reference
     * @param value
     * @return void
     */
    setStatus(value)
    {
    	this.getData().status = value;
    }

    /**
     * Set status by value
     * @param value
     * @return void
     */
    putStatus(value)
    {
    	this.getData().status = value;
    }

    /**
     * Check if we have an attribute status
     * @returns boolean
     */
    hasStatus()
    {
    	return _.isStringNotEmpty(this.getStatus());
    }

	/**
	 * Unset the attribute status
	 * @returns void
	 */
	unSetStatus()
	{
		const data = this.getData();
		delete data.status;
	}

    getStatusDisplay()
    {
        return statusEnum.getValue(this.getStatus()) || '';
    }

	// ////////////////////
	// attribute Creation period

	/**
	 * Get creation period by reference
	 * @return String|undefined
	 */
	getCreationPeriod()
	{
		return this.getData().creationPeriod;
	}

	/**
	 * Get creation period by value
	 * @return String
	 */
	extractCreationPeriod()
	{
		return this.getCreationPeriod() || '';
	}

	/**
	 * Set creation period by reference
	 * @param value
	 * @return void
	 */
	setCreationPeriod(value)
	{
		this.getData().creationPeriod = value;
	}

	/**
	 * Set creation period by value
	 * @param value
	 * @return void
	 */
	putCreationPeriod(value)
	{
		this.getData().creationPeriod = _.deepClone(value);
	}

	/**
	 * Check if we have an attribute creation period
	 * @returns boolean
	 */
	hasCreationPeriod()
	{
		return _.isStringNotEmpty(this.getCreationPeriod());
	}

	/**
	 * Unset the attribute creation period
	 * @returns void
	 */
	unSetCreationPeriod()
	{
		const data = this.getData();
		delete data.creationPeriod;
	}

    // ////////////////////
    // attribute Tear down period

    /**
     * Get tear down period by reference
     * @return String|undefined
     */
    getTearDownPeriod()
    {
        return this.getData().tearDownPeriod;
    }

    /**
     * Get tear down period by value
     * @return String
     */
    extractTearDownPeriod()
    {
        return this.getTearDownPeriod() || '';
    }

    /**
     * Set tear down period by reference
     * @param value
     * @return void
     */
    setTearDownPeriod(value)
    {
        this.getData().tearDownPeriod = value;
    }

    /**
     * Set tear down period by value
     * @param value
     * @return void
     */
    putTearDownPeriod(value)
    {
        this.getData().tearDownPeriod = _.deepClone(value);
    }

    /**
     * Check if we have an attribute tear down period
     * @returns boolean
     */
    hasTearDownPeriod()
    {
        return _.isStringNotEmpty(this.getTearDownPeriod());
    }

    /**
     * Unset the attribute tear down period
     * @returns void
     */
    unSetTearDownPeriod()
    {
        const data = this.getData();
        delete data.tearDownPeriod;
    }

	hasOriginDate()
    {
        return _.isDate(this.getOriginDate());
    }

    getOriginDate()
    {
        return this.getData().originDate || null;
    }

    getOriginDateDisplay()
    {
        const date = this.getOriginDate();
        if (!_.isDate(date))
        {
            return '';
        }

        return moment(date).format('DD.MM.YYYY');
    }

    // ////////////////////
    // attribute DocumentName

    /**
     * Get document name by reference
     * @return String|undefined
     */
    getDocumentName()
    {
    	return this.getData().documentName;
    }

    /**
     * Get document name by value
     * @return String
     */
    extractDocumentName()
    {
    	return this.getDocumentName() || '';
    }

    /**
     * Set document by reference
     * @param value
     * @return void
     */
    setDocumentName(value)
    {
    	this.getData().documentName = value;
    }

    /**
     * Set document by value
     * @param value
     * @return void
     */
    putDocumentName(value)
    {
    	this.getData().documentName = value;
    }

    /**
     * Check if we have an attribute document
     * @returns boolean
     */
    hasDocumentName()
    {
    	return _.isStringNotEmpty(this.getDocumentName());
    }

    // ////////////////////
    // attribute Document

    /**
     * Get document by reference
     * @return [{}]|undefined
     */
    getDocument() {
        return this.getData().document;
    }

    /**
     * Get document by value
     * @return [{}]
     */
    extractDocument() {
        return this.getDocument() || [];
    }

    /**
     * Set document by reference
     * @param value
     * @return void
     */
    setDocument(value) {
        this.getData().document = value;
    }

    /**
     * Set document by value
     * @param value
     * @return void
     */
    putDocument(value) {
        this.getData().document = _.deepClone(value);
    }

    /**
     * Check if we have an attribute document
     * @returns boolean
     */
    hasDocument() {
        return _.isArrayNotEmpty(this.getDocument());
    }

    /**
     * Unset the attribute document
     * @returns void
     */
    unSetDocument() {
        const data = this.getData();
        delete data.document;
    }

    // ////////////////////
    // attribute Level

    /**
     * Get level by reference
     * @return String|undefined
     */
    getLevel()
    {
    	return this.getData().level;
    }

    /**
     * Get level by value
     * @return String
     */
    extractLevel()
    {
    	return this.getLevel() || null;
    }

    /**
     * Set level by reference
     * @param value
     * @return void
     */
    setLevel(value)
    {
    	this.getData().level = value;
    }

    /**
     * Set level by value
     * @param value
     * @return void
     */
    putLevel(value)
    {
    	this.getData().level = value;
    }

    /**
     * Check if we have an attribute level
     * @returns boolean
     */
    hasLevel()
    {
    	return _.isStringNotEmpty(this.getLevel());
    }

    hasLevelDefined()
    {
        return this.hasLevel() && this.getLevel() !== levelEnum.KEY_UNDEFINED;
    }

    getLevelDisplay()
    {
        return levelEnum.getValue(this.getLevel());
    }

    // ////////////////////
    // attribute Condition

    /**
     * Get condition by reference
     * @return String|undefined
     */
    getCondition()
    {
    	return this.getData().condition;
    }

    /**
     * Get condition by value
     * @return String
     */
    extractCondition()
    {
    	return this.getCondition() || '';
    }

    /**
     * Set condition by reference
     * @param value
     * @return void
     */
    setCondition(value)
    {
    	this.getData().condition = value;
    }

    /**
     * Set condition by value
     * @param value
     * @return void
     */
    putCondition(value)
    {
    	this.getData().condition = value;
    }

    /**
     * Check if we have an attribute condition
     * @returns boolean
     */
    hasCondition()
    {
    	return _.isStringNotEmpty(this.getCondition());
    }

    hasConditionDefined()
    {
        return this.hasCondition() && this.getCondition() !== conditionEnum.KEY_N;
    }

    getConditionDisplay()
    {
        return conditionEnum.getValue(this.getCondition());
    }

    // ////////////////////
    // attribute Kind

    /**
     * Get kind by reference
     * @return String|undefined
     */
    getKind()
    {
    	return this.getData().kind;
    }

    /**
     * Get kind by value
     * @return String
     */
    extractKind()
    {
    	return this.getKind() || [];
    }

    /**
     * Set kind by reference
     * @param value
     * @return void
     */
    setKind(value)
    {
    	this.getData().kind = value;
    }

    /**
     * Set kind by value
     * @param value
     * @return void
     */
    putKind(value)
    {
    	this.getData().kind = value;
    }

    /**
     * Check if we have an attribute kind
     * @returns boolean
     */
    hasKind()
    {
    	return _.isArrayNotEmpty(this.getKind());
    }

    getKindDisplay()
    {
        return kindEnum.getValuesByKeys(this.getKind());
    }

    // ////////////////////
    // attribute Location

    /**
     * Get location by reference
     * @return [{}]|undefined
     */
    getLocation()
    {
    	return this.getData().location;
    }

    getLocationNormalized()
    {
        return this.getLocation().map((location) => {
            location = _.deepClone(location);

            location.lat = location.lat.toFixed(6);
            location.lng = location.lng.toFixed(6);

            return location;
        });
    }

    /**
     * Get location by value
     * @return [{}]
     */
    extractLocation()
    {
    	return _.deepClone(this.getLocation()) || [];
    }

    /**
     * Set location by reference
     * @param value
     * @return void
     */
    setLocation(value)
    {
    	this.getData().location = value;
    }

    /**
     * Set location by value
     * @param value
     * @return void
     */
    putLocation(value)
    {
    	this.getData().location = _.deepClone(value);
    }

    /**
     * Check if we have an attribute location
     * @returns boolean
     */
    hasLocation()
    {
    	return _.isArrayNotEmpty(this.getLocation());
    }

	// ////////////////////
	// attribute Location description

	/**
	 * Get location description by reference
	 * @return String|undefined
	 */
	getLocationDescription()
	{
		return this.getData().locationDescription;
	}

	/**
	 * Get location description by value
	 * @return String
	 */
	extractLocationDescription()
	{
		return this.getLocationDescription() || '';
	}

	/**
	 * Set location description by reference
	 * @param value
	 * @return void
	 */
	setLocationDescription(value)
	{
		this.getData().locationDescription = value;
	}

	/**
	 * Set location description by value
	 * @param value
	 * @return void
	 */
	putLocationDescription(value)
	{
		this.getData().locationDescription = value;
	}

	/**
	 * Check if we have an attribute location description
	 * @returns boolean
	 */
	hasLocationDescription()
	{
		return _.isStringNotEmpty(this.getLocationDescription());
	}

	/**
	 * Unset the attribute location description
	 * @returns void
	 */
	unSetLocationDescription()
	{
		const data = this.getData();
		delete data.locationDescription;
	}

	// ////////////////////
	// attribute inDanger

	/**
	 * Get inDanger by reference
	 * @return bool|undefined
	 */
	getInDanger()
	{
		return this.getData().inDanger;
	}

	/**
	 * Get inDanger by value
	 * @return bool
	 */
	extractInDanger()
	{
		return !!this.getInDanger();
	}

	/**
	 * Set inDanger by reference
	 * @param value
	 * @return void
	 */
	setInDanger(value)
	{
		this.getData().inDanger = value;
	}

	/**
	 * Set inDanger by value
	 * @param value
	 * @return void
	 */
	putInDanger(value)
	{
		this.getData().inDanger = !!value;
	}

	/**
	 * Check if we have an attribute inDanger
	 * @returns boolean
	 */
	hasInDanger()
	{
		return true;
	}

	/**
	 * Unset the attribute inDanger
	 * @returns void
	 */
	unSetInDanger()
	{
		const data = this.getData();
		delete data.inDanger;
	}

	_normalizeLocation(location)
    {
        if (_.isArrayNotEmpty(location))
        {
            return location.map((item) => {
                const lat = parseFloat(item.lat);
                const lng = parseFloat(item.lng);
                if (!isNaN(lat) && !isNaN(lng))
                {
                    return {lat, lng};
                }

                return null;
            }).filter(x => x !== null);
        }

        return [];
    }

    getLocationFirst()
    {
        const locs = this.getLocation();
        if (_.isObjectNotEmpty(locs[0]))
        {
            return locs[0];
        }

        return null;
    }

    getVerified()
    {
        return !!this.getData().verified;
    }

    setVerified(flag)
    {
        this.getData().verified = !!flag;
    }

    // ////////////////////
    // attribute Photo Id

    // get Photo Id by reference
    getPhotoId() {
    	return this.getData().photoId;
    }

    // get Photo Id by value
    extractPhotoId()
    {
    	return this.getPhotoId() || '';
    }

    // set Photo Id by reference
    setPhotoId(value)
    {
    	this.getData().photoId = value;
    }

    // set Photo by value
    putPhotoId(value)
    {
    	this.getData().photoId = value;
    }

    // check if we have an attribute Photo Id
    hasPhotoId() {
    	return _.isStringNotEmpty(this.getPhotoId());
    }

    // ////////////////////
    // attribute Note

    /**
     * Get note by reference
     * @return String|undefined
     */
    getNote()
    {
    	return this.getData().note;
    }

    /**
     * Get note by value
     * @return String
     */
    extractNote()
    {
    	return this.getNote() || '';
    }

    /**
     * Set note by reference
     * @param value
     * @return void
     */
    setNote(value)
    {
    	this.getData().note = value;
    }

    /**
     * Set note by value
     * @param value
     * @return void
     */
    putNote(value)
    {
    	this.getData().note = value;
    }

    /**
     * Check if we have an attribute note
     * @returns boolean
     */
    hasNote()
    {
    	return _.isStringNotEmpty((this.getNote() || '').trim());
    }

	// ////////////////////
	// attribute Favourite for

	/**
	 * Get favourite for by reference
	 * @return [String]|undefined
	 */
	getFavouriteFor()
	{
		return this.getData().favouriteFor;
	}

	/**
	 * Get favourite for by value
	 * @return [String]
	 */
	extractFavouriteFor()
	{
		return this.getFavouriteFor() || [];
	}

	/**
	 * Set favourite for by reference
	 * @param value
	 * @return void
	 */
	setFavouriteFor(value)
	{
		this.getData().favouriteFor = value;
	}

	/**
	 * Set favourite for by value
	 * @param value
	 * @return void
	 */
	putFavouriteFor(value)
	{
		this.getData().favouriteFor = _.deepClone(value);
	}

	/**
	 * Check if we have an attribute favourite for
	 * @returns boolean
	 */
	hasFavouriteFor()
	{
		return _.isArrayNotEmpty(this.getFavouriteFor());
	}

	/**
	 * Unset the attribute favourite for
	 * @returns void
	 */
	unSetFavouriteFor()
	{
		const data = this.getData();
		delete data.favouriteFor;
	}

    // ////////////////////
    // attribute Remarkable

    /**
     * Get remarkable by reference
     * @return Boolean|undefined
     */
    getRemarkable()
    {
        return this.getData().remarkable;
    }

    /**
     * Get remarkable by value
     * @return Boolean
     */
    extractRemarkable()
    {
        return this.getRemarkable() || '';
    }

    /**
     * Set remarkable by reference
     * @param value
     * @return void
     */
    setRemarkable(value)
    {
        this.getData().remarkable = value;
    }

    /**
     * Set remarkable by value
     * @param value
     * @return void
     */
    putRemarkable(value)
    {
        this.getData().remarkable = !!value;
    }

    /**
     * Check if we have an attribute remarkable
     * @returns boolean
     */
    hasRemarkable()
    {
        return this.getRemarkable() !== undefined;
    }

    /**
     * Unset the attribute remarkable
     * @returns void
     */
    unSetRemarkable()
    {
        const data = this.getData();
        delete data.remarkable;
    }

    // ////////////////////
    // attribute Altered

    /**
     * Get altered by reference
     * @return Boolean|undefined
     */
    getAltered() {
        return this.getData().altered;
    }

    /**
     * Get altered by value
     * @return Boolean
     */
    extractAltered() {
        return this.getAltered() || '';
    }

    /**
     * Set altered by reference
     * @param value
     * @return void
     */
    setAltered(value) {
        this.getData().altered = value;
    }

    /**
     * Set altered by value
     * @param value
     * @return void
     */
    putAltered(value) {
        this.getData().altered = value;
    }

    /**
     * Check if we have an attribute altered
     * @returns boolean
     */
    hasAltered() {
        return !!(this.getAltered());
    }

    /**
     * Unset the attribute altered
     * @returns void
     */
    unSetAltered() {
        const data = this.getData();
        delete data.altered;
    }

    // ////////////////////
    // attribute GoogleMapReference

    /**
     * Get googleMapReference by reference
     * @return String|undefined
     */
    getGoogleMapReference() {
        return this.getData().googleMapReference;
    }

    /**
     * Get googleMapReference by value
     * @return String
     */
    extractGoogleMapReference() {
        return this.getGoogleMapReference() || '';
    }

    /**
     * Set googleMapReference by reference
     * @param value
     * @return void
     */
    setGoogleMapReference(value) {
        this.getData().googleMapReference = value;
    }

    /**
     * Set googleMapReference by value
     * @param value
     * @return void
     */
    putGoogleMapReference(value) {
        this.getData().googleMapReference = value;
    }

    /**
     * Check if we have an attribute googleMapReference
     * @returns boolean
     */
    hasGoogleMapReference() {
        return _.isStringNotEmpty(this.getGoogleMapReference());
    }

    /**
     * Unset the attribute googleMapReference
     * @returns void
     */
    unSetGoogleMapReference() {
        const data = this.getData();
        delete data.googleMapReference;
    }

    toggleFavouriteFor(userId)
	{
		let fav = this.extractFavouriteFor();
		if (_.contains(fav, userId))
		{
			fav = _.difference(fav, [userId]);
		}
		else
		{
			fav.push(userId);
		}

		this.setFavouriteFor(fav);
	}

	isInFavouriteFor(userId)
	{
		return _.contains(this.getFavouriteFor(), userId);
	}

    // ////////////////////
    // attribute Technology

    /**
     * Get technology by reference
     * @return [String]|undefined
     */
    getTechnology() {
        return this.getData().technology;
    }

    /**
     * Get technology by value
     * @return [String]
     */
    extractTechnology() {
        return this.getTechnology() || [];
    }

    /**
     * Set technology by reference
     * @param value
     * @return void
     */
    setTechnology(value) {
        this.getData().technology = value;
    }

    /**
     * Set technology by value
     * @param value
     * @return void
     */
    putTechnology(value) {
        this.getData().technology = _.deepClone(value);
    }

    /**
     * Check if we have an attribute technology
     * @returns boolean
     */
    hasTechnology() {
        return _.isArrayNotEmpty(this.getTechnology());
    }

    /**
     * Unset the attribute technology
     * @returns void
     */
    unSetTechnology() {
        const data = this.getData();
        delete data.technology;
    }

    getTechnologyDisplay()
    {
        return technologyEnum.getValuesByKeys(this.getTechnology());
    }

    // ////////////////////
    // attribute Architect

    /**
     * Get architect by reference
     * @return String|undefined
     */
    getArchitect() {
        return this.getData().architect;
    }

    /**
     * Get architect by value
     * @return String
     */
    extractArchitect() {
        return this.getArchitect() || [];
    }

    /**
     * Set architect by reference
     * @param value
     * @return void
     */
    setArchitect(value) {
        this.getData().architect = value;
    }

    /**
     * Set architect by value
     * @param value
     * @return void
     */
    putArchitect(value) {
        this.getData().architect = value;
    }

    /**
     * Check if we have an attribute architect
     * @returns boolean
     */
    hasArchitect() {
        return _.isStringNotEmpty(this.getArchitect());
    }

    /**
     * Unset the attribute architect
     * @returns void
     */
    unSetArchitect() {
        const data = this.getData();
        delete data.architect;
    }

    getArchitectDisplay()
    {
        return this.getArchitect();
    }

    // ////////////////////
    // attribute Hidden

    /**
     * Get hidden by reference
     * @return Boolean|undefined
     */
    getHidden() {
        return this.getData().hidden;
    }

    /**
     * Get hidden by value
     * @return Boolean
     */
    extractHidden() {
        return !!this.getHidden();
    }

    /**
     * Set hidden by reference
     * @param value
     * @return void
     */
    setHidden(value) {
        this.getData().hidden = value;
    }

    /**
     * Set hidden by value
     * @param value
     * @return void
     */
    putHidden(value) {
        this.getData().hidden = value;
    }

    /**
     * Check if we have an attribute hidden
     * @returns boolean
     */
    hasHidden() {
        return _.isBoolean(this.getHidden());
    }

    /**
     * Unset the attribute hidden
     * @returns void
     */
    unSetHidden() {
        const data = this.getData();
        delete data.hidden;
    }

    // ////////////////////
    // attribute Created By

    /**
     * Get createdBy by reference
     * @return String|undefined
     */
    getCreatedBy() {
        return this.getData().createdBy;
    }

    /**
     * Get createdBy by value
     * @return String
     */
    extractCreatedBy() {
        return this.getCreatedBy() || '';
    }

    /**
     * Set createdBy by reference
     * @param value
     * @return void
     */
    setCreatedBy(value) {
        this.getData().createdBy = value;
    }

    /**
     * Set createdBy by value
     * @param value
     * @return void
     */
    putCreatedBy(value) {
        this.getData().createdBy = value;
    }

    /**
     * Check if we have an attribute createdBy
     * @returns boolean
     */
    hasCreatedBy() {
        return _.isStringNotEmpty(this.getCreatedBy());
    }

    /**
     * Unset the attribute createdBy
     * @returns void
     */
    unSetCreatedBy() {
        const data = this.getData();
        delete data.createdBy;
    }

    // ////////////////////

    _normalize(data)
    {
        data.location = this._normalizeLocation(data.location);

        return data;
    }

    getSearchIndex()
    {
        const parts = [];

        parts.push(this.mkStr(this.mkStr(this.getName())));
        parts.push(this.mkStr(this.getCode()));
        parts.push(this.mkStr(this.getAreaDisplay()));
        parts.push(this.mkStr(this.getStatusDisplay()));
        parts.push(this.getOriginDateDisplay());
        parts.push(this.mkStr(this.getDocumentName()));
        parts.push(this.mkStr(this.getLevelDisplay()));
        parts.push(this.mkStr(this.getLocationDescription()));

        return parts.join('|');
    }

    mkStr(str)
    {
        if (!_.isStringNotEmpty(str))
        {
            return '';
        }

        return str.replace(/[^a-z0-9\u0430-\u044F\s]/ig, '').trim().toUpperCase();
    }
};

export default M;
