export class Chapater {
    constructor(

        public id?: number,
        public stdid?: number,
        public subid?: number,
        public chapname?: string,
        public createddate?: Date,
        public updateddate?: Date,
        public isactive?: boolean,
        public chapList?: any[],
        public index?: number,
        public question?: [],
        public color?: string,
    ) {
    }
}
