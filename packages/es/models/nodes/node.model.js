/**
 * Model for Node properties
 */
export class NodeModel {
    constructor(opts) {
        /**
         * I believe TypeNode is used to determine when
         * the node HTML value is either a string or an HTML Element (template, div, etc.)
         *
         * I have added logic to check whether or not HTML is a string or else; need to look
         * at this a little more - shannon
         */
        this.TypeNode = false;
        Object.assign(this, opts); // destructure values
    }
}
