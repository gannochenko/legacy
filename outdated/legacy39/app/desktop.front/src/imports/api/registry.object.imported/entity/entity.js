import Collection from "../config/collection.js";

// import moment from 'moment';

/**
 * @abstract
 * @mixin
 */
const M = (superclass) =>
  class Draft extends superclass {
    static getCollectionInstance() {
      return Collection;
    }

    // ////////////////////
    // attribute Uid

    /**
     * Get uid by reference
     * @return String|undefined
     */
    getUid() {
      return this.getData().uid;
    }

    /**
     * Get uid by value
     * @return String
     */
    extractUid() {
      return this.getUid() || "";
    }

    /**
     * Set uid by reference
     * @param value
     * @return void
     */
    setUid(value) {
      this.getData().uid = value;
    }

    /**
     * Set uid by value
     * @param value
     * @return void
     */
    putUid(value) {
      this.getData().uid = value;
    }

    /**
     * Check if we have an attribute uid
     * @returns boolean
     */
    hasUid() {
      return _.isStringNotEmpty(this.getUid());
    }

    /**
     * Unset the attribute uid
     * @returns void
     */
    unSetUid() {
      const data = this.getData();
      delete data.uid;
    }

    // ////////////////////
    // attribute Location

    /**
     * Get location by reference
     * @return []|undefined
     */
    getLocation() {
      return this.getData().location;
    }

    /**
     * Get location by value
     * @return []
     */
    extractLocation() {
      return this.getLocation() || "";
    }

    /**
     * Set location by reference
     * @param value
     * @return void
     */
    setLocation(value) {
      this.getData().location = value;
    }

    /**
     * Set location by value
     * @param value
     * @return void
     */
    putLocation(value) {
      this.getData().location = _.deepClone(value);
    }

    /**
     * Check if we have an attribute location
     * @returns boolean
     */
    hasLocation() {
      return _.isArrayNotEmpty(this.getLocation());
    }

    /**
     * Unset the attribute location
     * @returns void
     */
    unSetLocation() {
      const data = this.getData();
      delete data.location;
    }

    // ////////////////////
    // attribute Category

    /**
     * Get category by reference
     * @return String|undefined
     */
    getCategory() {
      return this.getData().category;
    }

    /**
     * Get category by value
     * @return String
     */
    extractCategory() {
      return this.getCategory() || "";
    }

    /**
     * Set category by reference
     * @param value
     * @return void
     */
    setCategory(value) {
      this.getData().category = value;
    }

    /**
     * Set category by value
     * @param value
     * @return void
     */
    putCategory(value) {
      this.getData().category = value;
    }

    /**
     * Check if we have an attribute category
     * @returns boolean
     */
    hasCategory() {
      return _.isStringNotEmpty(this.getCategory());
    }

    /**
     * Unset the attribute category
     * @returns void
     */
    unSetCategory() {
      const data = this.getData();
      delete data.category;
    }

    // ////////////////////
    // attribute Description

    /**
     * Get description by reference
     * @return String|undefined
     */
    getDescription() {
      return this.getData().description;
    }

    /**
     * Get description by value
     * @return String
     */
    extractDescription() {
      return this.getDescription() || "";
    }

    /**
     * Set description by reference
     * @param value
     * @return void
     */
    setDescription(value) {
      this.getData().description = value;
    }

    /**
     * Set description by value
     * @param value
     * @return void
     */
    putDescription(value) {
      this.getData().description = value;
    }

    /**
     * Check if we have an attribute description
     * @returns boolean
     */
    hasDescription() {
      return _.isStringNotEmpty(this.getDescription());
    }

    /**
     * Unset the attribute description
     * @returns void
     */
    unSetDescription() {
      const data = this.getData();
      delete data.description;
    }

    // ////////////////////
    // attribute Verified

    /**
     * Get verified by reference
     * @return Boolean|undefined
     */
    getVerified() {
      return this.getData().verified;
    }

    /**
     * Get verified by value
     * @return Boolean
     */
    extractVerified() {
      return this.getVerified() || "";
    }

    /**
     * Set verified by reference
     * @param value
     * @return void
     */
    setVerified(value) {
      this.getData().verified = value;
    }

    /**
     * Set verified by value
     * @param value
     * @return void
     */
    putVerified(value) {
      this.getData().verified = value;
    }

    /**
     * Check if we have an attribute verified
     * @returns boolean
     */
    hasVerified() {
      return !!this.getVerified();
    }

    /**
     * Unset the attribute verified
     * @returns void
     */
    unSetVerified() {
      const data = this.getData();
      delete data.verified;
    }

    // ////////////////////
    // attribute Name

    /**
     * Get name by reference
     * @return String|undefined
     */
    getName() {
      return this.getData().name;
    }

    /**
     * Get name by value
     * @return String
     */
    extractName() {
      return this.getName() || "";
    }

    /**
     * Set name by reference
     * @param value
     * @return void
     */
    setName(value) {
      this.getData().name = value;
    }

    /**
     * Set name by value
     * @param value
     * @return void
     */
    putName(value) {
      this.getData().name = value;
    }

    /**
     * Check if we have an attribute name
     * @returns boolean
     */
    hasName() {
      return _.isStringNotEmpty(this.getName());
    }

    /**
     * Unset the attribute name
     * @returns void
     */
    unSetName() {
      const data = this.getData();
      delete data.name;
    }

    getLocationFirst() {
      const locs = this.getLocation();
      if (_.isObjectNotEmpty(locs[0])) {
        return locs[0];
      }

      return null;
    }

    // ////////////////////
    // attribute Incorrect PageHeaderData

    /**
     * Get incorrectData by reference
     * @return Boolean|undefined
     */
    getIncorrectData() {
      return this.getData().incorrectData;
    }

    /**
     * Get incorrectData by value
     * @return Boolean
     */
    extractIncorrectData() {
      return this.getIncorrectData() || "";
    }

    /**
     * Set incorrectData by reference
     * @param value
     * @return void
     */
    setIncorrectData(value) {
      this.getData().incorrectData = value;
    }

    /**
     * Set incorrectData by value
     * @param value
     * @return void
     */
    putIncorrectData(value) {
      this.getData().incorrectData = _.deepClone(value);
    }

    /**
     * Check if we have an attribute incorrectData
     * @returns boolean
     */
    hasIncorrectData() {
      return !!this.getIncorrectData();
    }

    /**
     * Unset the attribute incorrectData
     * @returns void
     */
    unSetIncorrectData() {
      const data = this.getData();
      delete data.incorrectData;
    }

    _normalize(data) {
      return data;
    }
  };

export default M;
