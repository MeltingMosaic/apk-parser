declare module "manifest"{
    export = Manifest;
}

export class Manifest{
    constructor(buffer: ArrayBuffer);
    // parse() : AppMetadata;
    parse() : any;
}

// TODO: Determine which fields are actually required rather than creating types for the whole manifest
// export interface AppMetadata{

// }