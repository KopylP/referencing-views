class ObjectInfo {
    readonly name: string;
    readonly schema: string;

    constructor(objectName: string) {
        const parts = objectName.split('.');

        if (parts.length !== 2) {
            throw Error("Argument objectName is invalid.");
        }

        this.schema = parts[0];
        this.name = parts[1];
    }
}

export default ObjectInfo;